import { motion } from 'motion/react';
import { useInView } from 'motion/react';
import { useRef } from 'react';
import { Leaf, Award, Heart } from 'lucide-react';

export function SustainabilitySection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section
      ref={ref}
      id="sustainability"
      className="py-24 sm:py-32 px-6 sm:px-8 lg:px-12 relative overflow-hidden"
      style={{ backgroundColor: '#1A1A1A' }}
    >
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 opacity-20">
        <img
          src="https://images.unsplash.com/photo-1766002156650-6e18ef2acbef?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdXN0YWluYWJsZSUyMGZvb2QlMjBtaW5pbWFsaXN0JTIwYWVzdGhldGljfGVufDF8fHx8MTc3MjMyNjg0NXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
          alt="Sustainable food"
          className="w-full h-full object-cover"
        />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <p
            className="text-sm tracking-[0.2em] mb-4"
            style={{
              fontFamily: "'Inter', sans-serif",
              color: '#D4AF37',
            }}
          >
            SUSTAINABILITY AS A LUXURY
          </p>
          <h2
            className="text-4xl sm:text-5xl lg:text-6xl mb-6 max-w-4xl mx-auto"
            style={{
              fontFamily: "'Playfair Display', serif",
              color: '#F5F5F5',
              lineHeight: '1.2',
            }}
          >
            The New Prestige: Conscious Indulgence
          </h2>
          <p
            className="text-lg sm:text-xl max-w-3xl mx-auto"
            style={{
              fontFamily: "'Inter', sans-serif",
              color: '#F5F5F5',
              opacity: 0.8,
              lineHeight: '1.6',
            }}
          >
            True luxury today isn't about excess—it's about impact. Every Hupit
            prevents food waste while celebrating artisan craftsmanship.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8 lg:gap-12">
          {[
            {
              icon: Leaf,
              title: 'Environmental Impact',
              desc: 'Each Hupit prevents premium baked goods from becoming waste, reducing our environmental footprint one gourmet item at a time.',
              stat: '100kg',
              statLabel: 'Food rescued monthly',
            },
            {
              icon: Award,
              title: 'Artisan Support',
              desc: 'Support local craftspeople while enjoying their masterpieces. Your choice empowers small-batch, sustainable bakeries.',
              stat: '20+',
              statLabel: 'Partner bakeries',
            },
            {
              icon: Heart,
              title: 'Sustainable Indulgence',
              desc: 'Indulge guilt-free in the finest gourmet items. Luxury and responsibility are no longer mutually exclusive.',
              stat: '5,000+',
              statLabel: 'Conscious epicureans',
            },
          ].map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 + index * 0.2 }}
              className="text-center group"
            >
              <div className="mb-6 inline-block p-6 rounded-full transition-transform duration-300 group-hover:scale-110"
                style={{ backgroundColor: 'rgba(212, 175, 55, 0.1)' }}>
                <item.icon size={40} color="#D4AF37" strokeWidth={1.5} />
              </div>

              <h3
                className="text-2xl mb-4"
                style={{
                  fontFamily: "'Playfair Display', serif",
                  color: '#F5F5F5',
                }}
              >
                {item.title}
              </h3>

              <p
                className="text-base mb-6 leading-relaxed"
                style={{
                  fontFamily: "'Inter', sans-serif",
                  color: '#F5F5F5',
                  opacity: 0.7,
                }}
              >
                {item.desc}
              </p>

              <div className="pt-4 border-t" style={{ borderColor: 'rgba(212, 175, 55, 0.2)' }}>
                <div
                  className="text-3xl mb-1"
                  style={{
                    fontFamily: "'Playfair Display', serif",
                    color: '#D4AF37',
                  }}
                >
                  {item.stat}
                </div>
                <div
                  className="text-sm tracking-wide"
                  style={{
                    fontFamily: "'Inter', sans-serif",
                    color: '#F5F5F5',
                    opacity: 0.6,
                  }}
                >
                  {item.statLabel}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}