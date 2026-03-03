import { motion, useInView } from 'motion/react';
import { useRef } from 'react';
import { ArrowRight } from 'lucide-react';
import imgCommunity from '../../assets/community.png';
import { HupiIcon } from './ui/HupiIcon';

export function CTASectionModern() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section
      ref={ref}
      className="py-24 sm:py-32 px-6 sm:px-8 lg:px-12 relative overflow-hidden"
      style={{ backgroundColor: '#FFF8F0' }}
    >
      <div className="max-w-6xl mx-auto relative z-10">
        {/* Community Image Banner */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="relative rounded-3xl overflow-hidden mb-16"
        >
          <img
            src={imgCommunity}
            alt="Comunidad colombiana disfrutando un Hupit en Bogotá"
            className="w-full h-72 sm:h-96 object-cover"
          />
          <div
            className="absolute inset-0"
            style={{
              background: 'linear-gradient(to top, rgba(27, 27, 47, 0.7) 0%, transparent 60%)',
            }}
          />
          <motion.div
            className="absolute bottom-8 left-8 right-8"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <p
              className="text-3xl sm:text-4xl font-bold"
              style={{
                fontFamily: "'Outfit', sans-serif",
                color: '#FFF8F0',
              }}
            >
              Más de <span style={{ color: '#FCBF49' }}>2,500 hupiers</span> ya son parte 🎉
            </p>
          </motion.div>
        </motion.div>

        {/* CTA Card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <motion.div
            whileHover={{ scale: 1.01 }}
            transition={{ duration: 0.3 }}
            className="relative p-10 sm:p-16 rounded-3xl text-center overflow-hidden"
            style={{
              background: 'linear-gradient(160deg, #1B1B2F 0%, #2D6A4F 60%, #1B1B2F 100%)',
            }}
          >
            {/* Decorative blobs */}
            <motion.div
              className="absolute w-80 h-80 rounded-full blur-3xl opacity-20"
              style={{ backgroundColor: '#F77F00', top: '-20%', right: '-10%' }}
              animate={{ scale: [1, 1.3, 1] }}
              transition={{ duration: 8, repeat: Infinity }}
            />

            {/* HupiIcon decorativo — watermark flotante */}
            <motion.div
              className="absolute pointer-events-none select-none"
              style={{ bottom: '-8%', right: '-4%' }}
              animate={{ rotate: [0, 6, -6, 0], scale: [1, 1.04, 1] }}
              transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
            >
              <HupiIcon size={220} opacity={0.07} />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <h2
                className="text-4xl sm:text-5xl lg:text-6xl mb-6 font-bold"
                style={{
                  fontFamily: "'Outfit', sans-serif",
                  color: '#FFF8F0',
                  lineHeight: '1.1',
                }}
              >
                ¡Pide tu primer
                <br />
                <span
                  style={{
                    background: 'linear-gradient(135deg, #F77F00, #FCBF49)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                  }}
                >
                  Hupit hoy!
                </span>
              </h2>

              <p
                className="text-lg sm:text-xl mb-10 max-w-2xl mx-auto"
                style={{
                  fontFamily: "'Inter', sans-serif",
                  color: '#FFF8F0',
                  opacity: 0.7,
                  lineHeight: '1.6',
                }}
              >
                Únete a nuestro canal de WhatsApp o visita la app web para encontrar
                las panaderías de tu barrio y empezá a rescatar comida deliciosa. ¡Es gratis!
              </p>

              {/* WhatsApp + Web App Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-10">
                <motion.a
                  href="https://whatsapp.com/channel/hupi-food"
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.05, y: -3 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-8 py-4 rounded-2xl flex items-center gap-3 font-bold text-lg no-underline"
                  style={{
                    background: 'linear-gradient(135deg, #25D366, #128C7E)',
                    color: '#FFFFFF',
                    fontFamily: "'Inter', sans-serif",
                    boxShadow: '0 8px 32px rgba(37, 211, 102, 0.35)',
                  }}
                >
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                  </svg>
                  <span>Únete en WhatsApp</span>
                </motion.a>

                <motion.a
                  href="https://app.hupifood.co"
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.05, y: -3 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-8 py-4 rounded-2xl flex items-center gap-3 font-bold text-lg no-underline"
                  style={{
                    background: 'linear-gradient(135deg, #F77F00, #FCBF49)',
                    color: '#1B1B2F',
                    fontFamily: "'Inter', sans-serif",
                    boxShadow: '0 8px 32px rgba(247, 127, 0, 0.3)',
                  }}
                >
                  <span>🌐</span>
                  <span>Ir a la App Web</span>
                </motion.a>
              </div>

              {/* Explore Button */}
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="group px-10 py-4 rounded-2xl relative overflow-hidden inline-flex items-center gap-3 border-2 font-semibold"
                style={{
                  fontFamily: "'Inter', sans-serif",
                  borderColor: 'rgba(252, 191, 73, 0.4)',
                  color: '#FFF8F0',
                  backgroundColor: 'transparent',
                }}
              >
                <span>Explorar Hupits Disponibles</span>
                <motion.div
                  animate={{ x: [0, 5, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                >
                  <ArrowRight size={20} />
                </motion.div>
              </motion.button>
            </motion.div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="mt-12 flex flex-wrap justify-center gap-10"
            >
              {[
                { value: '2,500+', label: 'Hupiers activos' },
                { value: '50+', label: 'Panaderías aliadas' },
                { value: '500kg', label: 'Comida rescatada/mes' },
                { value: '4.8★', label: 'Calificación' },
              ].map((stat, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={isInView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ duration: 0.4, delay: 0.7 + index * 0.1 }}
                  className="text-center"
                >
                  <div
                    className="text-3xl sm:text-4xl mb-1 font-bold"
                    style={{
                      fontFamily: "'Outfit', sans-serif",
                      color: '#F77F00',
                    }}
                  >
                    {stat.value}
                  </div>
                  <div
                    className="text-sm"
                    style={{
                      fontFamily: "'Inter', sans-serif",
                      color: '#FFF8F0',
                      opacity: 0.5,
                    }}
                  >
                    {stat.label}
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </motion.div>

        {/* Bottom notice */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.9 }}
          className="mt-6 text-sm text-center"
          style={{
            fontFamily: "'Inter', sans-serif",
            color: '#1B1B2F',
            opacity: 0.4,
          }}
        >
          Disponible vía WhatsApp y Web • Gratis • Bogotá, Colombia 🇨🇴
        </motion.p>
      </div>
    </section>
  );
}
