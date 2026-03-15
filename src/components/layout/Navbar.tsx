import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  ShoppingBag, 
  User, 
  Menu, 
  X, 
  ShieldCheck, 
  Search, 
  Heart,
  Globe,
  ChevronDown
} from 'lucide-react';
import { useStore } from '../../store/useStore';
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from 'framer-motion';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';

const NAV_LINKS = [
  { name: 'Home', path: '/' },
  { name: 'New Arrivals', path: '/new-arrivals' },
  { name: 'Collections', path: '/collections' },
  { name: 'About', path: '/about' },
  { name: 'Shop All', path: '/shop' },
];

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isHidden, setIsHidden] = useState(false);
  const { cart, isAdmin, toggleAdmin } = useStore();
  const location = useLocation();
  const { scrollY } = useScroll();

  const cartCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = scrollY.getPrevious() ?? 0;
    if (latest > previous && latest > 150) {
      setIsHidden(true);
    } else {
      setIsHidden(false);
    }
  });

  // Close mobile menu on route change
  useEffect(() => {
    setIsOpen(false);
    setIsSearchOpen(false);
  }, [location.pathname]);

  return (
    <>
      {/* Top Banner */}
      <div className="bg-black text-[10px] sm:text-[11px] uppercase tracking-[0.2em] font-bold text-white py-2.5 text-center transition-all duration-300">
        Complimentary worldwide shipping on orders over $500
      </div>

      <motion.nav
        variants={{
          visible: { y: 0 },
          hidden: { y: "-100%" },
        }}
        animate={isHidden ? "hidden" : "visible"}
        transition={{ duration: 0.35, ease: "easeInOut" }}
        className={cn(
          "sticky top-0 z-[60] w-full transition-colors duration-500",
          "bg-white/80 backdrop-blur-xl border-b border-gray-100/50"
        )}
      >
        <div className="max-w-[1600px] mx-auto px-4 sm:px-8">
          <div className="flex justify-between items-center h-16 sm:h-20 lg:h-24">
            
            {/* Logo Section (Left Side) */}
            <div className="flex-none text-left">
              <Link to="/" className="inline-block group">
                <motion.span 
                  className="text-2xl sm:text-3xl lg:text-4xl font-serif tracking-[-0.05em] leading-none block"
                  whileHover={{ scale: 1.02 }}
                  transition={{ type: "spring", stiffness: 400, damping: 10 }}
                >
                  LUMINA
                </motion.span>
                <div className="h-[0.5px] w-full bg-black/40 mt-0.5 scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
              </Link>
            </div>

            {/* Grouped Nav Elements (Right Side) */}
            <div className="flex items-center">
              
              {/* Desktop Sections */}
              <div className="hidden lg:flex items-center">
                
                {/* Section 1: Navigation Links */}
                <nav className="flex items-center space-x-10 px-10 border-r border-gray-100">
                  {NAV_LINKS.map((link) => (
                    <Link
                      key={link.name}
                      to={link.path}
                      className={cn(
                        "text-[11px] uppercase tracking-[0.2em] font-bold transition-colors whitespace-nowrap relative group",
                        location.pathname === link.path ? "text-black" : "text-gray-400 hover:text-black"
                      )}
                    >
                      {link.name}
                      {location.pathname === link.path && (
                        <motion.div 
                          layoutId="nav-underline"
                          className="absolute -bottom-1 left-0 right-0 h-[1.5px] bg-black"
                        />
                      )}
                    </Link>
                  ))}
                </nav>

                {/* Section 2: Language / Region Selector */}
                <div className="flex items-center px-10 border-r border-gray-100 group relative cursor-pointer">
                  <div className="flex items-center space-x-2 text-[10px] font-bold uppercase tracking-widest text-gray-500 hover:text-black transition-colors">
                    <Globe size={13} strokeWidth={2} />
                    <span>US / EN</span>
                    <ChevronDown size={12} className="group-hover:rotate-180 transition-transform duration-300" />
                  </div>
                  
                  {/* Dropdown Placeholder */}
                  <div className="absolute top-full left-0 pt-4 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300">
                    <div className="bg-white border border-gray-100 shadow-2xl p-6 min-w-[200px]">
                      <p className="text-[10px] uppercase tracking-widest font-bold text-gray-400 mb-4 border-b pb-2">Select Region</p>
                      <ul className="space-y-3">
                        <li className="text-[11px] font-bold text-black flex items-center justify-between cursor-default">
                          United States (USD) <span className="w-1.5 h-1.5 bg-black rounded-full" />
                        </li>
                        <li className="text-[11px] font-bold text-gray-400 hover:text-black transition-colors cursor-pointer">Europe (EUR)</li>
                        <li className="text-[11px] font-bold text-gray-400 hover:text-black transition-colors cursor-pointer">Japan (JPY)</li>
                        <li className="text-[11px] font-bold text-gray-400 hover:text-black transition-colors cursor-pointer">United Kingdom (GBP)</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>

              {/* Section 3: Utility Icons */}
              <div className="flex items-center space-x-3 sm:space-x-6 pl-6 sm:pl-10">
                {/* Search */}
                <button 
                  onClick={() => setIsSearchOpen(true)}
                  className="p-1 text-gray-600 hover:text-black transition-colors outline-none"
                  aria-label="Search"
                >
                  <Search size={20} className="sm:w-[22px] sm:h-[22px]" strokeWidth={1.5} />
                </button>

                {/* Profile / Admin */}
                <div className="hidden sm:flex items-center group relative">
                  <button className="p-1 text-gray-600 hover:text-black transition-colors">
                    <User size={20} className="sm:w-[22px] sm:h-[22px]" strokeWidth={1.5} />
                  </button>
                  <div className="absolute top-full right-0 pt-4 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300">
                    <div className="bg-white border border-gray-100 shadow-2xl p-6 min-w-[200px] rounded-sm">
                      <p className="text-[10px] uppercase tracking-widest font-bold text-gray-400 mb-4 border-b pb-2">Account</p>
                      <ul className="space-y-3 text-right">
                        <li><Link to="/profile" className="text-xs font-medium hover:text-gray-500 transition-colors block">Sign In</Link></li>
                        <li><Link to="/orders" className="text-xs font-medium hover:text-gray-500 transition-colors block">My Orders</Link></li>
                        <li className="pt-2 border-t mt-2 flex justify-end">
                           <button 
                            onClick={() => {
                              toggleAdmin();
                              toast.success(`Admin mode ${!isAdmin ? 'enabled' : 'disabled'}`);
                            }}
                            className={cn(
                              "flex items-center space-x-2 text-[10px] uppercase tracking-widest font-bold",
                              isAdmin ? "text-blue-600" : "text-gray-400 hover:text-black"
                            )}
                          >
                            <ShieldCheck size={14} />
                            <span>{isAdmin ? 'Admin: Active' : 'Admin Portal'}</span>
                          </button>
                        </li>
                        {isAdmin && (
                          <li className="flex justify-end">
                            <Link to="/admin" className="text-xs font-bold text-black flex items-center gap-2 hover:translate-x-[-4px] transition-transform">
                              Go to Dashboard
                            </Link>
                          </li>
                        )}
                      </ul>
                    </div>
                  </div>
                </div>

                {/* Wishlist */}
                <button className="hidden sm:block p-1 text-gray-600 hover:text-black transition-colors">
                  <Heart size={20} className="sm:w-[22px] sm:h-[22px]" strokeWidth={1.5} />
                </button>

                {/* Shopping Bag */}
                <Link to="/cart" className="p-1 text-gray-600 hover:text-black transition-colors relative group">
                  <ShoppingBag size={20} className="sm:w-[22px] sm:h-[22px]" strokeWidth={1.5} />
                  {cartCount > 0 && (
                    <span className="absolute -top-1 -right-1 bg-black text-white text-[9px] w-4 h-4 rounded-full flex items-center justify-center font-bold">
                      {cartCount}
                    </span>
                  )}
                </Link>

                {/* Mobile Menu Toggle (Rightmost on mobile) */}
                <button 
                  onClick={() => setIsOpen(!isOpen)}
                  className="lg:hidden p-1 text-gray-600 hover:text-black transition-colors"
                  aria-label="Toggle Menu"
                >
                  {isOpen ? <X size={24} /> : <Menu size={24} />}
                </button>
              </div>
            </div>

          </div>
        </div>
      </motion.nav>

      {/* Search Overlay */}
      <AnimatePresence>
        {isSearchOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-white flex flex-col"
          >
            <div className="h-16 sm:h-20 lg:h-24 border-b border-gray-100 flex items-center justify-between px-4 sm:px-8 max-w-[1600px] mx-auto w-full">
              <div className="flex items-center flex-1">
                <Search size={20} className="text-gray-400 mr-4" />
                <input 
                  autoFocus
                  placeholder="SEARCH OUR COLLECTIONS..."
                  className="w-full text-sm sm:text-base font-medium placeholder:text-gray-300 outline-none uppercase tracking-[0.1em]"
                />
              </div>
              <button 
                onClick={() => setIsSearchOpen(false)}
                className="p-2 text-gray-600 hover:rotate-90 transition-transform duration-300"
              >
                <X size={24} />
              </button>
            </div>
            <div className="flex-1 overflow-y-auto p-8 sm:p-20">
              <div className="max-w-4xl mx-auto">
                <h3 className="text-[10px] font-bold uppercase tracking-[0.3em] text-gray-400 mb-8">Quick Links</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-20 gap-y-4">
                  {NAV_LINKS.map((link) => (
                    <Link 
                      key={link.name} 
                      to={link.path}
                      className="text-2xl sm:text-4xl font-serif hover:italic hover:translate-x-4 transition-all duration-300"
                    >
                      {link.name}
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Mobile Sidebar */}
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[70] lg:hidden"
            />
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed top-0 right-0 h-full w-[85%] max-w-sm bg-white z-[80] shadow-2xl lg:hidden flex flex-col"
            >
              <div className="p-6 border-b border-gray-100 flex items-center justify-between">
                <span className="text-sm font-serif italic tracking-tighter">LUMINA Menu</span>
                <button onClick={() => setIsOpen(false)} className="p-1"><X size={24} /></button>
              </div>
              <div className="flex-1 overflow-y-auto py-8 px-6">
                <nav className="space-y-6">
                  {NAV_LINKS.map((link) => (
                    <Link
                      key={link.name}
                      to={link.path}
                      className="block text-3xl font-serif tracking-tight hover:italic transition-all text-right"
                      onClick={() => setIsOpen(false)}
                    >
                      {link.name}
                    </Link>
                  ))}
                </nav>

                <div className="mt-12 pt-12 border-t border-gray-100 space-y-6">
                  <div className="flex flex-col space-y-4 items-end">
                    <button 
                      onClick={toggleAdmin}
                      className="flex items-center space-x-3 text-[10px] uppercase tracking-widest font-bold text-gray-500"
                    >
                      <ShieldCheck size={18} />
                      <span>{isAdmin ? 'Exit Admin Mode' : 'Admin Portal'}</span>
                    </button>
                    {isAdmin && (
                      <Link 
                        to="/admin" 
                        onClick={() => setIsOpen(false)}
                        className="text-xs font-bold underline"
                      >
                        Dashboard Overview
                      </Link>
                    )}
                  </div>
                </div>
              </div>
              <div className="p-8 bg-gray-50 flex items-center justify-between mt-auto">
                 <div className="flex items-center space-x-2">
                    <Globe size={18} className="text-gray-400" />
                    <span className="text-[10px] font-bold uppercase tracking-widest">US / EN</span>
                 </div>
                 <div className="flex items-center space-x-4">
                   <span className="text-xs font-medium uppercase tracking-widest">Profile</span>
                   <User size={18} className="text-gray-400" />
                 </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};