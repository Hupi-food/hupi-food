import { motion, useInView } from 'motion/react';
import { useRef } from 'react';
import { Search, ShoppingBag, MapPin } from 'lucide-react';
import imgApp from '../../assets/app-mockup.png';

export function HowItWorksSectionModern() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  const steps = [
    {
      icon: Search,
      number: '01',
      title: 'Descubre',
      description:
        'Visitá nuestra app web o nuestro canal de WhatsApp y mirá qué panaderías de tu barrio tienen Hupits disponibles hoy.',
      emoji: '🔍',
    },
    {
      icon: ShoppingBag,
      number: '02',
      title: 'Reserva tu Hupit',
      description:
        'Elegí el Hupit que más te guste y reservalo directamente. Pagá fácil y rápido en la web.',
      emoji: '🛒',
    },
    {
      icon: MapPin,
      number: '03',
      title: '¡Recoge y disfruta!',
      description:
        'Pasá por la panadería en el horario indicado, recogé tu caja sorpresa y… ¡a disfrutar, parcero!',
      emoji: '🎉',
    },
  ];

  return (
    <section
      ref={ref}
      id="como-funciona"
      className="py-24 sm:py-32 px-6 sm:px-8 lg:px-12 relative overflow-hidden"
      style={{ backgroundColor: '#FFF8F0' }}
    >
      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <div
            className="inline-flex items-center gap-2 px-4 py-2 mb-6 rounded-full"
            style={{
              backgroundColor: 'rgba(247, 127, 0, 0.1)',
              border: '1px solid rgba(247, 127, 0, 0.25)',
            }}
          >
            <span className="text-base">⚡</span>
            <span
              className="text-xs tracking-wider uppercase font-semibold"
              style={{
                fontFamily: "'Inter', sans-serif",
                color: '#F77F00',
              }}
            >
              Así de fácil
            </span>
          </div>

          <h2
            className="text-4xl sm:text-5xl lg:text-6xl mb-6 max-w-3xl mx-auto font-bold"
            style={{
              fontFamily: "'Outfit', sans-serif",
              color: '#1B1B2F',
              lineHeight: '1.1',
            }}
          >
            Tres pasos para tu
            <br />
            <span
              style={{
                background: 'linear-gradient(135deg, #F77F00, #FCBF49)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              primer Hupit
            </span>
          </h2>

          <p
            className="text-lg max-w-2xl mx-auto"
            style={{
              fontFamily: "'Inter', sans-serif",
              color: '#1B1B2F',
              opacity: 0.6,
            }}
          >
            En menos de 5 minutos tenés tu caja sorpresa reservada.
            ¡Más fácil que pedir un domicilio!
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left: Steps */}
          <div className="space-y-6">
            {steps.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -30 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.2 + index * 0.2 }}
              >
                <motion.div
                  whileHover={{ x: 10, scale: 1.02 }}
                  transition={{ duration: 0.3 }}
                  className="flex gap-5 p-6 rounded-2xl cursor-pointer group"
                  style={{
                    backgroundColor: '#FFFFFF',
                    border: '1px solid rgba(45, 106, 79, 0.1)',
                    boxShadow: '0 4px 20px rgba(0,0,0,0.04)',
                  }}
                >
                  {/* Number */}
                  <div
                    className="flex-shrink-0 w-14 h-14 rounded-2xl flex items-center justify-center"
                    style={{
                      background: index === 0
                        ? 'linear-gradient(135deg, #2D6A4F, #40916C)'
                        : index === 1
                          ? 'linear-gradient(135deg, #F77F00, #FCBF49)'
                          : 'linear-gradient(135deg, #1B1B2F, #2D2D44)',
                    }}
                  >
                    <span
                      className="text-lg font-bold"
                      style={{
                        fontFamily: "'Outfit', sans-serif",
                        color: '#FFF8F0',
                      }}
                    >
                      {step.number}
                    </span>
                  </div>

                  {/* Content */}
                  <div className="flex-1">
                    <h3
                      className="text-xl font-bold mb-2 flex items-center gap-2"
                      style={{
                        fontFamily: "'Outfit', sans-serif",
                        color: '#1B1B2F',
                      }}
                    >
                      {step.title}
                      <span className="text-lg">{step.emoji}</span>
                    </h3>

                    <p
                      className="text-sm leading-relaxed"
                      style={{
                        fontFamily: "'Inter', sans-serif",
                        color: '#1B1B2F',
                        opacity: 0.6,
                      }}
                    >
                      {step.description}
                    </p>
                  </div>
                </motion.div>
              </motion.div>
            ))}

            {/* CTA */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.8 }}
              className="pt-4"
            >
              <motion.a
                href="https://whatsapp.com/channel/hupi-food"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 rounded-2xl relative overflow-hidden group font-bold inline-flex items-center gap-3 no-underline"
                style={{
                  background: 'linear-gradient(135deg, #25D366, #128C7E)',
                  color: '#FFFFFF',
                  fontFamily: "'Inter', sans-serif",
                  boxShadow: '0 8px 32px rgba(37, 211, 102, 0.3)',
                }}
              >
                <span className="relative z-10">
                  Únete al Canal WhatsApp 📲
                </span>
                <motion.div
                  className="absolute inset-0 bg-white/10 rounded-2xl"
                  initial={{ x: '-100%' }}
                  whileHover={{ x: 0 }}
                  transition={{ duration: 0.3 }}
                />
              </motion.a>
            </motion.div>
          </div>

          {/* Right: App Mockup */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, x: 50 }}
            animate={isInView ? { opacity: 1, scale: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="relative"
          >
            <motion.div
              animate={{ y: [0, -12, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
            >
              {/* Glow */}
              <motion.div
                className="absolute inset-0 blur-3xl rounded-3xl"
                style={{
                  background: 'radial-gradient(circle, rgba(45, 106, 79, 0.2) 0%, transparent 70%)',
                }}
              />

              <img
                src={imgApp}
                alt="App Hupi-food mostrando panaderías en Bogotá"
                className="relative z-10 w-full max-w-md mx-auto rounded-3xl shadow-2xl"
              />
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
