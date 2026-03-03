import { motion } from 'motion/react';
import { MapPin, Smartphone, Gift, CheckCircle } from 'lucide-react';

export function HowItWorksInnovative() {
  const steps = [
    {
      number: '01',
      icon: MapPin,
      title: 'Explora Tiendas',
      description: 'Descubre las panaderías y restaurantes aliados cerca de ti en el mapa.',
      color: '#FF6B35',
    },
    {
      number: '02',
      icon: Gift,
      title: 'Elige tu Caja',
      description: 'Selecciona entre Bronze, Silver o Gold basado en tus preferencias.',
      color: '#FFD60A',
    },
    {
      number: '03',
      icon: Smartphone,
      title: 'Compra & Paga',
      description: 'Realiza tu compra y paga manualmente a través de Nequi, Daviplata o Ualá.',
      color: '#00D4AA',
    },
    {
      number: '04',
      icon: CheckCircle,
      title: 'Recibe tu Sorpresa',
      description: 'Espera aprobación del admin y recibe tu código QR para canjear tu caja.',
      color: '#7C3AED',
    },
  ];

  return (
    <section
      id="how-it-works"
      className="py-24 px-6 sm:px-8 lg:px-12 relative overflow-hidden"
      style={{ backgroundColor: '#0F1A2E' }}
    >
      {/* Decorative background */}
      <div className="absolute top-1/2 left-0 w-96 h-96 rounded-full blur-3xl opacity-15 pointer-events-none" style={{ backgroundColor: '#FF6B35' }} />

      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <h2
            className="text-5xl sm:text-6xl lg:text-7xl font-black mb-6"
            style={{
              fontFamily: "'Outfit', sans-serif",
              color: '#FFFFFF',
              lineHeight: '1.1',
            }}
          >
            Cómo Funciona
            <br />
            <span style={{
              background: 'linear-gradient(135deg, #FF6B35, #FFD60A)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}>
              la Magia
            </span>
          </h2>
        </motion.div>

        {/* Steps Timeline */}
        <div className="relative">
          {/* Vertical Line - Hidden on Mobile */}
          <div
            className="hidden md:block absolute left-1/2 top-0 bottom-0 w-1 transform -translate-x-1/2"
            style={{ backgroundColor: 'rgba(255, 107, 53, 0.2)' }}
          />

          {/* Steps */}
          <div className="space-y-12 md:space-y-0">
            {steps.map((step, index) => {
              const IconComponent = step.icon;
              const isEven = index % 2 === 0;

              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className={`md:flex md:items-center md:gap-8 ${isEven ? 'md:flex-row' : 'md:flex-row-reverse'
                    }`}
                >
                  {/* Content */}
                  <div className={`md:w-1/2 ${isEven ? 'md:text-right' : 'md:text-left'}`}>
                    <motion.div
                      whileHover={{ y: -5 }}
                      className="p-8 rounded-2xl relative overflow-hidden"
                      style={{
                        backgroundColor: 'rgba(255, 255, 255, 0.05)',
                        border: `2px solid ${step.color}40`,
                        backdropFilter: 'blur(10px)',
                      }}
                    >
                      {/* Number Badge */}
                      <div
                        className="text-6xl font-black mb-4 opacity-20"
                        style={{
                          fontFamily: "'Outfit', sans-serif",
                          color: step.color,
                        }}
                      >
                        {step.number}
                      </div>

                      <h3
                        className="text-2xl sm:text-3xl font-black mb-3"
                        style={{
                          fontFamily: "'Outfit', sans-serif",
                          color: step.color,
                        }}
                      >
                        {step.title}
                      </h3>

                      <p
                        className="text-base"
                        style={{
                          fontFamily: "'Inter', sans-serif",
                          color: '#E0E0E0',
                          lineHeight: '1.6',
                        }}
                      >
                        {step.description}
                      </p>

                      {/* Glow Effect */}
                      <div
                        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"
                        style={{
                          background: `radial-gradient(circle at center, ${step.color}15, transparent)`,
                        }}
                      />
                    </motion.div>
                  </div>

                  {/* Timeline Dot */}
                  <div className="relative md:w-auto flex justify-center my-8 md:my-0 z-10">
                    <motion.div
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{ duration: 2, repeat: Infinity, delay: index * 0.2 }}
                      className="w-16 h-16 rounded-full flex items-center justify-center flex-shrink-0 relative"
                      style={{
                        backgroundColor: step.color,
                        boxShadow: `0 0 20px ${step.color}60`,
                      }}
                    >
                      <IconComponent size={32} color="#FFFFFF" strokeWidth={2} />
                    </motion.div>
                  </div>

                  {/* Empty Space */}
                  <div className="hidden md:block md:w-1/2" />
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-20 text-center"
        >
          <p
            className="text-lg mb-8"
            style={{
              fontFamily: "'Inter', sans-serif",
              color: '#E0E0E0',
            }}
          >
            ¿Listo para tu primera caja misteriosa?
          </p>
          <motion.a
            href="/login"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-block px-10 py-4 rounded-2xl font-bold text-lg relative overflow-hidden group no-underline"
            style={{
              fontFamily: "'Inter', sans-serif",
              background: 'linear-gradient(135deg, #FF6B35, #FF8C5A)',
              color: '#FFFFFF',
              boxShadow: '0 12px 40px rgba(255, 107, 53, 0.35)',
            }}
          >
            <span className="relative z-10">Ir a la App Web</span>
            <div
              className="absolute inset-0 bg-white/20 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300"
            />
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
}
