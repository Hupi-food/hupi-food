import { motion } from 'motion/react';
import { Crown, Gift, Zap } from 'lucide-react';

export function MysteryBoxesSection() {
  const boxes = [
    {
      tier: 'BRONZE',
      icon: Gift,
      color: '#CD7F32',
      accentColor: '#FFB84D',
      price: '$14,900',
      originalPrice: '~$30,000',
      discount: '50%',
      items: ['Pan artesanal', 'Pasteles', 'Delicias locales'],
      description: 'Comida sorpresa básica',
      badge: 'Principiante',
    },
    {
      tier: 'SILVER',
      icon: Crown,
      color: '#C0C0C0',
      accentColor: '#E8E8E8',
      price: '$24,900',
      originalPrice: '~$50,000',
      discount: '50%',
      items: ['Pan premium', 'Pasteles especiales', 'Sorpresas gourmet'],
      description: 'Experiencia curada',
      badge: 'Popular',
      featured: true,
    },
    {
      tier: 'GOLD',
      icon: Crown,
      color: '#FFD700',
      accentColor: '#FFED4E',
      price: '$39,900',
      originalPrice: '~$80,000',
      discount: '50%',
      items: ['Selección premium', 'Especialidades', 'Exclusivas'],
      description: 'Lujo garantizado',
      badge: 'Élite',
    },
  ];

  return (
    <section
      id="mystery-boxes"
      className="py-24 px-6 sm:px-8 lg:px-12 relative overflow-hidden"
      style={{ backgroundColor: '#0A0E27' }}
    >
      {/* Decorative elements */}
      <div className="absolute top-20 right-10 w-72 h-72 rounded-full blur-3xl opacity-20 pointer-events-none" style={{ backgroundColor: '#FF6B35' }} />
      <div className="absolute bottom-20 left-10 w-72 h-72 rounded-full blur-3xl opacity-15 pointer-events-none" style={{ backgroundColor: '#004D40' }} />

      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <div
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full border mb-6"
            style={{
              backgroundColor: 'rgba(255, 107, 53, 0.15)',
              borderColor: 'rgba(255, 107, 53, 0.4)',
            }}
          >
            <Zap size={16} color="#FF6B35" />
            <span
              className="text-sm font-semibold"
              style={{ color: '#FF6B35', fontFamily: "'Inter', sans-serif" }}
            >
              Elige tu Nivel
            </span>
          </div>
          <h2
            className="text-5xl sm:text-6xl lg:text-7xl font-black mb-6"
            style={{
              fontFamily: "'Outfit', sans-serif",
              color: '#FFFFFF',
              lineHeight: '1.1',
            }}
          >
            Las 3 Cajas
            <br />
            <span style={{
              background: 'linear-gradient(135deg, #FF6B35, #FFD60A)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}>
              Misteriosas
            </span>
          </h2>
          <p
            className="text-lg max-w-2xl mx-auto mt-6"
            style={{
              fontFamily: "'Inter', sans-serif",
              color: '#E0E0E0',
            }}
          >
            Cada caja es una aventura culinaria. Elige el tier que mejor se ajuste a tu gusto y presupuesto.
          </p>
        </motion.div>

        {/* Boxes Grid */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {boxes.map((box, index) => {
            const IconComponent = box.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={box.featured ? { y: -10 } : undefined}
                className={`relative group rounded-3xl overflow-hidden transition-all duration-300 ${
                  box.featured ? 'md:scale-105 z-10' : ''
                }`}
                style={{
                  backgroundColor: 'rgba(255, 255, 255, 0.08)',
                  border: `2px solid ${box.featured ? box.accentColor + '80' : 'rgba(255, 255, 255, 0.15)'}`,
                  backdropFilter: 'blur(10px)',
                }}
              >
                {/* Featured Badge */}
                {box.featured && (
                  <motion.div
                    animate={{ scale: [1, 1.1, 1], rotate: [0, 5, -5, 0] }}
                    transition={{ duration: 4, repeat: Infinity }}
                    className="absolute top-6 right-6 z-20 px-4 py-2 rounded-full text-sm font-bold"
                    style={{
                      backgroundColor: box.accentColor,
                      color: '#000000',
                    }}
                  >
                    ⭐ {box.badge}
                  </motion.div>
                )}

                <div className="p-8 sm:p-10">
                  {/* Icon */}
                  <motion.div
                    animate={{ y: [0, -8, 0] }}
                    transition={{ duration: 3, repeat: Infinity }}
                    className="mb-6 inline-flex p-4 rounded-full"
                    style={{
                      backgroundColor: box.color + '20',
                      border: `2px solid ${box.color}`,
                    }}
                  >
                    <IconComponent size={40} color={box.color} strokeWidth={1.5} />
                  </motion.div>

                  {/* Tier Name */}
                  <h3
                    className="text-2xl sm:text-3xl font-black mb-3"
                    style={{
                      fontFamily: "'Outfit', sans-serif",
                      color: box.color,
                      letterSpacing: '2px',
                    }}
                  >
                    {box.tier}
                  </h3>

                  {/* Description */}
                  <p
                    className="text-sm mb-6"
                    style={{
                      fontFamily: "'Inter', sans-serif",
                      color: '#C0C0C0',
                    }}
                  >
                    {box.description}
                  </p>

                  {/* Price */}
                  <div className="mb-8">
                    <div
                      className="text-4xl font-black mb-1"
                      style={{
                        fontFamily: "'Outfit', sans-serif",
                        color: box.accentColor,
                      }}
                    >
                      {box.price}
                    </div>
                    <div
                      className="flex items-center gap-2 text-sm"
                      style={{ color: '#999999', fontFamily: "'Inter', sans-serif" }}
                    >
                      <span className="line-through">{box.originalPrice}</span>
                      <span
                        className="font-bold px-2 py-1 rounded"
                        style={{
                          backgroundColor: box.color + '30',
                          color: box.color,
                        }}
                      >
                        -{box.discount}
                      </span>
                    </div>
                  </div>

                  {/* Items List */}
                  <div className="mb-8 space-y-3 border-t border-b border-white/10 py-6">
                    {box.items.map((item, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, x: -10 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.1 }}
                        className="flex items-center gap-3"
                      >
                        <div
                          className="w-2 h-2 rounded-full flex-shrink-0"
                          style={{ backgroundColor: box.accentColor }}
                        />
                        <span
                          className="text-sm"
                          style={{
                            fontFamily: "'Inter', sans-serif",
                            color: '#E0E0E0',
                          }}
                        >
                          {item}
                        </span>
                      </motion.div>
                    ))}
                  </div>

                  {/* CTA Button */}
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="w-full py-4 rounded-xl font-bold text-lg transition-all duration-300 relative overflow-hidden group"
                    style={{
                      fontFamily: "'Inter', sans-serif",
                      backgroundColor: box.featured ? box.accentColor : 'transparent',
                      color: box.featured ? '#000000' : box.accentColor,
                      border: `2px solid ${box.accentColor}`,
                    }}
                  >
                    <span className="relative z-10">Desbloquear {box.tier}</span>
                    <div
                      className="absolute inset-0 bg-white/20 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"
                    />
                  </motion.button>
                </div>

                {/* Hover Glow Effect */}
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                  style={{
                    background: `radial-gradient(circle at center, ${box.accentColor}20, transparent)`,
                  }}
                />
              </motion.div>
            );
          })}
        </div>

        {/* Info Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-gradient-to-r from-orange-900/20 to-yellow-900/20 border border-orange-500/30 rounded-2xl p-8 text-center"
        >
          <p
            className="text-lg"
            style={{
              fontFamily: "'Inter', sans-serif",
              color: '#FFFFFF',
            }}
          >
            💡 <strong>Consejo:</strong> Todas nuestras cajas incluyen pan fresco del día, garantizando la mejor calidad. Los combos son limitados, ¡reserva la tuya hoy!
          </p>
        </motion.div>
      </div>
    </section>
  );
}
