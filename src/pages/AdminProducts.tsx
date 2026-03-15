import React from 'react';
import { useStore } from '../store/useStore';
import { Plus, Edit2, Trash2 } from 'lucide-react';
import { toast } from 'sonner';

export const AdminProducts = () => {
  const { products, deleteProduct } = useStore();

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Catalog Management</h1>
          <p className="text-gray-500">Add or modify your luxury products.</p>
        </div>
        <button className="bg-black text-white px-6 py-2.5 rounded-full flex items-center gap-2 hover:bg-gray-800 transition-colors shadow-lg">
          <Plus size={18} />
          <span className="text-sm font-bold">Add Product</span>
        </button>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <table className="w-full text-left">
          <thead>
            <tr className="bg-gray-50 text-[10px] uppercase tracking-widest text-gray-500">
              <th className="px-6 py-4">Product</th>
              <th className="px-6 py-4">Category</th>
              <th className="px-6 py-4">Price</th>
              <th className="px-6 py-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {products.map((product) => (
              <tr key={product.id} className="hover:bg-gray-50/50 transition-colors">
                <td className="px-6 py-4">
                  <div className="flex items-center gap-4">
                    <img src={product.image} className="w-12 h-12 rounded-xl object-cover" alt="" />
                    <h4 className="text-sm font-bold">{product.name}</h4>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <span className="text-[10px] font-bold uppercase tracking-widest text-gray-400">{product.category}</span>
                </td>
                <td className="px-6 py-4 font-bold text-sm">${product.price}</td>
                <td className="px-6 py-4 text-right">
                  <div className="flex justify-end gap-2">
                    <button className="p-2 text-gray-400 hover:text-black hover:bg-gray-100 rounded-lg transition-all">
                      <Edit2 size={16} />
                    </button>
                    <button 
                      onClick={() => {
                        deleteProduct(product.id);
                        toast.error('Product deleted');
                      }}
                      className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};