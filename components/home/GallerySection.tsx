"use client";

import { useRef } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function GallerySection() {
  const images = [
    "https://images.unsplash.com/photo-1577896851231-70ef18881754?auto=format&fit=crop&q=80&w=800",
    "https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&q=80&w=800",
    "https://images.unsplash.com/photo-1542621334-a254cf47733d?auto=format&fit=crop&q=80&w=800",
    "https://images.unsplash.com/photo-1510531704581-5b2870972060?auto=format&fit=crop&q=80&w=800",
    "https://images.unsplash.com/photo-1564069114553-7215e1ff1890?auto=format&fit=crop&q=80&w=800",
  ];

  // Duplicate for seamless infinite loop
  const duplicatedImages = [...images, ...images];

  return (
    <section className="bg-[#050d0a] pt-16 pb-24 border-t border-[#1a3028] overflow-hidden">
      <div className="container mx-auto mb-12">
        <div className="flex flex-col items-center text-center justify-center gap-6">
          <div className="max-w-2xl">
            <div className="badge mb-4 mx-auto">Memories</div>
            <h2 className="section-title">Our <span className="text-[#22c55e]">Gallery</span></h2>
          </div>
        </div>
      </div>

      {/* Infinite scrolling carousel */}
      <div className="relative w-full overflow-hidden mb-12">
        {/* Gradients to fade edges */}
        <div className="absolute top-0 left-0 bottom-0 w-32 bg-gradient-to-r from-[#050d0a] to-transparent z-10"></div>
        <div className="absolute top-0 right-0 bottom-0 w-32 bg-gradient-to-l from-[#050d0a] to-transparent z-10"></div>

        <div className="flex w-[200%] animate-scroll-x hover:[animation-play-state:paused]">
          <div className="flex w-1/2 justify-around gap-6 px-3">
            {images.map((src, i) => (
              <div key={i} className="flex-shrink-0 w-72 h-80 rounded-2xl overflow-hidden border border-[#1a3028] group">
                <img
                  src={src}
                  alt={`Gallery image ${i}`}
                  className="w-full h-full object-cover group-hover:scale-110 group-hover:rotate-2 transition-all duration-700"
                />
              </div>
            ))}
          </div>
          <div className="flex w-1/2 justify-around gap-6 px-3">
            {images.map((src, i) => (
              <div key={`dup-${i}`} className="flex-shrink-0 w-72 h-80 rounded-2xl overflow-hidden border border-[#1a3028] group">
                <img
                  src={src}
                  alt={`Gallery image duplicate ${i}`}
                  className="w-full h-full object-cover group-hover:scale-110 group-hover:rotate-2 transition-all duration-700"
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="container mx-auto flex justify-center mt-8">
        <Link href="/gallery" className="btn-secondary group">
          View All Photos <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>
    </section>
  );
}
