import React from 'react';
import { motion } from 'framer-motion';

export const About = () => {
  return (
    <div className="bg-white pt-32 pb-24 overflow-hidden">
      {/* Hero Section */}
      <div className="max-w-[1600px] mx-auto px-4 sm:px-8 mb-32">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
          <div className="lg:col-span-7">
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-[10px] font-bold uppercase tracking-[0.4em] text-gray-400 mb-6"
            >
              The Essence of Lumina
            </motion.p>
            <motion.h1 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1 }}
              className="text-5xl md:text-8xl lg:text-9xl font-serif tracking-tighter leading-none mb-12"
            >
              Pure <br />
              <span className="italic">Perspective.</span>
            </motion.h1>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="max-w-xl space-y-8"
            >
              <p className="text-xl md:text-2xl font-light text-gray-600 leading-relaxed italic">
                "We believe that true luxury is found in the space between the elements, the silence between the notes, and the simplicity of a single line."
              </p>
              <p className="text-sm md:text-base text-gray-500 leading-loose uppercase tracking-[0.05em]">
                Founded in 2024, LUMINA was born from a desire to bridge the gap between high-fashion architectural concepts and everyday wearable art. Our studio in Paris serves as a laboratory for fabric innovation and silhouette research.
              </p>
            </motion.div>
          </div>
          <div className="lg:col-span-5 relative">
            <motion.div 
              initial={{ opacity: 0, scale: 1.1 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1.5 }}
              className="aspect-[3/4] bg-gray-100 overflow-hidden rounded-sm shadow-2xl"
            >
              <img 
                src="https://images.unsplash.com/photo-1550684848-fac1c5b4e853?q=80&w=2070&auto=format&fit=crop" 
                alt="Studio" 
                className="w-full h-full object-cover"
              />
            </motion.div>
            <div className="absolute -bottom-8 -left-8 bg-black text-white p-8 hidden md:block">
              <p className="text-[10px] font-bold uppercase tracking-[0.3em] mb-2">Established</p>
              <p className="text-3xl font-serif italic tracking-tighter">MMXXIV</p>
            </div>
          </div>
        </div>
      </div>

      {/* Values */}
      <div className="bg-black py-32 text-white">
        <div className="max-w-[1600px] mx-auto px-4 sm:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-16 md:gap-32">
            <div>
              <span className="text-4xl font-serif italic mb-6 block">01</span>
              <h3 className="text-xs font-bold uppercase tracking-[0.3em] mb-6 text-gray-400">Sustainability</h3>
              <p className="text-sm font-light leading-relaxed opacity-70 uppercase tracking-widest">
                We use exclusively organic and recycled materials, ensuring our footprint is as light as our designs.
              </p>
            </div>
            <div>
              <span className="text-4xl font-serif italic mb-6 block">02</span>
              <h3 className="text-xs font-bold uppercase tracking-[0.3em] mb-6 text-gray-400">Craftsmanship</h3>
              <p className="text-sm font-light leading-relaxed opacity-70 uppercase tracking-widest">
                Every piece is hand-finished by artisans with decades of experience in high-end tailoring.
              </p>
            </div>
            <div>
              <span className="text-4xl font-serif italic mb-6 block">03</span>
              <h3 className="text-xs font-bold uppercase tracking-[0.3em] mb-6 text-gray-400">Timelessness</h3>
              <p className="text-sm font-light leading-relaxed opacity-70 uppercase tracking-widest">
                We reject the cycle of fast fashion, creating items meant to be worn and cherished for a lifetime.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};