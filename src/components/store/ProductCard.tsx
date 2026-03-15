import React from 'react';
import { motion } from 'framer-motion';
import { Product } from '../../types';
import { ShoppingCart, Eye } from 'lucide-react';
import { useStore } from '../../store/useStore';
import { Link } from 'react-router-dom';
import { toast } from 'sonner';

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { addToCart } = useStore();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product);
    toast.success(`${product.name} added to cart`);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="group"
    >
      <Link to={`/product/${product.id}`} className="block">
        <div className="relative aspect-[4/5] overflow-hidden bg-gray-100 mb-4 rounded-xl">
          <img
            src={product.image}
            alt={product.name}
            className="object-cover w-full h-full transition-transform duration-700 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity" />
          
          <div className="absolute bottom-4 left-4 right-4 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 flex space-x-2">
            <button
              onClick={handleAddToCart}
              className="flex-1 bg-white text-black py-3 rounded-full text-sm font-semibold flex items-center justify-center space-x-2 shadow-xl hover:bg-black hover:text-white transition-colors"
            >
              <ShoppingCart size={16} />
              <span>Add to Cart</span>
            </button>
            <button className="p-3 bg-white text-black rounded-full shadow-xl hover:bg-black hover:text-white transition-colors">
              <Eye size={16} />
            </button>
          </div>
        </div>
        
        <div className="space-y-1">
          <div className="flex justify-between items-start">
            <h3 className="text-sm font-medium text-gray-900">{product.name}</h3>
            <p className="text-sm font-semibold">${product.price}</p>
          </div>
          <p className="text-xs text-gray-500 uppercase tracking-widest">{product.category}</p>
        </div>
      </Link>
    </motion.div>
  );
};