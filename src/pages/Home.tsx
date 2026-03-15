import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Star, ArrowUpRight } from 'lucide-react';
import { useStore } from '../store/useStore';
import { ProductCard } from '../components/store/ProductCard';
import { Link } from 'react-router-dom';

export const Home = () => {
  const { products } = useStore();
  const featured = products.filter(p => p.featured).slice(0, 4);

  return (
    <div className="flex flex-col gap-24 pb-24">
      <section className="relative h-[90vh] flex items-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src="https://storage.googleapis.com/dala-prod-public-storage/generated-images/dd48e6e8-81b0-485a-8ff5-21cf602d8e9c/hero-banner-1-6f287900-1773606175872.webp"
            className="w-full h-full object-cover"
            alt="Hero Background"
          />
          <div className="absolute inset-0 bg-black/20" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full text-white">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="max-w-2xl"
          >
            <span className="uppercase tracking-[0.4em] text-sm font-medium mb-6 block">Premium Lifestyle</span>
            <h1 className="text-6xl md:text-8xl font-serif leading-tight mb-8">
              Define Your <br />
              <span className="italic">Excellence.</span>
            </h1>
            <p className="text-lg md:text-xl text-white/80 mb-10 max-w-lg leading-relaxed">
              Curated essentials for the modern lifestyle. Crafting everyday luxury through meticulous design and sustainable materials.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                to="/shop"
                className="inline-flex items-center justify-center px-8 py-4 bg-white text-black font-semibold rounded-full hover:bg-black hover:text-white transition-colors duration-300 group"
              >
                Shop Collection
                <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" size={20} />
              </Link>
              <button className="inline-flex items-center justify-center px-8 py-4 border border-white/40 text-white font-semibold rounded-full hover:bg-white/10 transition-colors backdrop-blur-sm">
                View Journal
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
          <div className="max-w-xl">
            <h2 className="text-4xl font-serif mb-4">Curated Essentials</h2>
            <p className="text-gray-500">Discover our most coveted pieces, chosen for their exceptional craftsmanship and timeless appeal.</p>
          </div>
          <Link to="/shop" className="text-sm font-bold uppercase tracking-widest flex items-center hover:opacity-70">
            View All Products <ArrowUpRight className="ml-1" size={16} />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-12">
          {featured.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      <section className="bg-gray-50 py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            <div className="relative aspect-square">
              <img 
                src="https://storage.googleapis.com/dala-prod-public-storage/generated-images/dd48e6e8-81b0-485a-8ff5-21cf602d8e9c/product-4---furniture-0f3d7353-1773606171571.webp" 
                className="w-full h-full object-cover rounded-3xl"
                alt="Philosophy"
              />
            </div>
            
            <div className="space-y-8">
              <span className="text-sm font-bold uppercase tracking-widest text-gray-400">Our Heritage</span>
              <h2 className="text-5xl font-serif leading-tight">Design that transcends trends and time.</h2>
              <p className="text-lg text-gray-600 leading-relaxed">
                Founded on the principles of minimalism and longevity, Lumina brings together artisans from across the globe to create objects that matter.
              </p>
              <div className="grid grid-cols-2 gap-8 pt-4">
                <div>
                  <h4 className="text-3xl font-serif mb-1">100%</h4>
                  <p className="text-xs text-gray-400 uppercase tracking-widest">Sustainable Sourcing</p>
                </div>
                <div>
                  <h4 className="text-3xl font-serif mb-1">12+</h4>
                  <p className="text-xs text-gray-400 uppercase tracking-widest">Artisan Partners</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};