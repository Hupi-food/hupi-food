import { motion } from 'motion/react';
import { ChevronDown, Sparkles, Zap } from 'lucide-react';

export function HeroInnovative() {
  const scrollToContent = () => {
    const element = document.getElementById('mystery-boxes');
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-32">
      {/* Animated gradient background */}
      <div className="absolute inset-0 -z-10">
        <div
          className="absolute top-0 left-1/4 w-96 h-96 rounded-full blur-3xl opacity-40 animate-pulse"
          style={{ backgroundColor: '#FF6B35' }}
        />
        <div
          className="absolute top-1/3 right-1/4 w-80 h-80 rounded-full blur-3xl opacity-30 animate-pulse"
          style={{ backgroundColor: '#004D40', animationDelay: '1s' }}
        />
        <div
          className="absolute bottom-0 left-1/2 w-96 h-96 rounded-full blur-3xl opacity-25"
          style={{ backgroundColor: '#FFD60A' }}
        />
      </div>

      {/* Dark overlay for readability */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-black/60 -z-10" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-12 text-center">
        {/* Top Badge */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-8 inline-flex items-center gap-2 px-4 py-2 rounded-full border"
          style={{
            backgroundColor: 'rgba(255, 107, 53, 0.15)',
            borderColor: 'rgba(255, 107, 53, 0.4)',
            backdropFilter: 'blur(10px)',
          }}
        >
          <Sparkles size={16} color="#FF6B35" />
          <span
            className="text-sm font-semibold"
            style={{
              fontFamily: "'Inter', sans-serif",
              color: '#FF6B35',
            }}
          >
            Gamificación de excedentes alimentarios
          </span>
        </motion.div>

        {/* Main Headline */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mb-6"
        >
          <h1
            className="text-6xl sm:text-7xl lg:text-8xl font-black tracking-tight mb-4"
            style={{
              fontFamily: "'Outfit', sans-serif",
              color: '#FFFFFF',
              lineHeight: '1.1',
              textShadow: '0 8px 32px rgba(0, 0, 0, 0.4)',
            }}
          >
            Desbloquea Cajas
            <br />
            <span
              style={{
                background: 'linear-gradient(135deg, #FF6B35, #FFD60A)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              Misteriosas
            </span>
          </h1>
        </motion.div>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-lg sm:text-xl max-w-2xl mx-auto mb-12"
          style={{
            fontFamily: "'Inter', sans-serif",
            color: '#F5F5F5',
            lineHeight: '1.6',
          }}
        >
          Compra cajas sorpresa de diferentes tiers (Bronze, Silver, Gold) con pan artesanal, postres y delicias frescas a mitad de precio. <strong style={{ color: '#FFD60A' }}>Salva comida. Gana increíbles ofertas.</strong>
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="flex flex-col sm:flex-row gap-4 justify-center mb-16"
        >
          <motion.a
            href="https://whatsapp.com/channel/0029VbCQrFV1SWt3xy6MQE1A"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.05, y: -3 }}
            whileTap={{ scale: 0.95 }}
            className="group px-10 py-4 rounded-2xl font-bold text-lg flex items-center justify-center gap-3 no-underline relative overflow-hidden"
            style={{
              fontFamily: "'Inter', sans-serif",
              background: 'linear-gradient(135deg, #FF6B35, #FF8C5A)',
              color: '#FFFFFF',
              boxShadow: '0 12px 40px rgba(255, 107, 53, 0.35)',
            }}
          >
            <Zap size={24} className="transition-transform group-hover:rotate-12" />
            <span>Comienza Ahora</span>
            <div
              className="absolute inset-0 bg-white/20 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300"
            />
          </motion.a>

          <motion.a
            href="/login"
            whileHover={{ scale: 1.05, y: -3 }}
            whileTap={{ scale: 0.95 }}
            className="px-10 py-4 rounded-2xl border-2 font-semibold text-lg flex items-center justify-center gap-3 transition-all duration-300 no-underline backdrop-blur-sm"
            style={{
              fontFamily: "'Inter', sans-serif",
              backgroundColor: 'rgba(255, 255, 255, 0.08)',
              color: '#FFFFFF',
              borderColor: 'rgba(255, 255, 255, 0.3)',
            }}
          >
            <span>→ Ir a la App Web</span>
          </motion.a>
        </motion.div>

        {/* Feature Pills */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="flex flex-wrap gap-3 justify-center mb-12"
        >
          {[
            '🎁 Cajas Sorpresa',
            '🏆 3 Tiers Premium',
            '💰 Hasta 50% Descuento',
            '🌱 Cero Desperdicio',
          ].map((pill, index) => (
            <motion.div
              key={index}
              whileHover={{ scale: 1.05 }}
              className="px-4 py-2 rounded-full text-sm font-medium backdrop-blur-sm"
              style={{
                backgroundColor: 'rgba(255, 255, 255, 0.12)',
                color: '#FFFFFF',
                border: '1px solid rgba(255, 255, 255, 0.2)',
              }}
            >
              {pill}
            </motion.div>
          ))}
        </motion.div>

        {/* Stats Row */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1 }}
          className="grid grid-cols-3 gap-6 max-w-2xl mx-auto mb-16"
        >
          {[
            { number: '2.5K+', label: 'Cajas Vendidas' },
            { number: '50+', label: 'Aliados' },
            { number: '500kg+', label: 'Comida Rescatada' },
          ].map((stat, index) => (
            <motion.div
              key={index}
              whileHover={{ y: -5 }}
              className="p-4 rounded-2xl backdrop-blur-sm"
              style={{
                backgroundColor: 'rgba(255, 255, 255, 0.08)',
                border: '1px solid rgba(255, 255, 255, 0.15)',
              }}
            >
              <div
                className="text-2xl sm:text-3xl font-black mb-2"
                style={{
                  color: '#FFD60A',
                  fontFamily: "'Outfit', sans-serif",
                }}
              >
                {stat.number}
              </div>
              <div
                className="text-xs sm:text-sm font-medium"
                style={{
                  color: '#E0E0E0',
                  fontFamily: "'Inter', sans-serif",
                }}
              >
                {stat.label}
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.2 }}
          className="cursor-pointer flex justify-center"
          onClick={scrollToContent}
        >
          <motion.div
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="flex flex-col items-center gap-2"
          >
            <span
              className="text-xs tracking-widest uppercase font-semibold"
              style={{
                color: '#FFD60A',
                fontFamily: "'Inter', sans-serif",
              }}
            >
              Descubre Más
            </span>
            <ChevronDown size={28} color="#FFD60A" strokeWidth={2.5} />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
