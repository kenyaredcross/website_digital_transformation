"use client";

import { useState } from "react";
import Image from "next/image";
import { Camera, X, Maximize2 } from "lucide-react";

interface GalleryImage {
  id: string;
  src: string;
  title: string;
  caption: string;
  category: string;
}

const distroImages: GalleryImage[] = [
  {
    id: "img1",
    src: "/assets/images/distro/presentation1.jpg",
    title: "Digital Strategy & Stakeholder Engagement",
    caption: "Presenting digital transformation initiatives, product roadmaps, and data governance frameworks to organizational leadership.",
    category: "Strategy & Innovation",
  },
  {
    id: "img2",
    src: "/assets/images/distro/hands1.jpg",
    title: "Frontline Cash & Aid Distribution",
    caption: "Deploying digitized cash transfer systems directly in community field sites for rapid, dignified relief delivery.",
    category: "Field Operations",
  },
  {
    id: "img3",
    src: "/assets/images/distro/lake1.jpg",
    title: "Flood Surveillance & Environmental Assessment",
    caption: "Field teams assessing high-risk flood zones and integrating spatial telemetry for early warning response.",
    category: "Disaster Preparedness",
  },
  {
    id: "img4",
    src: "/assets/images/distro/presentation3.jpg",
    title: "Capacity Building & Technical Training",
    caption: "Empowering Red Cross branch coordinators and field volunteers with modern digital platforms and mobile data tools.",
    category: "Capacity Building",
  },
];

export function AboutGallery() {
  const [selectedImage, setSelectedImage] = useState<GalleryImage | null>(null);

  return (
    <section className="py-24 bg-slate-950 border-b border-slate-800 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div className="space-y-3 max-w-2xl">
            <span className="text-xs font-bold uppercase tracking-widest text-red-500 font-mono flex items-center gap-2">
              <Camera className="w-4 h-4 text-red-500" /> Field Operations & Impact
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              Frontline Deployments in Action
            </h2>
            <p className="text-slate-400 text-base leading-relaxed">
              Real moments from our digital transformation journey—from field distributions and environmental assessments to technical workshops and strategy sessions.
            </p>
          </div>
          <div className="hidden md:block text-right">
            <span className="text-xs font-mono text-slate-500 bg-slate-900 border border-slate-800 px-4 py-2 rounded-full">
              4 Featured Field Snapshots
            </span>
          </div>
        </div>

        {/* 4-Image Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {distroImages.map((img) => (
            <div
              key={img.id}
              onClick={() => setSelectedImage(img)}
              className="group relative h-80 rounded-2xl overflow-hidden bg-slate-900 border border-slate-800/80 cursor-pointer hover:border-red-500/50 transition-all duration-300 shadow-lg hover:shadow-red-500/10 flex flex-col justify-end"
            >
              {/* Image with hover zoom */}
              <Image
                src={img.src}
                alt={img.title}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
              />

              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />

              {/* Top Category Badge & Maximize Icon */}
              <div className="absolute top-4 left-4 right-4 flex items-center justify-between z-10">
                <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-red-400 bg-slate-950/80 backdrop-blur-md px-2.5 py-1 rounded-full border border-red-800/40">
                  {img.category}
                </span>
                <div className="p-1.5 rounded-full bg-slate-950/80 text-slate-400 group-hover:text-white group-hover:bg-red-600 transition-colors">
                  <Maximize2 className="w-3.5 h-3.5" />
                </div>
              </div>

              {/* Bottom Caption Content */}
              <div className="relative z-10 p-5 space-y-1">
                <h3 className="text-base font-bold text-white group-hover:text-red-400 transition-colors leading-snug">
                  {img.title}
                </h3>
                <p className="text-xs text-slate-300 line-clamp-2 leading-relaxed">
                  {img.caption}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Fullscreen Lightbox Modal */}
      {selectedImage && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/90 backdrop-blur-md">
          <div
            className="fixed inset-0"
            onClick={() => setSelectedImage(null)}
          />
          <div className="relative z-10 max-w-4xl w-full bg-slate-900 border border-slate-800 rounded-3xl overflow-hidden shadow-2xl space-y-0">
            {/* Modal Header */}
            <div className="p-4 sm:p-6 border-b border-slate-800 flex items-center justify-between bg-slate-950/60">
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-red-400 bg-red-950/60 px-3 py-1 rounded border border-red-800/50">
                {selectedImage.category}
              </span>
              <button
                onClick={() => setSelectedImage(null)}
                className="p-2 rounded-full text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
                aria-label="Close image modal"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Image */}
            <div className="relative w-full h-[60vh] max-h-[500px] bg-slate-950">
              <Image
                src={selectedImage.src}
                alt={selectedImage.title}
                fill
                className="object-contain"
              />
            </div>

            {/* Modal Footer Caption */}
            <div className="p-6 bg-slate-900 border-t border-slate-800 space-y-2">
              <h3 className="text-xl font-bold text-white">{selectedImage.title}</h3>
              <p className="text-sm text-slate-300 leading-relaxed">
                {selectedImage.caption}
              </p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
