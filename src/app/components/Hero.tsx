import { motion } from 'motion/react';
import { ChevronDown } from 'lucide-react';

export function Hero() {
  const scrollToContent = () => {
    const element = document.getElementById('experience');
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1744217256006-6fbf3195adc6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhcnRpc2FuJTIwc291cmRvdWdoJTIwYnJlYWQlMjBtYWNybyUyMHRleHR1cmV8ZW58MXx8fHwxNzcyMzI2ODQzfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
          alt="Artisan sourdough bread"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#1A1A1A]/70 via-[#1A1A1A]/50 to-[#1A1A1A]/80" />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-20 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
        >
          {/* Logo/Brand */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mb-8"
          >
            <h1
              className="text-6xl sm:text-7xl lg:text-8xl tracking-tight mb-4"
              style={{
                fontFamily: "'Playfair Display', serif",
                color: '#D4AF37',
              }}
            >
              HUPI
            </h1>
          </motion.div>

          {/* Headline */}
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-4xl sm:text-5xl lg:text-6xl mb-6"
            style={{
              fontFamily: "'Playfair Display', serif",
              color: '#F5F5F5',
              lineHeight: '1.2',
            }}
          >
            The Art of the Gourmet Rescue
          </motion.h2>

          {/* Sub-headline */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="text-lg sm:text-xl lg:text-2xl max-w-3xl mx-auto mb-12"
            style={{
              fontFamily: "'Inter', sans-serif",
              color: '#F5F5F5',
              lineHeight: '1.6',
              fontWeight: '300',
            }}
          >
            Experience El Hupit: exclusive access to Bogotá's finest artisan
            bakeries, curated for the conscious epicurean.
          </motion.p>

          {/* CTA Button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
          >
            <button
              className="group relative px-10 py-4 overflow-hidden transition-all duration-300"
              style={{
                fontFamily: "'Inter', sans-serif",
                backgroundColor: '#D4AF37',
                color: '#1A1A1A',
              }}
            >
              <span className="relative z-10 text-lg tracking-wide">
                Secure Your Hupit
              </span>
              <div
                className="absolute inset-0 bg-white/20 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"
              />
            </button>
          </motion.div>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.2 }}
          className="absolute bottom-12 left-1/2 transform -translate-x-1/2 cursor-pointer"
          onClick={scrollToContent}
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <ChevronDown size={40} color="#D4AF37" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
