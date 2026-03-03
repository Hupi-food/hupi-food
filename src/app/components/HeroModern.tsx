import { motion, useScroll, useTransform } from 'motion/react';
import { ChevronDown, MapPin, ArrowRight } from 'lucide-react';
import heroImg from '../../assets/hero-fullscreen.png';

export function HeroModern() {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 500], [0, 150]);
  const opacity = useTransform(scrollY, [0, 300], [1, 0]);

  const scrollToContent = () => {
    const element = document.getElementById('por-que');
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative min-h-screen flex items-end justify-center overflow-hidden">
      {/* Full-screen background image */}
      <div className="absolute inset-0 z-0">
        <img
          src={heroImg}
          alt="Colombiana con bolsa de pan artesanal en Bogotá"
          className="w-full h-full object-cover"
        />
        {/* Gradient overlays */}
        <div
          className="absolute inset-0"
          style={{
            background:
              'linear-gradient(to bottom, rgba(0,77,64,0.45) 0%, rgba(0,77,64,0.2) 40%, rgba(0,77,64,0.7) 100%)',
          }}
        />
      </div>

      {/* Navbar spacer — prevents content from going behind fixed nav */}
      {/* Top: Badge & Floating Elements */}
      <motion.div
        className="absolute top-28 left-6 sm:left-12 z-20"
        initial={{ opacity: 0, x: -30 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, delay: 0.5 }}
      >
        <div
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full"
          style={{
            backgroundColor: 'rgba(255,255,255,0.15)',
            backdropFilter: 'blur(12px)',
            border: '1px solid rgba(255,255,255,0.25)',
          }}
        >
          <MapPin size={14} color="#FCBF49" />
          <span
            className="text-sm font-semibold"
            style={{
              fontFamily: "'Inter', sans-serif",
              color: '#FFF8F0',
            }}
          >
            Disponible en Bogotá 🇨🇴
          </span>
        </div>
      </motion.div>

      {/* Floating Price Card */}
      <motion.div
        className="absolute top-32 right-6 sm:right-12 z-20 px-5 py-4 rounded-2xl hidden sm:block"
        style={{
          backgroundColor: 'rgba(27, 27, 47, 0.85)',
          backdropFilter: 'blur(16px)',
          border: '1px solid rgba(45, 106, 79, 0.3)',
          boxShadow: '0 8px 32px rgba(0,0,0,0.3)',
        }}
        initial={{ opacity: 0, x: 30 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, delay: 0.7 }}
      >
        <motion.div
          animate={{ y: [0, -6, 0] }}
          transition={{ duration: 3, repeat: Infinity, delay: 1 }}
        >
          <div className="text-2xl mb-1" style={{ lineHeight: 1 }}>
            🍞
          </div>
          <div
            className="text-lg font-bold"
            style={{
              fontFamily: "'Outfit', sans-serif",
              color: '#F77F00',
            }}
          >
            Desde $14.900
          </div>
          <div
            className="text-xs"
            style={{
              fontFamily: "'Inter', sans-serif",
              color: '#FFF8F0',
              opacity: 0.6,
            }}
          >
            Valor original ~$30.000
          </div>
        </motion.div>
      </motion.div>

      {/* Main Content — Bottom */}
      <motion.div style={{ y, opacity }} className="relative z-10 w-full px-6 sm:px-12 pb-24 pt-64">
        <div className="max-w-7xl mx-auto">
          {/* Headline — TGTG Style uppercase bold */}
          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl mb-8 font-black tracking-tight"
            style={{
              fontFamily: "'Outfit', sans-serif",
              color: '#FFF8F0',
              lineHeight: '0.95',
              textTransform: 'uppercase',
              textShadow: '0 4px 30px rgba(0,0,0,0.3)',
            }}
          >
            Rescata buena
            <br />
            <span
              style={{
                background: 'linear-gradient(135deg, #FCBF49, #F77F00)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              comida
            </span>{' '}
            del
            <br />
            desperdicio
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="text-lg sm:text-xl mb-10 max-w-xl"
            style={{
              fontFamily: "'Inter', sans-serif",
              color: '#FFF8F0',
              opacity: 0.9,
              lineHeight: '1.6',
            }}
          >
            Cajas sorpresa con pan artesanal, postres y delicias de tu barrio.{' '}
            <strong style={{ color: '#FCBF49' }}>Comida fresca a mitad de precio</strong>, cero
            desperdicio.
          </motion.p>

          {/* CTA Buttons — WhatsApp + Web App */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.7 }}
            className="flex flex-col sm:flex-row gap-4"
          >
            <motion.a
              href="https://whatsapp.com/channel/hupi-food"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.05, y: -3 }}
              whileTap={{ scale: 0.95 }}
              className="group px-8 py-4 rounded-2xl flex items-center gap-3 font-bold text-lg no-underline"
              style={{
                fontFamily: "'Inter', sans-serif",
                background: 'linear-gradient(135deg, #25D366, #128C7E)',
                color: '#FFFFFF',
                boxShadow: '0 8px 32px rgba(37, 211, 102, 0.35)',
              }}
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
              </svg>
              <span>Únete en WhatsApp</span>
              <ArrowRight size={20} className="transition-transform group-hover:translate-x-1" />
            </motion.a>

            <motion.a
              href="https://app.hupifood.co"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.05, y: -3 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 rounded-2xl flex items-center gap-3 border-2 transition-all duration-300 font-semibold text-lg no-underline"
              style={{
                fontFamily: "'Inter', sans-serif",
                backgroundColor: 'rgba(255,255,255,0.1)',
                backdropFilter: 'blur(10px)',
                color: '#FFF8F0',
                borderColor: 'rgba(255, 248, 240, 0.4)',
              }}
            >
              <span>🌐</span>
              <span>Ir a la App Web</span>
              <ArrowRight size={20} />
            </motion.a>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.9 }}
            className="mt-12 flex gap-8 flex-wrap"
          >
            {[
              { value: '2,500+', label: 'Hupits vendidos' },
              { value: '50+', label: 'Panaderías' },
              { value: '500kg', label: 'Comida rescatada' },
            ].map((stat, index) => (
              <div key={index}>
                <div
                  className="text-3xl font-bold mb-1"
                  style={{
                    fontFamily: "'Outfit', sans-serif",
                    color: '#FCBF49',
                  }}
                >
                  {stat.value}
                </div>
                <div
                  className="text-xs font-medium uppercase tracking-wider"
                  style={{
                    fontFamily: "'Inter', sans-serif",
                    color: '#FFF8F0',
                    opacity: 0.6,
                  }}
                >
                  {stat.label}
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </motion.div>

      {/* Scroll Indicator */}
      <motion.div
        style={{ opacity }}
        className="absolute bottom-6 left-1/2 transform -translate-x-1/2 z-20 cursor-pointer"
        onClick={scrollToContent}
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="flex flex-col items-center gap-2"
        >
          <span
            className="text-xs tracking-widest uppercase font-medium"
            style={{
              fontFamily: "'Inter', sans-serif",
              color: '#FCBF49',
            }}
          >
            Descubre más
          </span>
          <ChevronDown size={24} color="#FCBF49" />
        </motion.div>
      </motion.div>
    </section>
  );
}
