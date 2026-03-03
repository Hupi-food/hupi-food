import { motion, useInView } from 'motion/react';
import { useRef } from 'react';

export function PartnersSectionModern() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  const partners = [
    { name: 'BROT', tagline: 'Masa madre artesanal', emoji: '🥖' },
    { name: 'MASA', tagline: 'Tradición colombiana', emoji: '🫓' },
    { name: 'ÉRIC KAYSER', tagline: 'Excelencia francesa', emoji: '🥐' },
    { name: 'LEVAIN', tagline: 'Panadería patrimonial', emoji: '🍞' },
    { name: 'GRANERO', tagline: 'Orgánicos y naturales', emoji: '🌾' },
    { name: 'LA PANADERÍA', tagline: 'Del barrio para el mundo', emoji: '🏠' },
    { name: "PAN PA' YA", tagline: 'Clásicos colombianos', emoji: '🇨🇴' },
    { name: 'ALMA BAKERY', tagline: 'Creaciones premium', emoji: '✨' },
  ];

  return (
    <section
      ref={ref}
      id="aliados"
      className="py-24 sm:py-32 px-6 sm:px-8 lg:px-12 relative overflow-hidden"
      style={{ backgroundColor: '#1B1B2F' }}
    >
      {/* Background Glow */}
      <motion.div
        className="absolute top-1/2 left-1/2 w-[700px] h-[700px] rounded-full blur-3xl"
        style={{
          background: 'radial-gradient(circle, rgba(45, 106, 79, 0.12) 0%, transparent 70%)',
        }}
        animate={{
          scale: [1, 1.2, 1],
          x: ['-50%', '-45%', '-50%'],
          y: ['-50%', '-55%', '-50%'],
        }}
        transition={{ duration: 10, repeat: Infinity }}
      />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <div
            className="inline-flex items-center gap-2 px-4 py-2 mb-6 rounded-full"
            style={{
              backgroundColor: 'rgba(247, 127, 0, 0.12)',
              border: '1px solid rgba(247, 127, 0, 0.25)',
            }}
          >
            <span className="text-base">🤝</span>
            <span
              className="text-xs tracking-wider uppercase font-semibold"
              style={{
                fontFamily: "'Inter', sans-serif",
                color: '#FCBF49',
              }}
            >
              Nuestros Aliados
            </span>
          </div>

          <h2
            className="text-4xl sm:text-5xl lg:text-6xl mb-6 font-bold"
            style={{
              fontFamily: "'Outfit', sans-serif",
              color: '#FFF8F0',
              lineHeight: '1.1',
            }}
          >
            Las panaderías de
            <br />
            <span
              style={{
                background: 'linear-gradient(135deg, #F77F00, #FCBF49)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              tu barrio te esperan
            </span>
          </h2>

          <p
            className="text-lg sm:text-xl max-w-3xl mx-auto"
            style={{
              fontFamily: "'Inter', sans-serif",
              color: '#FFF8F0',
              opacity: 0.6,
              lineHeight: '1.6',
            }}
          >
            Trabajamos con las mejores panaderías artesanales de Bogotá
            para que siempre tengas un Hupit esperándote.
          </p>
        </motion.div>

        {/* Partners Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16">
          {partners.map((partner, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.5, delay: index * 0.08 }}
            >
              <motion.div
                whileHover={{ y: -8, scale: 1.05 }}
                transition={{ duration: 0.3 }}
                className="relative aspect-square p-5 flex flex-col items-center justify-center text-center group cursor-pointer rounded-2xl"
                style={{
                  backgroundColor: 'rgba(255, 248, 240, 0.04)',
                  border: '1px solid rgba(45, 106, 79, 0.15)',
                  backdropFilter: 'blur(10px)',
                }}
              >
                {/* Emoji */}
                <div className="text-4xl mb-3">{partner.emoji}</div>

                {/* Partner Name */}
                <h3
                  className="text-lg sm:text-xl mb-1 font-bold tracking-wide"
                  style={{
                    fontFamily: "'Outfit', sans-serif",
                    color: '#FFF8F0',
                  }}
                >
                  {partner.name}
                </h3>

                {/* Tagline */}
                <p
                  className="text-xs"
                  style={{
                    fontFamily: "'Inter', sans-serif",
                    color: '#FCBF49',
                    opacity: 0.8,
                  }}
                >
                  {partner.tagline}
                </p>

                {/* Hover Border */}
                <motion.div
                  className="absolute inset-0 border-2 pointer-events-none rounded-2xl"
                  style={{ borderColor: '#F77F00' }}
                  initial={{ opacity: 0 }}
                  whileHover={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                />
              </motion.div>
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="text-center"
        >
          <p
            className="text-lg mb-6"
            style={{
              fontFamily: "'Inter', sans-serif",
              color: '#FFF8F0',
              opacity: 0.6,
            }}
          >
            ¿Tenés una panadería o restaurante? 🏪
          </p>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-8 py-4 rounded-2xl border-2 font-bold"
            style={{
              fontFamily: "'Inter', sans-serif",
              backgroundColor: 'transparent',
              color: '#F77F00',
              borderColor: '#F77F00',
            }}
          >
            Registra tu negocio →
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
}
