import { motion } from 'motion/react';
import { Star } from 'lucide-react';

export function TestimonialsSection() {
  const testimonials = [
    {
      name: 'María García',
      role: 'Compradora Regular',
      image: '👩‍💼',
      content: 'Hupi cambió mi forma de comprar comida. Las cajas misteriosas siempre me sorprenden con calidad gourmet a mitad de precio.',
      rating: 5,
      highlight: 'Las mejores ofertas en panadería artesanal',
    },
    {
      name: 'Juan Carlos López',
      role: 'Panadería Aliada',
      image: '👨‍🍳',
      content: 'Con Hupi hemos reducido nuestro desperdicio en 80%. Nuestros clientes aman las cajas misteriosas y nosotros apoyamos la sostenibilidad.',
      rating: 5,
      highlight: 'Impacto real en sostenibilidad',
    },
    {
      name: 'Laura Martínez',
      role: 'Emprendedora Consciente',
      image: '👩‍💻',
      content: 'Compro Hupi porque creo en la misión. El concepto gamificado hace que cada compra sea una experiencia memorable.',
      rating: 5,
      highlight: 'Gamificación que tiene propósito',
    },
  ];

  return (
    <section
      className="py-24 px-6 sm:px-8 lg:px-12 relative overflow-hidden"
      style={{ backgroundColor: '#0F1A2E' }}
    >
      {/* Decorative background */}
      <div className="absolute top-0 right-1/4 w-80 h-80 rounded-full blur-3xl opacity-20 pointer-events-none" style={{ backgroundColor: '#FF6B35' }} />

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
            Lo que Dicen
            <br />
            <span style={{
              background: 'linear-gradient(135deg, #FF6B35, #FFD60A)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}>
              Nuestros Usuarios
            </span>
          </h2>
        </motion.div>

        {/* Testimonials Grid */}
        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ y: -10 }}
              className="group relative rounded-3xl overflow-hidden p-8 transition-all duration-300"
              style={{
                backgroundColor: 'rgba(255, 255, 255, 0.08)',
                border: '2px solid rgba(255, 255, 255, 0.15)',
                backdropFilter: 'blur(10px)',
              }}
            >
              {/* Rating Stars */}
              <div className="flex gap-1 mb-6">
                {Array.from({ length: testimonial.rating }).map((_, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, scale: 0 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ delay: i * 0.1 }}
                  >
                    <Star size={20} fill="#FFD60A" color="#FFD60A" />
                  </motion.div>
                ))}
              </div>

              {/* Quote */}
              <p
                className="text-base mb-6 leading-relaxed"
                style={{
                  fontFamily: "'Inter', sans-serif",
                  color: '#E0E0E0',
                }}
              >
                "{testimonial.content}"
              </p>

              {/* Highlight Badge */}
              <div
                className="mb-6 px-3 py-2 rounded-lg text-sm font-semibold inline-block"
                style={{
                  backgroundColor: 'rgba(255, 107, 53, 0.2)',
                  color: '#FF6B35',
                  border: '1px solid rgba(255, 107, 53, 0.4)',
                }}
              >
                ✓ {testimonial.highlight}
              </div>

              {/* Author Info */}
              <div className="flex items-center gap-4 pt-6 border-t border-white/10">
                <div
                  className="text-4xl"
                >
                  {testimonial.image}
                </div>
                <div>
                  <div
                    className="font-bold text-sm"
                    style={{
                      fontFamily: "'Outfit', sans-serif",
                      color: '#FFFFFF',
                    }}
                  >
                    {testimonial.name}
                  </div>
                  <div
                    className="text-xs"
                    style={{
                      fontFamily: "'Inter', sans-serif",
                      color: '#999999',
                    }}
                  >
                    {testimonial.role}
                  </div>
                </div>
              </div>

              {/* Glow Effect */}
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                style={{
                  background: 'radial-gradient(circle at center, rgba(255, 107, 53, 0.15), transparent)',
                }}
              />
            </motion.div>
          ))}
        </div>

        {/* Stats Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-6 p-8 rounded-3xl"
          style={{
            backgroundColor: 'rgba(255, 107, 53, 0.1)',
            border: '2px solid rgba(255, 107, 53, 0.3)',
            backdropFilter: 'blur(10px)',
          }}
        >
          {[
            { value: '4.9⭐', label: 'Calificación' },
            { value: '2.5K+', label: 'Compras' },
            { value: '98%', label: 'Satisfacción' },
            { value: '50+', label: 'Aliados' },
          ].map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: i * 0.1 }}
              className="text-center"
            >
              <div
                className="text-3xl font-black mb-1"
                style={{
                  fontFamily: "'Outfit', sans-serif",
                  color: '#FFD60A',
                }}
              >
                {stat.value}
              </div>
              <div
                className="text-xs"
                style={{
                  fontFamily: "'Inter', sans-serif",
                  color: '#E0E0E0',
                }}
              >
                {stat.label}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
