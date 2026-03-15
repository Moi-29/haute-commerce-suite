import React from 'react';
import { BrowserRouter, Routes, Route, Link, useLocation, Navigate } from 'react-router-dom';
import { Navbar } from './components/layout/Navbar';
import { Home } from './pages/Home';
import { Shop } from './pages/Shop';
import { Cart } from './pages/Cart';
import { ProductDetail } from './pages/ProductDetail';
import { NewArrivals } from './pages/NewArrivals';
import { Collections } from './pages/Collections';
import { About } from './pages/About';
import { AdminDashboard } from './pages/AdminDashboard';
import { AdminProducts } from './pages/AdminProducts';
import { Toaster } from 'sonner';
import { LayoutDashboard, Package, ShoppingBag, Settings, ArrowLeft, LogOut } from 'lucide-react';
import { useStore } from './store/useStore';

const Footer = () => (
  <footer className="bg-black text-white pt-24 pb-12">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
        <div className="col-span-1 md:col-span-2">
          <h2 className="text-3xl font-serif mb-6 tracking-tighter">LUMINA</h2>
          <p className="text-gray-400 max-w-sm mb-8">
            Experience the art of minimalism. Our collections are designed for those who appreciate the finer details of life.
          </p>
          <div className="flex gap-4">
            <input 
              type="email" 
              placeholder="Newsletter" 
              className="bg-white/10 border-none outline-none px-6 py-3 rounded-full text-sm flex-1 focus:ring-1 ring-white/20 transition-all placeholder:text-gray-500"
            />
            <button className="bg-white text-black px-8 py-3 rounded-full text-sm font-bold hover:bg-gray-200 transition-colors">Join</button>
          </div>
        </div>
        <div>
          <h4 className="text-xs font-bold uppercase tracking-[0.2em] mb-6 text-gray-500">Shop</h4>
          <ul className="space-y-4 text-sm font-medium">
            <li><Link to="/shop" className="hover:text-gray-400 transition-colors">All Products</Link></li>
            <li><Link to="/new-arrivals" className="hover:text-gray-400 transition-colors">New Arrivals</Link></li>
            <li><Link to="/collections" className="hover:text-gray-400 transition-colors">Featured Collections</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="text-xs font-bold uppercase tracking-[0.2em] mb-6 text-gray-500">Support</h4>
          <ul className="space-y-4 text-sm font-medium">
            <li><a href="#" className="hover:text-gray-400 transition-colors">Track Order</a></li>
            <li><a href="#" className="hover:text-gray-400 transition-colors">Returns Policy</a></li>
            <li><a href="#" className="hover:text-gray-400 transition-colors">Store Locator</a></li>
          </ul>
        </div>
      </div>
      <div className="pt-12 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-6 text-[10px] uppercase tracking-widest text-gray-500 font-bold">
        <p>© 2024 LUMINA DESIGN HOUSE. ALL RIGHTS RESERVED.</p>
        <div className="flex gap-8">
          <a href="#" className="hover:text-white">Privacy</a>
          <a href="#" className="hover:text-white">Terms</a>
          <a href="#" className="hover:text-white">Cookies</a>
        </div>
      </div>
    </div>
  </footer>
);

const AdminLayout = ({ children }: { children: React.ReactNode }) => {
  const location = useLocation();
  const { toggleAdmin } = useStore();
  const menuItems = [
    { label: 'Overview', icon: LayoutDashboard, path: '/admin' },
    { label: 'Products', icon: Package, path: '/admin/products' },
    { label: 'Orders', icon: ShoppingBag, path: '#' },
    { label: 'Settings', icon: Settings, path: '#' },
  ];

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r border-gray-200 flex flex-col sticky top-0 h-screen">
        <div className="p-8 border-b border-gray-100 flex items-center justify-between">
          <Link to="/" className="text-xl font-serif tracking-tighter">LUMINA</Link>
          <Link to="/" className="text-gray-400 hover:text-black" title="Store View"><ArrowLeft size={18} /></Link>
        </div>
        <nav className="flex-1 p-4 space-y-2 mt-4">
          {menuItems.map((item) => (
            <Link
              key={item.label}
              to={item.path}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                location.pathname === item.path 
                  ? 'bg-black text-white shadow-lg' 
                  : 'text-gray-500 hover:bg-gray-50 hover:text-black'
              }`}
            >
              <item.icon size={20} />
              <span className="text-sm font-medium">{item.label}</span>
            </Link>
          ))}
        </nav>
        <div className="p-6 border-t border-gray-100">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold text-xs">AD</div>
            <div className="flex-1 overflow-hidden">
              <p className="text-xs font-bold truncate">Admin User</p>
              <p className="text-[10px] text-gray-400">admin@lumina.com</p>
            </div>
          </div>
          <button 
            onClick={toggleAdmin}
            className="w-full flex items-center justify-center gap-2 py-2 text-xs font-bold uppercase tracking-widest text-red-500 hover:bg-red-50 rounded-lg transition-colors"
          >
            <LogOut size={14} /> Exit Admin
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1">
        {children}
      </main>
    </div>
  );
};

const ScrollToTop = () => {
  const { pathname } = useLocation();
  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

function AppContent() {
  const location = useLocation();
  const isStorePath = !location.pathname.startsWith('/admin');

  return (
    <div className="min-h-screen font-sans selection:bg-black selection:text-white">
      <ScrollToTop />
      <Toaster position="bottom-center" richColors />
      
      {isStorePath ? (
        <>
          <Navbar />
          <main>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/shop" element={<Shop />} />
              <Route path="/new-arrivals" element={<NewArrivals />} />
              <Route path="/collections" element={<Collections />} />
              <Route path="/about" element={<About />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/product/:id" element={<ProductDetail />} />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </main>
          <Footer />
        </>
      ) : (
        <AdminLayout>
          <Routes>
            <Route path="/admin" element={<AdminDashboard />} />
            <Route path="/admin/products" element={<AdminProducts />} />
            <Route path="*" element={<Navigate to="/admin" replace />} />
          </Routes>
        </AdminLayout>
      )}
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}