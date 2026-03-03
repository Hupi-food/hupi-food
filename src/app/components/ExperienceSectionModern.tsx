import { motion, useInView } from 'motion/react';
import { useRef } from 'react';
import imgBakery from '../../assets/colombian-bakery.png';

export function ExperienceSectionModern() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  const features = [
    {
      emoji: '🥖',
      title: 'Pan Artesanal',
      description: 'Pan de masa madre, baguettes, ciabattas y panes de la tradición colombiana',
    },
    {
      emoji: '🧁',
      title: 'Postres & Dulces',
      description: 'Tortas, brownies, galletas y las mejores creaciones dulces del día',
    },
    {
      emoji: '🫓',
      title: 'Típicos Colombianos',
      description: 'Pandebono, buñuelos, almojábanas y delicias de nuestra tierra',
    },
    {
      emoji: '☕',
      title: 'Acompañamientos',
      description: 'Café de origen, jugos naturales y bebidas artesanales del día',
    },
  ];

  return (
    <section
      ref={ref}
      id="experiencia"
      className="py-24 sm:py-32 px-6 sm:px-8 lg:px-12 relative overflow-hidden"
      style={{ backgroundColor: '#FFF8F0' }}
    >
      {/* Decorative Elements */}
      <motion.div
        className="absolute top-20 right-0 w-80 h-80 rounded-full blur-3xl opacity-15"
        style={{ backgroundColor: '#F77F00' }}
        animate={{ scale: [1, 1.3, 1], x: [0, 40, 0] }}
        transition={{ duration: 10, repeat: Infinity }}
      />
      <motion.div
        className="absolute bottom-10 left-0 w-60 h-60 rounded-full blur-3xl opacity-10"
        style={{ backgroundColor: '#2D6A4F' }}
        animate={{ scale: [1, 1.2, 1] }}
        transition={{ duration: 8, repeat: Infinity }}
      />

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="mb-8"
            >
              <div
                className="inline-flex items-center gap-2 px-4 py-2 mb-6 rounded-full"
                style={{
                  backgroundColor: 'rgba(45, 106, 79, 0.1)',
                  border: '1px solid rgba(45, 106, 79, 0.25)',
                }}
              >
                <span className="text-base">📦</span>
                <span
                  className="text-xs tracking-wider uppercase font-semibold"
                  style={{
                    fontFamily: "'Inter', sans-serif",
                    color: '#2D6A4F',
                  }}
                >
                  ¿Qué hay en tu Hupit?
                </span>
              </div>

              <h2
                className="text-4xl sm:text-5xl lg:text-6xl mb-6 font-bold"
                style={{
                  fontFamily: "'Outfit', sans-serif",
                  color: '#1B1B2F',
                  lineHeight: '1.1',
                }}
              >
                Cada Hupit es una
                <br />
                <span
                  style={{
                    background: 'linear-gradient(135deg, #F77F00, #FCBF49)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                  }}
                >
                  sorpresa deliciosa
                </span>
              </h2>

              <p
                className="text-lg leading-relaxed mb-4"
                style={{
                  fontFamily: "'Inter', sans-serif",
                  color: '#1B1B2F',
                  opacity: 0.7,
                }}
              >
                Imaginate abrir una caja y encontrar pan recién horneado, postres
                increíbles y esas delicias típicas que tanto nos gustan. Todo fresquito,
                todo del día, y a un precio que no vas a creer.
              </p>

              <p
                className="text-lg leading-relaxed font-medium"
                style={{
                  fontFamily: "'Inter', sans-serif",
                  color: '#2D6A4F',
                }}
              >
                "¡Pedí un Hupit de la panadería de la esquina!"
              </p>
            </motion.div>

            {/* Features Grid */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="grid grid-cols-2 gap-4"
            >
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.4, delay: 0.5 + index * 0.1 }}
                  whileHover={{ y: -5, scale: 1.02 }}
                  className="relative p-5 group cursor-pointer rounded-2xl"
                  style={{
                    backgroundColor: '#FFFFFF',
                    border: '1px solid rgba(45, 106, 79, 0.1)',
                    boxShadow: '0 4px 20px rgba(0,0,0,0.04)',
                  }}
                >
                  <div className="text-3xl mb-3">{feature.emoji}</div>

                  <h4
                    className="text-base font-bold mb-1"
                    style={{
                      fontFamily: "'Outfit', sans-serif",
                      color: '#1B1B2F',
                    }}
                  >
                    {feature.title}
                  </h4>

                  <p
                    className="text-sm leading-relaxed"
                    style={{
                      fontFamily: "'Inter', sans-serif",
                      color: '#1B1B2F',
                      opacity: 0.6,
                    }}
                  >
                    {feature.description}
                  </p>

                  {/* Hover accent */}
                  <motion.div
                    className="absolute bottom-0 left-0 right-0 h-1 rounded-b-2xl"
                    style={{ backgroundColor: '#F77F00' }}
                    initial={{ scaleX: 0 }}
                    whileHover={{ scaleX: 1 }}
                    transition={{ duration: 0.3 }}
                  />
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

          {/* Right Content — Image */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >
            <motion.div
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.3 }}
              className="relative overflow-hidden rounded-3xl"
            >
              <img
                src={imgBakery}
                alt="Panadería artesanal colombiana"
                className="w-full h-auto object-cover"
              />

              {/* Overlay */}
              <div
                className="absolute inset-0 rounded-3xl"
                style={{
                  background: 'linear-gradient(to top, rgba(27, 27, 47, 0.5) 0%, transparent 40%)',
                }}
              />

              {/* Floating Card */}
              <motion.div
                className="absolute bottom-6 left-6 right-6 p-5 rounded-2xl"
                style={{
                  backgroundColor: 'rgba(255, 248, 240, 0.95)',
                  backdropFilter: 'blur(10px)',
                  boxShadow: '0 8px 32px rgba(0,0,0,0.15)',
                }}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.8 }}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <div
                      className="text-sm mb-1 font-medium"
                      style={{
                        fontFamily: "'Inter', sans-serif",
                        color: '#2D6A4F',
                      }}
                    >
                      🟢 Disponible ahora
                    </div>
                    <div
                      className="text-xl font-bold"
                      style={{
                        fontFamily: "'Outfit', sans-serif",
                        color: '#F77F00',
                      }}
                    >
                      12 Hupits cerca de ti
                    </div>
                  </div>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-5 py-2.5 rounded-xl font-semibold text-sm"
                    style={{
                      background: 'linear-gradient(135deg, #2D6A4F, #40916C)',
                      color: '#FFF8F0',
                      fontFamily: "'Inter', sans-serif",
                    }}
                  >
                    Ver Mapa
                  </motion.button>
                </div>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
