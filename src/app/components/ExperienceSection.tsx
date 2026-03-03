import { motion } from 'motion/react';
import { useInView } from 'motion/react';
import { useRef } from 'react';

export function ExperienceSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section
      id="experience"
      ref={ref}
      className="py-24 sm:py-32 px-6 sm:px-8 lg:px-12"
      style={{ backgroundColor: '#F5F5F5' }}
    >
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Image */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="order-2 lg:order-1"
          >
            <div className="relative overflow-hidden" style={{ borderRadius: '4px' }}>
              <img
                src="https://images.unsplash.com/photo-1758221617134-a042dfa5ee29?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxnb3VybWV0JTIwY3JvaXNzYW50JTIwcGVyZmVjdCUyMHRleHR1cmV8ZW58MXx8fHwxNzcyMzI2ODQ0fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                alt="Gourmet croissant"
                className="w-full h-[500px] object-cover transform hover:scale-105 transition-transform duration-700"
              />
            </div>
          </motion.div>

          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="order-1 lg:order-2"
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <p
                className="text-sm tracking-[0.2em] mb-4"
                style={{
                  fontFamily: "'Inter', sans-serif",
                  color: '#D4AF37',
                }}
              >
                THE HUPIT EXPERIENCE
              </p>
              <h2
                className="text-4xl sm:text-5xl lg:text-6xl mb-6"
                style={{
                  fontFamily: "'Playfair Display', serif",
                  color: '#1A1A1A',
                  lineHeight: '1.2',
                }}
              >
                Gourmet Treasures Await
              </h2>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="space-y-6"
            >
              <p
                className="text-lg leading-relaxed"
                style={{
                  fontFamily: "'Inter', sans-serif",
                  color: '#1A1A1A',
                  opacity: 0.8,
                }}
              >
                El Hupit is not about discounts—it's about discovery. Each box is
                a carefully curated collection of rescued treasures from Bogotá's
                most prestigious artisan bakeries.
              </p>
              <p
                className="text-lg leading-relaxed"
                style={{
                  fontFamily: "'Inter', sans-serif",
                  color: '#1A1A1A',
                  opacity: 0.8,
                }}
              >
                Experience the thrill of exclusivity with our daily curation of
                gourmet surplus. Every Hupit is a surprise, every item is a
                masterpiece, and every purchase is a statement of conscious luxury.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-8">
                {[
                  {
                    title: 'Curated Daily',
                    desc: 'Hand-selected items from premium bakeries',
                  },
                  {
                    title: 'Surprise Element',
                    desc: 'Discover new artisan favorites',
                  },
                  {
                    title: 'Premium Quality',
                    desc: 'Same-day fresh gourmet items',
                  },
                  {
                    title: 'Exclusive Access',
                    desc: 'Reserved for conscious epicureans',
                  },
                ].map((item, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 10 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.4, delay: 0.6 + index * 0.1 }}
                  >
                    <div className="border-l-2 pl-4" style={{ borderColor: '#D4AF37' }}>
                      <h4
                        className="mb-1"
                        style={{
                          fontFamily: "'Inter', sans-serif",
                          color: '#1A1A1A',
                        }}
                      >
                        {item.title}
                      </h4>
                      <p
                        className="text-sm"
                        style={{
                          fontFamily: "'Inter', sans-serif",
                          color: '#1A1A1A',
                          opacity: 0.6,
                        }}
                      >
                        {item.desc}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
