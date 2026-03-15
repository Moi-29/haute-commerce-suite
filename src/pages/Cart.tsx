import React from 'react';
import { useStore } from '../store/useStore';
import { Trash2, Plus, Minus, ArrowRight, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import { toast } from 'sonner';

export const Cart = () => {
  const { cart, updateCartQuantity, removeFromCart, placeOrder } = useStore();
  const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const shipping = subtotal > 500 ? 0 : 25;
  const total = subtotal + shipping;

  const handleCheckout = () => {
    if (cart.length === 0) return;
    placeOrder('Guest User');
    toast.success('Order placed successfully!');
  };

  if (cart.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-32 text-center">
        <h2 className="text-3xl font-serif mb-6">Your cart is empty.</h2>
        <Link to="/shop" className="inline-flex items-center text-sm font-bold uppercase tracking-widest hover:opacity-70">
          <ArrowLeft className="mr-2" size={16} /> Start Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <h1 className="text-4xl font-serif mb-12">Shopping Bag</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
        <div className="lg:col-span-8">
          <div className="space-y-8">
            {cart.map((item) => (
              <div key={item.id} className="flex gap-6 py-6 border-b border-gray-100 last:border-0">
                <div className="w-24 h-32 flex-shrink-0 bg-gray-50 rounded-lg overflow-hidden">
                  <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                </div>
                
                <div className="flex-1 flex flex-col justify-between">
                  <div className="flex justify-between">
                    <div>
                      <h3 className="font-medium text-lg">{item.name}</h3>
                      <p className="text-sm text-gray-500">{item.category}</p>
                    </div>
                    <p className="font-bold">${item.price * item.quantity}</p>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <div className="flex items-center border border-gray-200 rounded-full px-4 py-1">
                      <button 
                        onClick={() => updateCartQuantity(item.id, item.quantity - 1)}
                        className="p-1"
                      >
                        <Minus size={14} />
                      </button>
                      <span className="mx-4 text-sm font-medium">{item.quantity}</span>
                      <button 
                        onClick={() => updateCartQuantity(item.id, item.quantity + 1)}
                        className="p-1"
                      >
                        <Plus size={14} />
                      </button>
                    </div>
                    
                    <button 
                      onClick={() => removeFromCart(item.id)}
                      className="text-gray-400 hover:text-red-500 transition-colors"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="lg:col-span-4">
          <div className="bg-gray-50 rounded-3xl p-8 sticky top-32">
            <h3 className="text-xl font-serif mb-6">Summary</h3>
            <div className="space-y-4 mb-8">
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Subtotal</span>
                <span>${subtotal}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Shipping</span>
                <span>{shipping === 0 ? 'Free' : `$${shipping}`}</span>
              </div>
              <div className="pt-4 border-t border-gray-200 flex justify-between font-bold text-lg">
                <span>Total</span>
                <span>${total}</span>
              </div>
            </div>
            
            <button
              onClick={handleCheckout}
              className="w-full bg-black text-white py-4 rounded-full font-semibold flex items-center justify-center space-x-2 hover:bg-gray-800 transition-colors"
            >
              <span>Checkout Now</span>
              <ArrowRight size={18} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};