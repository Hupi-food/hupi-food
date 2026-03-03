import { motion } from 'motion/react';
import { useInView } from 'motion/react';
import { useRef } from 'react';

export function PartnersSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  const partners = [
    { name: 'BROT', tagline: 'Artisan Sourdough Masters' },
    { name: 'MASA', tagline: 'Traditional Colombian Craft' },
    { name: 'ERIC KAYSER', tagline: 'French Excellence' },
    { name: 'LEVAIN', tagline: 'Heritage Baking' },
    { name: 'GRANERO', tagline: 'Organic Pioneers' },
    { name: 'LA PANADERÍA', tagline: 'Gourmet Tradition' },
  ];

  return (
    <section
      ref={ref}
      id="partners"
      className="py-24 sm:py-32 px-6 sm:px-8 lg:px-12"
      style={{ backgroundColor: '#F5F5F5' }}
    >
      <div className="max-w-7xl mx-auto">
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
            OUR PARTNERS
          </p>
          <h2
            className="text-4xl sm:text-5xl lg:text-6xl mb-6"
            style={{
              fontFamily: "'Playfair Display', serif",
              color: '#1A1A1A',
              lineHeight: '1.2',
            }}
          >
            Gallery of Excellence
          </h2>
          <p
            className="text-lg sm:text-xl max-w-3xl mx-auto"
            style={{
              fontFamily: "'Inter', sans-serif",
              color: '#1A1A1A',
              opacity: 0.7,
              lineHeight: '1.6',
            }}
          >
            Collaborating with Bogotá's most prestigious artisan bakeries to bring
            you daily curated treasures.
          </p>
        </motion.div>

        {/* Partner Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-8 lg:gap-12">
          {partners.map((partner, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group relative"
            >
              <div
                className="aspect-square flex flex-col items-center justify-center p-8 transition-all duration-300 hover:shadow-xl"
                style={{
                  backgroundColor: '#FFFFFF',
                  border: '1px solid rgba(26, 26, 26, 0.1)',
                }}
              >
                {/* Partner Name */}
                <h3
                  className="text-2xl sm:text-3xl mb-3 tracking-wide transition-colors duration-300"
                  style={{
                    fontFamily: "'Playfair Display', serif",
                    color: '#1A1A1A',
                  }}
                >
                  {partner.name}
                </h3>

                {/* Tagline */}
                <p
                  className="text-xs sm:text-sm tracking-wider text-center"
                  style={{
                    fontFamily: "'Inter', sans-serif",
                    color: '#D4AF37',
                  }}
                >
                  {partner.tagline}
                </p>

                {/* Hover Border Effect */}
                <div
                  className="absolute inset-0 border-2 border-transparent group-hover:border-[#D4AF37] transition-all duration-300 pointer-events-none"
                />
              </div>
            </motion.div>
          ))}
        </div>

        {/* Image Showcase */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mt-20"
        >
          <div className="grid md:grid-cols-2 gap-6">
            <div className="relative overflow-hidden" style={{ borderRadius: '4px' }}>
              <img
                src="https://images.unsplash.com/photo-1769643207188-f9b6b7e1d72c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBiYWtlcnklMjBwYXN0cmllcyUyMGVsZWdhbnR8ZW58MXx8fHwxNzcyMzI2ODQ0fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                alt="Luxury bakery"
                className="w-full h-[400px] object-cover transform hover:scale-105 transition-transform duration-700"
              />
            </div>
            <div className="relative overflow-hidden" style={{ borderRadius: '4px' }}>
              <img
                src="https://images.unsplash.com/photo-1764486601113-a6856cdce5fd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxnb3VybWV0JTIwYmFrZXJ5JTIwZGlzcGxheSUyMGVsZWdhbnR8ZW58MXx8fHwxNzcyMzI2ODQ1fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                alt="Gourmet bakery display"
                className="w-full h-[400px] object-cover transform hover:scale-105 transition-transform duration-700"
              />
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}