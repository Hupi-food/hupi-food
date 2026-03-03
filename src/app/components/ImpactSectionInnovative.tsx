import { motion } from 'motion/react';
import { Leaf, Heart, Zap } from 'lucide-react';

export function ImpactSectionInnovative() {
  const impacts = [
    {
      icon: Heart,
      title: 'Comida Rescatada',
      value: '500+kg',
      description: 'Pan artesanal y delicias frescas salvadas del desperdicio',
      color: '#FF6B35',
      gradient: 'from-orange-500/20 to-red-500/20',
    },
    {
      icon: Leaf,
      title: 'Impacto Ambiental',
      value: '80%',
      description: 'Reducción de desperdicio en panaderías aliadas',
      color: '#00D4AA',
      gradient: 'from-teal-500/20 to-green-500/20',
    },
    {
      icon: Zap,
      title: 'Comunidad Activa',
      value: '2.5K+',
      description: 'Compradores conscientes haciendo la diferencia',
      color: '#FFD60A',
      gradient: 'from-yellow-500/20 to-orange-500/20',
    },
  ];

  return (
    <section
      id="impact"
      className="py-24 px-6 sm:px-8 lg:px-12 relative overflow-hidden"
      style={{ backgroundColor: '#0A0E27' }}
    >
      {/* Decorative elements */}
      <div className="absolute bottom-0 right-0 w-96 h-96 rounded-full blur-3xl opacity-20 pointer-events-none" style={{ backgroundColor: '#00D4AA' }} />

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
            Nuestro
            <br />
            <span style={{
              background: 'linear-gradient(135deg, #00D4AA, #FFD60A)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}>
              Impacto
            </span>
          </h2>
          <p
            className="text-lg max-w-2xl mx-auto mt-6"
            style={{
              fontFamily: "'Inter', sans-serif",
              color: '#E0E0E0',
            }}
          >
            Cada caja comprada es un voto por un mundo más sostenible. Aquí está el impacto que juntos estamos logrando.
          </p>
        </motion.div>

        {/* Impact Cards Grid */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {impacts.map((impact, index) => {
            const IconComponent = impact.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ y: -10 }}
                className="group relative rounded-3xl overflow-hidden p-8 sm:p-10 transition-all duration-300"
                style={{
                  backgroundColor: 'rgba(255, 255, 255, 0.08)',
                  border: `2px solid ${impact.color}40`,
                  backdropFilter: 'blur(10px)',
                }}
              >
                {/* Background gradient */}
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${impact.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none`}
                />

                {/* Content */}
                <div className="relative z-10">
                  {/* Icon */}
                  <motion.div
                    animate={{ y: [0, -10, 0] }}
                    transition={{ duration: 3, repeat: Infinity }}
                    className="mb-6 inline-flex p-4 rounded-full relative"
                    style={{
                      backgroundColor: impact.color + '20',
                      border: `2px solid ${impact.color}`,
                    }}
                  >
                    <IconComponent size={40} color={impact.color} strokeWidth={1.5} />
                  </motion.div>

                  {/* Value */}
                  <div className="mb-4">
                    <div
                      className="text-5xl sm:text-6xl font-black"
                      style={{
                        fontFamily: "'Outfit', sans-serif",
                        color: impact.color,
                      }}
                    >
                      {impact.value}
                    </div>
                  </div>

                  {/* Title */}
                  <h3
                    className="text-2xl font-black mb-3"
                    style={{
                      fontFamily: "'Outfit', sans-serif",
                      color: '#FFFFFF',
                    }}
                  >
                    {impact.title}
                  </h3>

                  {/* Description */}
                  <p
                    className="text-base"
                    style={{
                      fontFamily: "'Inter', sans-serif",
                      color: '#C0C0C0',
                      lineHeight: '1.6',
                    }}
                  >
                    {impact.description}
                  </p>
                </div>

                {/* Border glow effect */}
                <div
                  className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  style={{
                    background: `radial-gradient(circle at top right, ${impact.color}40, transparent)`,
                    pointerEvents: 'none',
                  }}
                />
              </motion.div>
            );
          })}
        </div>

        {/* Why Choose Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-gradient-to-r from-blue-900/20 to-teal-900/20 border border-teal-500/30 rounded-3xl p-12 text-center relative overflow-hidden"
        >
          {/* Background decoration */}
          <div className="absolute -top-20 -right-20 w-40 h-40 rounded-full blur-2xl opacity-20" style={{ backgroundColor: '#00D4AA' }} />

          <div className="relative z-10">
            <h3
              className="text-3xl sm:text-4xl font-black mb-6"
              style={{
                fontFamily: "'Outfit', sans-serif",
                color: '#FFFFFF',
              }}
            >
              ¿Por Qué Elegir Hupi?
            </h3>
            <div
              className="grid md:grid-cols-3 gap-6 text-left"
            >
              {[
                { emoji: '🎯', title: 'Experiencia Gamificada', desc: 'Cada compra es una aventura culinaria con misterio' },
                { emoji: '♻️', title: 'Sostenibilidad Real', desc: 'Verdadero impacto ambiental en tu comunidad' },
                { emoji: '💰', title: 'Mejor Precio', desc: 'Hasta 50% de descuento en comida de calidad' },
              ].map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 }}
                >
                  <div className="text-4xl mb-3">{item.emoji}</div>
                  <h4
                    className="font-black mb-2"
                    style={{
                      fontFamily: "'Outfit', sans-serif",
                      color: '#FFFFFF',
                    }}
                  >
                    {item.title}
                  </h4>
                  <p
                    style={{
                      fontFamily: "'Inter', sans-serif",
                      color: '#C0C0C0',
                    }}
                  >
                    {item.desc}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
