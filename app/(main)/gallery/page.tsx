import prisma from "@/lib/prisma";
import Image from "next/image";
import { Camera, Image as ImageIcon, MapPin } from "lucide-react";

export const dynamic = "force-dynamic";

export default async function GalleryPage() {
  const dbImages = await prisma.galleryImage.findMany({
    orderBy: { createdAt: "desc" },
  });

  const fallbackImages = [
    {
      url: "https://images.unsplash.com/photo-1577896851231-70ef18881754?auto=format&fit=crop&q=80&w=800",
      caption: "Chemistry Lab Workshop",
      location: "Savar Cantonment School",
    },
    {
      url: "https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&q=80&w=800",
      caption: "Science Fair Competition",
      location: "Society Campus",
    },
    {
      url: "https://images.unsplash.com/photo-1542621334-a254cf47733d?auto=format&fit=crop&q=80&w=800",
      caption: "Astronomy Night",
      location: "Jahangirnagar University",
    },
    {
      url: "https://images.unsplash.com/photo-1510531704581-5b2870972060?auto=format&fit=crop&q=80&w=800",
      caption: "Robotics Exhibition",
      location: "Dhaka Regional Center",
    },
    {
      url: "https://images.unsplash.com/photo-1564069114553-7215e1ff1890?auto=format&fit=crop&q=80&w=800",
      caption: "Math Olympiad Training",
      location: "Savar Science Society",
    },
    {
      url: "https://images.unsplash.com/photo-1532094349884-543bc11b234d?auto=format&fit=crop&q=80&w=800",
      caption: "Physics Experiments",
      location: "Government Science College",
    },
  ];

  const displayImages = dbImages.length > 0 
    ? dbImages.map(img => ({ url: img.url, caption: img.caption || "Gallery Image", location: "Savar Science Society" }))
    : fallbackImages;

  return (
    <div className="pt-24 pb-20 min-h-screen bg-[#050d0a]">
      {/* Hero Section */}
      <div className="container mx-auto px-4 mb-16">
        <div className="max-w-3xl mx-auto text-center">
          <div className="badge mb-6 mx-auto">Visual Memories</div>
          <h1 className="text-4xl md:text-6xl font-black text-white mb-6 leading-tight">
            Science in <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#16a34a] to-[#22c55e]">Frames</span>
          </h1>
          <p className="text-[#a3b8aa] text-lg max-w-xl mx-auto">
            A visual journey through our workshops, science fairs, and competitions. Witness the moments of discovery and inspiration.
          </p>
        </div>
      </div>

      {/* Gallery Grid */}
      <div className="container mx-auto px-4">
        <div className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6">
          {displayImages.map((image, index) => (
            <div 
              key={index} 
              className="relative group break-inside-avoid rounded-2xl overflow-hidden border border-[#1a3028] bg-[#0a1410] shadow-xl hover:border-[#22c55e]/50 transition-all duration-500"
            >
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10" />
              
              <img 
                src={image.url} 
                alt={image.caption} 
                className="w-full h-auto object-cover transform group-hover:scale-105 transition-transform duration-700" 
              />
              
              <div className="absolute bottom-0 left-0 right-0 p-6 translate-y-6 group-hover:translate-y-0 transition-transform duration-500 z-20">
                <div className="flex items-center gap-2 text-[#22c55e] text-xs font-bold uppercase tracking-widest mb-2">
                  <Camera className="w-3 h-3" />
                  Photography
                </div>
                <h3 className="text-xl font-bold text-white mb-2">{image.caption}</h3>
                <div className="flex items-center gap-1.5 text-[#a3b8aa] text-sm">
                  <MapPin className="w-4 h-4 text-[#22c55e]" />
                  {image.location}
                </div>
              </div>

              {/* Icon Overlay */}
              <div className="absolute top-4 right-4 z-20 opacity-0 group-hover:opacity-100 transition-opacity delay-100">
                <div className="w-10 h-10 rounded-full bg-[#22c55e] flex items-center justify-center text-[#050d0a] shadow-lg">
                  <ImageIcon className="w-5 h-5" />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State if absolutely nothing exists (unlikely given fallbacks) */}
        {displayImages.length === 0 && (
          <div className="py-20 text-center">
            <ImageIcon className="w-16 h-16 text-[#1a3028] mx-auto mb-6" />
            <h3 className="text-2xl font-bold text-white mb-2">No Images Found</h3>
            <p className="text-[#a3b8aa]">We are currently gathering memories. Check back soon!</p>
          </div>
        )}
      </div>
      
      {/* Aesthetic Background Detail */}
      <div className="fixed bottom-0 right-0 w-[500px] h-[500px] bg-[#22c55e] rounded-full mix-blend-screen filter blur-[150px] opacity-10 pointer-events-none z-0"></div>
    </div>
  );
}
