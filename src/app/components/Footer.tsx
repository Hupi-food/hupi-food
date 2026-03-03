import { motion } from 'motion/react';
import { Instagram, Twitter, Facebook } from 'lucide-react';

export function Footer() {
  return (
    <footer
      className="py-12 px-6 sm:px-8 lg:px-12 border-t"
      style={{
        backgroundColor: '#1A1A1A',
        borderColor: 'rgba(212, 175, 55, 0.2)',
      }}
    >
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-4 gap-12 mb-12">
          {/* Brand */}
          <div className="md:col-span-2">
            <h3
              className="text-3xl mb-4"
              style={{
                fontFamily: "'Playfair Display', serif",
                color: '#D4AF37',
              }}
            >
              HUPI
            </h3>
            <p
              className="text-sm leading-relaxed max-w-md"
              style={{
                fontFamily: "'Inter', sans-serif",
                color: '#F5F5F5',
                opacity: 0.6,
              }}
            >
              The art of the gourmet rescue. Experience exclusive access to
              Bogotá's finest artisan bakeries, curated for the conscious
              epicurean.
            </p>

            {/* Social Icons */}
            <div className="flex gap-4 mt-6">
              {[Instagram, Twitter, Facebook].map((Icon, index) => (
                <motion.a
                  key={index}
                  href="#"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-10 h-10 rounded-full flex items-center justify-center transition-colors duration-300"
                  style={{
                    backgroundColor: 'rgba(212, 175, 55, 0.1)',
                    border: '1px solid rgba(212, 175, 55, 0.3)',
                  }}
                >
                  <Icon size={18} color="#D4AF37" />
                </motion.a>
              ))}
            </div>
          </div>

          {/* Links */}
          <div>
            <h4
              className="mb-4 tracking-wide"
              style={{
                fontFamily: "'Inter', sans-serif",
                color: '#D4AF37',
              }}
            >
              EXPLORE
            </h4>
            <ul className="space-y-2">
              {['About Us', 'Our Partners', 'How It Works', 'Sustainability'].map(
                (link) => (
                  <li key={link}>
                    <a
                      href="#"
                      className="text-sm transition-colors duration-300 hover:opacity-100"
                      style={{
                        fontFamily: "'Inter', sans-serif",
                        color: '#F5F5F5',
                        opacity: 0.6,
                      }}
                    >
                      {link}
                    </a>
                  </li>
                )
              )}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4
              className="mb-4 tracking-wide"
              style={{
                fontFamily: "'Inter', sans-serif",
                color: '#D4AF37',
              }}
            >
              CONNECT
            </h4>
            <ul className="space-y-2">
              {['Contact', 'FAQ', 'Support', 'Careers'].map((link) => (
                <li key={link}>
                  <a
                    href="#"
                    className="text-sm transition-colors duration-300 hover:opacity-100"
                    style={{
                      fontFamily: "'Inter', sans-serif",
                      color: '#F5F5F5',
                      opacity: 0.6,
                    }}
                  >
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div
          className="pt-8 border-t flex flex-col sm:flex-row justify-between items-center gap-4"
          style={{ borderColor: 'rgba(212, 175, 55, 0.2)' }}
        >
          <p
            className="text-sm"
            style={{
              fontFamily: "'Inter', sans-serif",
              color: '#F5F5F5',
              opacity: 0.5,
            }}
          >
            © 2026 HUPI. All rights reserved.
          </p>
          <div className="flex gap-6">
            {['Privacy Policy', 'Terms of Service'].map((link) => (
              <a
                key={link}
                href="#"
                className="text-sm transition-colors duration-300 hover:opacity-100"
                style={{
                  fontFamily: "'Inter', sans-serif",
                  color: '#F5F5F5',
                  opacity: 0.5,
                }}
              >
                {link}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
