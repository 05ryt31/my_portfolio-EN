import { NextResponse } from 'next/server';
import mongoose from 'mongoose';
import sgMail from '@sendgrid/mail';

// MongoDBの接続設定
const MONGODB_URI = process.env.MONGODB_URI;
const SENDGRID_API_KEY = process.env.SENDGRID_API_KEY;

// メッセージのスキーマ定義
const messageSchema = new mongoose.Schema({
  name: String,
  email: String,
  subject: String,
  message: String,
  createdAt: { type: Date, default: Date.now },
});

// モデルの作成（既に存在する場合は使用）
const Message = mongoose.models.Message || mongoose.model('Message', messageSchema);

// MongoDBへの接続
async function connectDB() {
  if (!MONGODB_URI) {
    throw new Error('Please define the MONGODB_URI environment variable');
  }
  
  try {
    if (mongoose.connection.readyState === 0) {
      await mongoose.connect(MONGODB_URI);
    }
  } catch (error) {
    console.error('MongoDB connection error:', error);
    throw error;
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, subject, message } = body;

    // MongoDBに接続
    await connectDB();

    // メッセージをデータベースに保存
    const newMessage = await Message.create({
      name,
      email,
      subject,
      message,
    });

    // SendGridの設定
    if (!SENDGRID_API_KEY) {
      throw new Error('Please define the SENDGRID_API_KEY environment variable');
    }
    sgMail.setApiKey(SENDGRID_API_KEY);

    // メール送信
    const msg = {
      to: 'kawabataryuto8@gmail.com', // あなたのメールアドレス
      from: 'kawabataryuto8@gmail.com', // 送信元メールアドレス（SendGridで認証済みのもの）
      subject: `New Contact Form Submission: ${subject}`,
      text: `
        Name: ${name}
        Email: ${email}
        Subject: ${subject}
        Message: ${message}
      `,
      html: `
        <h2>New Contact Form Submission</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Subject:</strong> ${subject}</p>
        <p><strong>Message:</strong> ${message}</p>
      `,
    };

    await sgMail.send(msg);

    return NextResponse.json(
      { message: 'Message sent successfully', data: newMessage },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error processing contact form:', error);
    return NextResponse.json(
      { error: 'Failed to send message' },
      { status: 500 }
    );
  }
} 