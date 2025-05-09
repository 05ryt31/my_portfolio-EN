"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import Image from "next/image"
import { ChevronLeft, ChevronRight, Expand, X } from "lucide-react"
import AnimatedSectionHeader from "./AnimatedSectionHeader"

// サンプル画像 - 実際の画像に置き換えてください
const images = [
  {
    src: "/office.jpg?height=600&width=800",
    alt: "Portfolio Image 1",
    caption: "Project Showcase",
  },
  {
    src: "/placeholder.svg?height=600&width=800",
    alt: "Portfolio Image 2",
    caption: "Team Collaboration",
  },
  {
    src: "/placeholder.svg?height=600&width=800",
    alt: "Portfolio Image 3",
    caption: "Development Process",
  },
  {
    src: "/placeholder.svg?height=600&width=800",
    alt: "Portfolio Image 4",
    caption: "Client Meeting",
  },
  {
    src: "/placeholder.svg?height=600&width=800",
    alt: "Portfolio Image 5",
    caption: "Workspace Setup",
  },
  {
    src: "/placeholder.svg?height=600&width=800",
    alt: "Portfolio Image 6",
    caption: "Conference Presentation",
  },
]

export default function Gallery() {
  const [selectedImage, setSelectedImage] = useState<number | null>(null)

  const openLightbox = (index: number) => {
    setSelectedImage(index)
    document.body.style.overflow = "hidden"
  }

  const closeLightbox = () => {
    setSelectedImage(null)
    document.body.style.overflow = "auto"
  }

  const navigateImage = (direction: "next" | "prev") => {
    if (selectedImage === null) return

    if (direction === "next") {
      setSelectedImage((selectedImage + 1) % images.length)
    } else {
      setSelectedImage((selectedImage - 1 + images.length) % images.length)
    }
  }

  return (
    <section
      id="gallery"
      className="py-20 bg-gradient-to-br from-gray-900 via-indigo-950 to-purple-950 transition-colors duration-300 overflow-hidden relative"
    >
      <div className="container mx-auto px-6 relative z-10">
        <AnimatedSectionHeader title="Photo Gallery" />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {images.map((image, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group relative overflow-hidden rounded-xl shadow-xl bg-gray-800"
            >
              <div className="aspect-w-16 aspect-h-12 relative">
                <Image
                  src={image.src || "/placeholder.svg"}
                  alt={image.alt}
                  width={800}
                  height={600}
                  className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
                  <p className="text-white font-medium">{image.caption}</p>
                </div>
                <button
                  onClick={() => openLightbox(index)}
                  className="absolute top-2 right-2 bg-black/50 p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  aria-label="Expand image"
                >
                  <Expand className="w-5 h-5 text-white" />
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      {selectedImage !== null && (
        <div className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center">
          <button
            onClick={closeLightbox}
            className="absolute top-4 right-4 p-2 text-white bg-black/50 rounded-full hover:bg-black/70 transition-colors"
            aria-label="Close lightbox"
          >
            <X className="w-6 h-6" />
          </button>
          <button
            onClick={() => navigateImage("prev")}
            className="absolute left-4 p-2 text-white bg-black/50 rounded-full hover:bg-black/70 transition-colors"
            aria-label="Previous image"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          <div className="relative max-w-4xl max-h-[80vh]">
            <Image
              src={images[selectedImage].src || "/placeholder.svg"}
              alt={images[selectedImage].alt}
              width={1200}
              height={800}
              className="object-contain max-h-[80vh]"
            />
            <p className="absolute bottom-0 left-0 right-0 text-center text-white bg-black/50 py-2">
              {images[selectedImage].caption}
            </p>
          </div>
          <button
            onClick={() => navigateImage("next")}
            className="absolute right-4 p-2 text-white bg-black/50 rounded-full hover:bg-black/70 transition-colors"
            aria-label="Next image"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        </div>
      )}

      {/* 装飾的な要素 */}
      <div className="absolute top-0 left-0 w-64 h-64 -mt-32 -ml-32 opacity-10">
        <Image src="/placeholder.svg?height=256&width=256" alt="Decorative background" width={256} height={256} />
      </div>
      <div className="absolute bottom-0 right-0 w-64 h-64 -mb-32 -mr-32 opacity-10">
        <Image src="/placeholder.svg?height=256&width=256" alt="Decorative background" width={256} height={256} />
      </div>
    </section>
  )
}

