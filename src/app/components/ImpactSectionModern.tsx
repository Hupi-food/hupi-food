import { motion, useInView } from 'motion/react';
import { useRef, useState, useEffect } from 'react';
import { Leaf, TrendingUp, Users, Heart } from 'lucide-react';

function AnimatedCounter({ target, suffix = '', duration = 2000 }: { target: number; suffix?: string; duration?: number }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (!isInView) return;
    let start = 0;
    const increment = target / (duration / 16);
    const timer = setInterval(() => {
      start += increment;
      if (start >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);
    return () => clearInterval(timer);
  }, [isInView, target, duration]);

  return <span ref={ref}>{count.toLocaleString()}{suffix}</span>;
}

export function ImpactSectionModern() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  const impacts = [
    {
      icon: Leaf,
      title: 'Planeta más verde',
      description:
        'Cada Hupit que compras evita que comida perfecta termine en la basura. Menos desperdicio, menos CO₂, más sonrisas.',
      stat: 500,
      statSuffix: 'kg',
      statLabel: 'Comida rescatada este mes',
    },
    {
      icon: Heart,
      title: 'Apoyo local',
      description:
        'Tu compra apoya directamente a las panaderías y negocios de tu barrio. Porque lo local siempre es mejor.',
      stat: 50,
      statSuffix: '+',
      statLabel: 'Negocios aliados en Bogotá',
    },
    {
      icon: Users,
      title: 'Comunidad que crece',
      description:
        'Miles de colombianos ya son parte del movimiento Hupi. Gente real, comida real, impacto real.',
      stat: 2500,
      statSuffix: '+',
      statLabel: 'Hupiers activos',
    },
  ];

  return (
    <section
      ref={ref}
      id="impacto"
      className="py-24 sm:py-32 px-6 sm:px-8 lg:px-12 relative overflow-hidden"
      style={{ backgroundColor: '#1B1B2F' }}
    >
      {/* Background */}
      <div className="absolute inset-0 opacity-5">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: 'radial-gradient(circle at 1px 1px, #2D6A4F 1px, transparent 0)',
            backgroundSize: '40px 40px',
          }}
        />
      </div>

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
              backgroundColor: 'rgba(45, 106, 79, 0.15)',
              border: '1px solid rgba(45, 106, 79, 0.3)',
            }}
          >
            <span className="text-base">🌎</span>
            <span
              className="text-xs tracking-wider uppercase font-semibold"
              style={{
                fontFamily: "'Inter', sans-serif",
                color: '#40916C',
              }}
            >
              Nuestro Impacto
            </span>
          </div>

          <h2
            className="text-4xl sm:text-5xl lg:text-6xl mb-6 max-w-4xl mx-auto font-bold"
            style={{
              fontFamily: "'Outfit', sans-serif",
              color: '#FFF8F0',
              lineHeight: '1.1',
            }}
          >
            Cada Hupit
            <br />
            <span
              style={{
                background: 'linear-gradient(135deg, #2D6A4F, #40916C)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              hace la diferencia
            </span>
          </h2>

          <p
            className="text-lg sm:text-xl max-w-3xl mx-auto"
            style={{
              fontFamily: "'Inter', sans-serif",
              color: '#FFF8F0',
              opacity: 0.65,
              lineHeight: '1.6',
            }}
          >
            No es solo comida rica y barata. Es un movimiento para cuidar
            nuestro planeta y apoyar a los negocios de nuestros barrios.
          </p>
        </motion.div>

        {/* Impact Cards */}
        <div className="grid md:grid-cols-3 gap-6 mb-16">
          {impacts.map((impact, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 + index * 0.2 }}
            >
              <motion.div
                whileHover={{ y: -8, scale: 1.02 }}
                transition={{ duration: 0.3 }}
                className="relative p-8 h-full rounded-2xl group cursor-pointer"
                style={{
                  backgroundColor: 'rgba(45, 106, 79, 0.08)',
                  border: '1px solid rgba(45, 106, 79, 0.2)',
                  backdropFilter: 'blur(10px)',
                }}
              >
                {/* Icon */}
                <motion.div
                  className="w-16 h-16 rounded-2xl flex items-center justify-center mb-6"
                  style={{
                    background: 'linear-gradient(135deg, rgba(45, 106, 79, 0.2), rgba(64, 145, 108, 0.2))',
                  }}
                  whileHover={{ rotate: 10, scale: 1.1 }}
                  transition={{ duration: 0.3 }}
                >
                  <impact.icon size={30} color="#40916C" strokeWidth={1.8} />
                </motion.div>

                <h3
                  className="text-2xl mb-4 font-bold"
                  style={{
                    fontFamily: "'Outfit', sans-serif",
                    color: '#FFF8F0',
                  }}
                >
                  {impact.title}
                </h3>

                <p
                  className="text-base leading-relaxed mb-6"
                  style={{
                    fontFamily: "'Inter', sans-serif",
                    color: '#FFF8F0',
                    opacity: 0.65,
                  }}
                >
                  {impact.description}
                </p>

                {/* Animated Stat */}
                <div
                  className="pt-6 border-t"
                  style={{ borderColor: 'rgba(45, 106, 79, 0.2)' }}
                >
                  <div
                    className="text-4xl font-bold mb-1"
                    style={{
                      fontFamily: "'Outfit', sans-serif",
                      color: '#F77F00',
                    }}
                  >
                    <AnimatedCounter target={impact.stat} suffix={impact.statSuffix} />
                  </div>
                  <div
                    className="text-sm"
                    style={{
                      fontFamily: "'Inter', sans-serif",
                      color: '#FFF8F0',
                      opacity: 0.5,
                    }}
                  >
                    {impact.statLabel}
                  </div>
                </div>
              </motion.div>
            </motion.div>
          ))}
        </div>

        {/* Quote */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="relative p-10 sm:p-12 text-center rounded-3xl"
          style={{
            background: 'linear-gradient(135deg, rgba(45, 106, 79, 0.15), rgba(247, 127, 0, 0.08))',
            border: '1px solid rgba(45, 106, 79, 0.2)',
          }}
        >
          <p
            className="text-2xl sm:text-3xl max-w-3xl mx-auto mb-4 font-bold"
            style={{
              fontFamily: "'Outfit', sans-serif",
              color: '#FFF8F0',
              lineHeight: '1.4',
            }}
          >
            "La mejor comida es la que se comparte, no la que se bota"
          </p>

          <p
            className="text-sm tracking-wider font-medium"
            style={{
              fontFamily: "'Inter', sans-serif",
              color: '#F77F00',
            }}
          >
            — Filosofía Hupi-food 🇨🇴
          </p>
        </motion.div>
      </div>
    </section>
  );
}
