import { motion } from 'motion/react';
import { useInView } from 'motion/react';
import { useRef } from 'react';

export function CTASection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section
      ref={ref}
      className="py-24 sm:py-32 px-6 sm:px-8 lg:px-12"
      style={{ backgroundColor: '#F5F5F5' }}
    >
      <div className="max-w-5xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <h2
            className="text-4xl sm:text-5xl lg:text-6xl mb-6"
            style={{
              fontFamily: "'Playfair Display', serif",
              color: '#1A1A1A',
              lineHeight: '1.2',
            }}
          >
            Join the Movement
          </h2>

          <p
            className="text-lg sm:text-xl mb-12 max-w-3xl mx-auto"
            style={{
              fontFamily: "'Inter', sans-serif",
              color: '#1A1A1A',
              opacity: 0.7,
              lineHeight: '1.6',
            }}
          >
            Become part of a community that celebrates artisan craftsmanship,
            sustainable luxury, and conscious indulgence. Your Hupit awaits.
          </p>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            <button
              className="group relative px-12 py-5 overflow-hidden transition-all duration-300 w-full sm:w-auto"
              style={{
                fontFamily: "'Inter', sans-serif",
                backgroundColor: '#D4AF37',
                color: '#1A1A1A',
              }}
            >
              <span className="relative z-10 text-lg tracking-wide">
                Secure Your Hupit
              </span>
              <div className="absolute inset-0 bg-white/20 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
            </button>

            <button
              className="group relative px-12 py-5 overflow-hidden transition-all duration-300 border-2 w-full sm:w-auto"
              style={{
                fontFamily: "'Inter', sans-serif",
                backgroundColor: 'transparent',
                color: '#1A1A1A',
                borderColor: '#1A1A1A',
              }}
            >
              <span className="relative z-10 text-lg tracking-wide">
                Learn More
              </span>
              <div
                className="absolute inset-0 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"
                style={{ backgroundColor: '#1A1A1A' }}
              />
              <span className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-lg tracking-wide"
                style={{ color: '#F5F5F5' }}>
                Learn More
              </span>
            </button>
          </motion.div>

          {/* Trust Indicators */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="mt-16 flex flex-wrap justify-center gap-8 sm:gap-12"
          >
            {[
              { value: '5,000+', label: 'Happy Members' },
              { value: '20+', label: 'Partner Bakeries' },
              { value: '100kg', label: 'Food Rescued Monthly' },
            ].map((item, index) => (
              <div key={index} className="text-center">
                <div
                  className="text-3xl sm:text-4xl mb-2"
                  style={{
                    fontFamily: "'Playfair Display', serif",
                    color: '#D4AF37',
                  }}
                >
                  {item.value}
                </div>
                <div
                  className="text-sm tracking-wide"
                  style={{
                    fontFamily: "'Inter', sans-serif",
                    color: '#1A1A1A',
                    opacity: 0.6,
                  }}
                >
                  {item.label}
                </div>
              </div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
