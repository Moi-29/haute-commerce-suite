import React from 'react';
import { useStore } from '../store/useStore';
import { Package, ShoppingCart, TrendingUp, DollarSign } from 'lucide-react';

export const AdminDashboard = () => {
  const { products, orders } = useStore();

  const stats = [
    { label: 'Total Revenue', value: `$${orders.reduce((sum, o) => sum + o.total, 0)}`, icon: DollarSign, color: 'bg-green-50 text-green-600' },
    { label: 'Active Orders', value: orders.length, icon: ShoppingCart, color: 'bg-blue-50 text-blue-600' },
    { label: 'Total Products', value: products.length, icon: Package, color: 'bg-purple-50 text-purple-600' },
    { label: 'Avg Order Value', value: orders.length ? `$${Math.round(orders.reduce((sum, o) => sum + o.total, 0) / orders.length)}` : '$0', icon: TrendingUp, color: 'bg-orange-50 text-orange-600' },
  ];

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Commerce Overview</h1>
        <p className="text-gray-500">Welcome back, Administrator.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        {stats.map((stat) => (
          <div key={stat.label} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm font-medium text-gray-500 mb-1">{stat.label}</p>
                <h3 className="text-2xl font-bold">{stat.value}</h3>
              </div>
              <div className={`${stat.color} p-3 rounded-xl`}>
                <stat.icon size={20} />
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="p-6 border-b border-gray-50 flex justify-between items-center">
            <h3 className="font-bold">Recent Orders</h3>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-gray-50 text-[10px] uppercase tracking-widest text-gray-500">
                  <th className="px-6 py-4">Order ID</th>
                  <th className="px-6 py-4">Customer</th>
                  <th className="px-6 py-4">Total</th>
                  <th className="px-6 py-4">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {orders.length === 0 ? (
                  <tr>
                    <td colSpan={4} className="px-6 py-12 text-center text-gray-400 italic text-sm">No orders yet</td>
                  </tr>
                ) : (
                  orders.map((order) => (
                    <tr key={order.id} className="text-sm">
                      <td className="px-6 py-4 font-mono text-xs">#{order.id}</td>
                      <td className="px-6 py-4 font-medium">{order.customer}</td>
                      <td className="px-6 py-4 font-bold">${order.total}</td>
                      <td className="px-6 py-4">
                        <span className="px-2 py-1 rounded-full text-[10px] font-bold uppercase bg-blue-50 text-blue-600">
                          {order.status}
                        </span>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
          <h3 className="font-bold mb-6">Inventory Alerts</h3>
          <div className="space-y-4">
            {products.filter(p => p.stock < 20).map(p => (
              <div key={p.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                <div className="flex items-center gap-4">
                  <img src={p.image} className="w-10 h-10 rounded-lg object-cover" alt="" />
                  <div>
                    <h4 className="text-sm font-bold">{p.name}</h4>
                    <p className="text-xs text-gray-500">{p.stock} in stock</p>
                  </div>
                </div>
                <span className="text-xs font-bold text-red-500">Low Stock</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};