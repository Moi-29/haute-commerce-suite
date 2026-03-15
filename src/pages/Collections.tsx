import React from 'react';
import { motion } from 'framer-motion';

const COLLECTIONS = [
  {
    title: "The Minimalist",
    description: "Stripped back essentials for the refined wardrobe.",
    image: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=2070&auto=format&fit=crop",
    count: "12 Items"
  },
  {
    title: "Urban Architecture",
    description: "Structured silhouettes and industrial tones.",
    image: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=2040&auto=format&fit=crop",
    count: "08 Items"
  },
  {
    title: "Soft Sculptures",
    description: "Fluid fabrics that move with the human form.",
    image: "https://images.unsplash.com/photo-1445205170230-053b83016050?q=80&w=2071&auto=format&fit=crop",
    count: "15 Items"
  },
  {
    title: "Noir Series",
    description: "A deep dive into the versatility of midnight shades.",
    image: "https://images.unsplash.com/photo-1475184444620-85f62b7812ee?q=80&w=2070&auto=format&fit=crop",
    count: "06 Items"
  }
];

export const Collections = () => {
  return (
    <div className="bg-[#f9f9f9] pt-32 pb-24 min-h-screen">
      <div className="max-w-[1600px] mx-auto px-4 sm:px-8">
        <div className="mb-20">
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-[10px] font-bold uppercase tracking-[0.4em] text-gray-400 mb-4"
          >
            Curated Series
          </motion.p>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-8xl font-serif tracking-tighter"
          >
            Our <span className="italic font-light">Collections</span>
          </motion.h1>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {COLLECTIONS.map((collection, index) => (
            <motion.div
              key={collection.title}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              className="group relative h-[600px] overflow-hidden bg-white"
            >
              <div className="absolute inset-0 overflow-hidden">
                <motion.img 
                  src={collection.image} 
                  alt={collection.title}
                  className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/10 group-hover:bg-black/20 transition-colors duration-500" />
              </div>
              
              <div className="absolute inset-0 flex flex-col justify-end p-8 md:p-12 text-white">
                <div className="translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                  <div className="flex items-center justify-between mb-4">
                     <span className="text-[10px] font-bold uppercase tracking-[0.2em] opacity-80">{collection.count}</span>
                     <div className="w-12 h-[1px] bg-white/30" />
                  </div>
                  <h3 className="text-3xl md:text-4xl font-serif mb-4">{collection.title}</h3>
                  <p className="text-sm md:text-base opacity-0 group-hover:opacity-100 transition-opacity duration-500 max-w-xs font-light tracking-wide">
                    {collection.description}
                  </p>
                </div>
              </div>

              <div className="absolute top-8 right-8 overflow-hidden">
                <div className="w-12 h-12 rounded-full border border-white/30 flex items-center justify-center -rotate-45 group-hover:rotate-0 transition-transform duration-500 backdrop-blur-sm">
                  <span className="text-white text-xl">→</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};