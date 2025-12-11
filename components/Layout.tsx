import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Facebook, Twitter, Instagram, Youtube, Settings, Moon, Sun, Check, LogIn, LogOut } from 'lucide-react';
import { useTheme } from './ThemeContext';
import { useAuth } from './AuthContext';
import { CATEGORIES } from '../constants';
import { motion, AnimatePresence } from 'framer-motion';

export const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isCustomizerOpen, setIsCustomizerOpen] = useState(false);
  const { settings, updateSettings } = useTheme();
  const { isAdmin, logout } = useAuth();
  const location = useLocation();

  const navLinks = [
    { name: 'Home', path: '/' },
    ...CATEGORIES.map(c => ({ name: c, path: `/category/${c.replace(/\s+/g, '-').toLowerCase()}` })),
    { name: 'Contact', path: '/contact' },
  ];

  const ThemeToggle = () => (
    <button
      onClick={() => updateSettings({ darkMode: !settings.darkMode })}
      className={`relative w-14 h-7 rounded-full transition-colors duration-300 focus:outline-none flex items-center ${settings.darkMode ? 'bg-gray-700 border border-gray-600' : 'bg-gray-200 border border-gray-300'}`}
      aria-label="Toggle Theme"
    >
      <span
        className={`absolute bg-white w-5 h-5 rounded-full shadow-md transform transition-transform duration-300 flex items-center justify-center ${settings.darkMode ? 'translate-x-8' : 'translate-x-1'}`}
      >
        {settings.darkMode ? <Moon size={12} className="text-primary" /> : <Sun size={12} className="text-yellow-500" />}
      </span>
    </button>
  );

  const colors = [
    { name: 'Red', value: '#ef4444' },
    { name: 'Orange', value: '#f97316' },
    { name: 'Amber', value: '#f59e0b' },
    { name: 'Yellow', value: '#eab308' },
    { name: 'Lime', value: '#84cc16' },
    { name: 'Green', value: '#22c55e' },
    { name: 'Emerald', value: '#10b981' },
    { name: 'Teal', value: '#14b8a6' },
    { name: 'Cyan', value: '#06b6d4' },
    { name: 'Sky', value: '#0ea5e9' },
    { name: 'Blue', value: '#3b82f6' },
    { name: 'Indigo', value: '#6366f1' },
    { name: 'Violet', value: '#8b5cf6' },
    { name: 'Purple', value: '#a855f7' },
    { name: 'Fuchsia', value: '#d946ef' },
    { name: 'Pink', value: '#ec4899' },
    { name: 'Rose', value: '#f43f5e' },
    { name: 'Slate', value: '#64748b' },
    { name: 'Gray', value: '#6b7280' },
    { name: 'Black', value: '#000000' },
  ];

  const headingFonts = [
    'Poppins', 'Playfair Display', 'Inter', 'Montserrat', 'Oswald', 'Merriweather', 'Raleway'
  ];

  const bodyFonts = [
    'Inter', 'Poppins', 'Roboto', 'Lato', 'Open Sans', 'Merriweather'
  ];

  return (
    <div className="min-h-screen flex flex-col transition-colors duration-300 bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white/90 dark:bg-gray-900/90 backdrop-blur-md shadow-sm border-b border-gray-200 dark:border-gray-800 transition-colors duration-300">
        <div className="container mx-auto px-4 py-3 flex justify-between items-center">
          {/* Logo */}
          <Link to="/" className="text-2xl font-black font-heading tracking-tighter flex items-center gap-2">
             <span className="text-primary text-3xl">T</span>ruth <span className="text-primary text-3xl">X</span> Talk
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden xl:flex items-center space-x-6 font-semibold text-sm uppercase tracking-wide">
            {navLinks.map((link) => (
              <Link 
                key={link.name} 
                to={link.path}
                className={`hover:text-primary transition-colors ${location.pathname === link.path ? 'text-primary' : 'text-gray-600 dark:text-gray-300'}`}
              >
                {link.name}
              </Link>
            ))}
          </nav>

          {/* Right Actions */}
          <div className="flex items-center space-x-4">
             <div className="hidden md:block">
               <ThemeToggle />
             </div>
             
             {isAdmin ? (
               <div className="flex items-center gap-2">
                 <Link to="/editor" className="hidden md:block px-4 py-2 bg-primary text-white text-xs font-bold uppercase rounded-full hover:opacity-90 transition shadow-lg shadow-primary/30">
                  Editor
                 </Link>
                 <button onClick={logout} className="p-2 text-gray-600 dark:text-gray-300 hover:text-red-500" title="Logout">
                   <LogOut size={20} />
                 </button>
               </div>
             ) : (
                <div className="hidden md:block w-4"></div> /* Spacer */
             )}

            <button onClick={() => setIsCustomizerOpen(true)} className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-colors">
              <Settings size={20} className="text-gray-600 dark:text-gray-300" />
            </button>
            <button 
              className="xl:hidden p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X size={24} className="dark:text-white" /> : <Menu size={24} className="dark:text-white" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div 
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="xl:hidden bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800 overflow-hidden"
            >
              <nav className="flex flex-col p-4 space-y-4 font-semibold text-center">
                {navLinks.map((link) => (
                  <Link 
                    key={link.name} 
                    to={link.path}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="block py-2 hover:text-primary dark:text-gray-200"
                  >
                    {link.name}
                  </Link>
                ))}
                 <div className="flex justify-center py-2">
                    <ThemeToggle />
                 </div>
                 {isAdmin ? (
                   <>
                    <Link to="/editor" onClick={() => setIsMobileMenuOpen(false)} className="block py-2 text-primary font-bold">
                      Editor Panel
                    </Link>
                    <button onClick={() => { logout(); setIsMobileMenuOpen(false); }} className="block py-2 text-red-500 w-full text-center">Logout</button>
                   </>
                 ) : null}
              </nav>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* Main Content */}
      <main className="flex-grow">
        {children}
      </main>

      {/* Footer */}
      <footer className="bg-secondary text-gray-300 py-12 mt-12 font-heading">
        <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <h3 className="text-2xl font-bold text-white"><span className="text-primary">T</span>ruth X Talk</h3>
            <p className="text-sm leading-relaxed text-gray-400">
              Your daily source for truth, breaking news, and global entertainment updates. Unbiased, unfiltered, and always first.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="hover:text-primary transition"><Facebook size={20}/></a>
              <a href="#" className="hover:text-primary transition"><Twitter size={20}/></a>
              <a href="#" className="hover:text-primary transition"><Instagram size={20}/></a>
              <a href="#" className="hover:text-primary transition"><Youtube size={20}/></a>
            </div>
          </div>

          <div>
            <h4 className="text-white font-bold mb-4 uppercase text-sm tracking-wider">Categories</h4>
            <ul className="space-y-2 text-sm">
              {CATEGORIES.slice(0, 5).map(c => (
                 <li key={c}><Link to={`/category/${c.replace(/\s+/g, '-').toLowerCase()}`} className="hover:text-primary transition">{c}</Link></li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold mb-4 uppercase text-sm tracking-wider">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li><Link to="/about" className="hover:text-primary transition">About Us</Link></li>
              <li><Link to="/contact" className="hover:text-primary transition">Contact</Link></li>
              <li><Link to="/privacy" className="hover:text-primary transition">Privacy Policy</Link></li>
              <li><Link to="/terms" className="hover:text-primary transition">Terms & Conditions</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold mb-4 uppercase text-sm tracking-wider">Newsletter</h4>
            <p className="text-sm text-gray-400 mb-4">Subscribe to get the latest updates right in your inbox.</p>
            <form className="flex flex-col space-y-2">
              <input type="email" placeholder="Your email address" className="bg-gray-800 border border-gray-700 p-2 rounded text-sm focus:outline-none focus:border-primary text-white" />
              <button className="bg-primary text-white py-2 rounded text-sm font-bold uppercase hover:bg-red-600 transition">Subscribe</button>
            </form>
          </div>
        </div>
        <div className="container mx-auto px-4 mt-8 pt-8 border-t border-gray-800 text-center text-xs text-gray-500">
          &copy; {new Date().getFullYear()} Truth X Talk. All rights reserved.
        </div>
      </footer>

      {/* Theme Customizer Drawer */}
      <AnimatePresence>
        {isCustomizerOpen && (
          <>
            <motion.div 
              initial={{ opacity: 0 }} 
              animate={{ opacity: 0.5 }} 
              exit={{ opacity: 0 }}
              onClick={() => setIsCustomizerOpen(false)}
              className="fixed inset-0 bg-black z-[60]" 
            />
            <motion.div 
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              className="fixed top-0 right-0 h-full w-80 bg-white dark:bg-gray-800 z-[70] shadow-2xl p-6 overflow-y-auto"
            >
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold dark:text-white">Customize</h2>
                <button onClick={() => setIsCustomizerOpen(false)}><X className="dark:text-white" /></button>
              </div>

              <div className="space-y-8">
                <div>
                  <h3 className="text-sm font-semibold mb-3 dark:text-gray-300">Color Palette</h3>
                  <div className="grid grid-cols-5 gap-3">
                    {colors.map(color => (
                      <button 
                        key={color.value}
                        onClick={() => updateSettings({ primaryColor: color.value })}
                        className={`w-10 h-10 rounded-full flex items-center justify-center transition-all ${settings.primaryColor === color.value ? 'ring-2 ring-offset-2 ring-gray-900 dark:ring-white scale-110' : 'hover:scale-105'}`}
                        style={{ backgroundColor: color.value }}
                        title={color.name}
                      >
                         {settings.primaryColor === color.value && <Check size={16} className="text-white drop-shadow-md" />}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="text-sm font-semibold mb-3 dark:text-gray-300">Typography</h3>
                  <div className="space-y-4">
                    <div>
                      <label className="text-xs font-bold text-gray-500 uppercase mb-2 block">Headings</label>
                      <select 
                        value={settings.headingFont}
                        onChange={(e) => updateSettings({ headingFont: e.target.value })}
                        className="w-full p-3 border rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white text-sm focus:ring-2 focus:ring-primary outline-none"
                      >
                        {headingFonts.map(font => (
                           <option key={font} value={font}>{font}</option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="text-xs font-bold text-gray-500 uppercase mb-2 block">Body Text</label>
                      <select 
                        value={settings.bodyFont}
                        onChange={(e) => updateSettings({ bodyFont: e.target.value })}
                        className="w-full p-3 border rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white text-sm focus:ring-2 focus:ring-primary outline-none"
                      >
                         {bodyFonts.map(font => (
                           <option key={font} value={font}>{font}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>

                <div className="pt-6 border-t dark:border-gray-700">
                    <button 
                      onClick={() => updateSettings({ primaryColor: '#ef4444', headingFont: 'Poppins', bodyFont: 'Inter' })}
                      className="w-full py-2 text-sm text-gray-500 hover:text-black dark:text-gray-400 dark:hover:text-white underline"
                    >
                      Reset to Defaults
                    </button>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};