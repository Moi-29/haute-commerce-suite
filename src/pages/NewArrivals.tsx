import React from 'react';
import { motion } from 'framer-motion';
import { useStore } from '../store/useStore';
import { ProductCard } from '../components/store/ProductCard';
import { ArrowRight } from 'lucide-react';

export const NewArrivals = () => {
  const { products } = useStore();
  
  // Mocking new arrivals as the first 4 products
  const newArrivals = products.slice(0, 4);

  return (
    <div className="bg-white pt-32 pb-24">
      <div className="max-w-[1600px] mx-auto px-4 sm:px-8">
        <header className="mb-16 md:mb-24 flex flex-col md:flex-row md:items-end justify-between gap-8">
          <div className="max-w-2xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h1 className="text-5xl md:text-7xl lg:text-8xl font-serif tracking-tighter mb-8">
                The New <br /><span className="italic">Standard</span>
              </h1>
              <p className="text-gray-500 text-sm md:text-base max-w-md uppercase tracking-widest font-bold leading-relaxed">
                Explore our latest drop. A curated selection of pieces designed for the modern individual who seeks both form and function.
              </p>
            </motion.div>
          </div>
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 1 }}
            className="flex items-center gap-4 text-[10px] font-bold uppercase tracking-[0.3em] text-gray-400"
          >
            <span>Volume 01</span>
            <div className="w-12 h-[1px] bg-gray-200" />
            <span>2024 Collection</span>
          </motion.div>
        </header>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-16">
          {newArrivals.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
            >
              <ProductCard product={product} />
            </motion.div>
          ))}
        </div>

        <motion.div 
          className="mt-32 border-t border-gray-100 pt-20 flex flex-col items-center text-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <h2 className="text-2xl font-serif mb-6 italic">Looking for something else?</h2>
          <button className="group flex items-center gap-4 text-xs font-bold uppercase tracking-[0.2em] border-b border-black pb-2 hover:gap-6 transition-all duration-300">
            View All Products <ArrowRight size={14} />
          </button>
        </motion.div>
      </div>
    </div>
  );
};