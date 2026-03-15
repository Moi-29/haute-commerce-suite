import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useStore } from '../store/useStore';
import { Minus, Plus, ShoppingBag, ArrowLeft, Star, ShieldCheck, Truck, RefreshCcw } from 'lucide-react';
import { motion } from 'framer-motion';
import { toast } from 'sonner';

export const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { products, addToCart } = useStore();
  const product = products.find((p) => p.id === id);
  const [quantity, setQuantity] = useState(1);

  if (!product) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-32 text-center">
        <h2 className="text-2xl font-serif mb-4">Product not found.</h2>
        <button onClick={() => navigate('/shop')} className="text-sm font-bold uppercase tracking-widest underline">
          Back to Shop
        </button>
      </div>
    );
  }

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      addToCart(product);
    }
    toast.success(`${quantity} ${product.name} added to cart`);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-24">
      <button 
        onClick={() => navigate(-1)} 
        className="flex items-center text-sm font-bold uppercase tracking-widest text-gray-400 hover:text-black mb-12 transition-colors"
      >
        <ArrowLeft className="mr-2" size={16} /> Back
      </button>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
        {/* Image Section */}
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="relative aspect-[4/5] rounded-3xl overflow-hidden bg-gray-100"
        >
          <img 
            src={product.image} 
            alt={product.name} 
            className="w-full h-full object-cover"
          />
        </motion.div>

        {/* Info Section */}
        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex flex-col"
        >
          <div className="mb-8">
            <span className="text-xs font-bold uppercase tracking-[0.3em] text-gray-400 mb-4 block">
              {product.category}
            </span>
            <h1 className="text-4xl md:text-5xl font-serif mb-4 leading-tight">{product.name}</h1>
            <div className="flex items-center gap-4 mb-6">
              <div className="flex text-yellow-400">
                {[...Array(5)].map((_, i) => <Star key={i} size={16} fill="currentColor" />)}
              </div>
              <span className="text-sm text-gray-400 font-medium">(24 Reviews)</span>
            </div>
            <p className="text-2xl font-bold">${product.price}</p>
          </div>

          <p className="text-lg text-gray-600 leading-relaxed mb-10">
            {product.description}
          </p>

          <div className="space-y-8 mb-12">
            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-4 block">Quantity</span>
              <div className="flex items-center border border-gray-200 rounded-full w-fit px-6 py-2">
                <button 
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="p-2 hover:text-black transition-colors"
                >
                  <Minus size={18} />
                </button>
                <span className="mx-8 text-lg font-bold w-4 text-center">{quantity}</span>
                <button 
                  onClick={() => setQuantity(quantity + 1)}
                  className="p-2 hover:text-black transition-colors"
                >
                  <Plus size={18} />
                </button>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <button
                onClick={handleAddToCart}
                className="flex-1 bg-black text-white py-5 rounded-full font-bold flex items-center justify-center space-x-3 hover:bg-gray-800 transition-all shadow-xl hover:shadow-2xl active:scale-95"
              >
                <ShoppingBag size={20} />
                <span>Add to Bag</span>
              </button>
              <button className="px-8 py-5 border-2 border-gray-100 rounded-full font-bold hover:border-black transition-colors">
                Wishlist
              </button>
            </div>
          </div>

          {/* Trust Badges */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-8 border-t border-gray-100">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-gray-50 rounded-lg"><Truck size={20} /></div>
              <div className="text-[10px] font-bold uppercase tracking-widest leading-tight">Free <br/> Shipping</div>
            </div>
            <div className="flex items-center gap-3">
              <div className="p-2 bg-gray-50 rounded-lg"><RefreshCcw size={20} /></div>
              <div className="text-[10px] font-bold uppercase tracking-widest leading-tight">30-Day <br/> Returns</div>
            </div>
            <div className="flex items-center gap-3">
              <div className="p-2 bg-gray-50 rounded-lg"><ShieldCheck size={20} /></div>
              <div className="text-[10px] font-bold uppercase tracking-widest leading-tight">Authenticity <br/> Guaranteed</div>
            </div>
          </div>
        </motion.div>
      </div>
      
      {/* Related Section Placeholder */}
      <section className="mt-32">
        <h3 className="text-2xl font-serif mb-12">You might also like</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {products.filter(p => p.id !== product.id).slice(0, 4).map(p => (
            <div key={p.id} className="group cursor-pointer" onClick={() => navigate(`/product/${p.id}`)}>
              <div className="aspect-[4/5] overflow-hidden bg-gray-100 rounded-2xl mb-4">
                <img src={p.image} alt={p.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
              </div>
              <h4 className="text-sm font-bold">{p.name}</h4>
              <p className="text-sm text-gray-500">${p.price}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};