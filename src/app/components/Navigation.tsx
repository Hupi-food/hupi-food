import { motion } from 'motion/react';
import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';

export function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Experience', href: '#experience' },
    { label: 'Sustainability', href: '#sustainability' },
    { label: 'Partners', href: '#partners' },
    { label: 'How It Works', href: '#how-it-works' },
  ];

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'py-4' : 'py-6'
      }`}
      style={{
        backgroundColor: isScrolled
          ? 'rgba(26, 26, 26, 0.95)'
          : 'rgba(26, 26, 26, 0.3)',
        backdropFilter: 'blur(10px)',
      }}
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <motion.a
            href="#"
            whileHover={{ scale: 1.05 }}
            className="text-2xl tracking-wide"
            style={{
              fontFamily: "'Playfair Display', serif",
              color: '#D4AF37',
            }}
          >
            HUPI
          </motion.a>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="text-sm tracking-wide transition-colors duration-300 hover:opacity-100"
                style={{
                  fontFamily: "'Inter', sans-serif",
                  color: '#F5F5F5',
                  opacity: 0.8,
                }}
              >
                {link.label}
              </a>
            ))}
            <button
              className="px-6 py-2 transition-all duration-300 hover:shadow-lg"
              style={{
                fontFamily: "'Inter', sans-serif",
                backgroundColor: '#D4AF37',
                color: '#1A1A1A',
              }}
            >
              Reserve Now
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? (
              <X size={24} color="#D4AF37" />
            ) : (
              <Menu size={24} color="#D4AF37" />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden mt-6 pb-4"
          >
            <div className="flex flex-col gap-4">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="text-sm tracking-wide transition-colors duration-300"
                  style={{
                    fontFamily: "'Inter', sans-serif",
                    color: '#F5F5F5',
                    opacity: 0.8,
                  }}
                >
                  {link.label}
                </a>
              ))}
              <button
                className="px-6 py-2 transition-all duration-300 w-full"
                style={{
                  fontFamily: "'Inter', sans-serif",
                  backgroundColor: '#D4AF37',
                  color: '#1A1A1A',
                }}
              >
                Reserve Now
              </button>
            </div>
          </motion.div>
        )}
      </div>
    </motion.nav>
  );
}
