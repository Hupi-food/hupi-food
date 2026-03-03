import { motion } from 'motion/react';
import { useInView } from 'motion/react';
import { useRef } from 'react';
import { Search, Lock, Sparkles } from 'lucide-react';

export function HowItWorksSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  const steps = [
    {
      icon: Search,
      number: '01',
      title: 'Select',
      description:
        'Browse our daily curated selection from Bogotá\'s finest artisan bakeries. Each Hupit is a surprise of gourmet treasures.',
    },
    {
      icon: Lock,
      number: '02',
      title: 'Secure',
      description:
        'Reserve your Hupit with a simple tap. Limited availability ensures exclusivity and freshness for every conscious epicurean.',
    },
    {
      icon: Sparkles,
      number: '03',
      title: 'Savor',
      description:
        'Collect your rescued treasures and indulge in premium artisan creations. Experience the luxury of sustainable indulgence.',
    },
  ];

  return (
    <section
      ref={ref}
      id="how-it-works"
      className="py-24 sm:py-32 px-6 sm:px-8 lg:px-12 relative overflow-hidden"
      style={{ backgroundColor: '#1A1A1A' }}
    >
      {/* Decorative Background */}
      <div className="absolute inset-0 opacity-5">
        <img
          src="https://images.unsplash.com/photo-1744217413036-2bb3d18aae4d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhcnRpc2FuJTIwYnJlYWQlMjB0ZXh0dXJlJTIwY2xvc2UlMjB1cHxlbnwxfHx8fDE3NzIzMjY4NDV8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
          alt="Artisan bread texture"
          className="w-full h-full object-cover"
        />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <p
            className="text-sm tracking-[0.2em] mb-4"
            style={{
              fontFamily: "'Inter', sans-serif",
              color: '#D4AF37',
            }}
          >
            HOW IT WORKS
          </p>
          <h2
            className="text-4xl sm:text-5xl lg:text-6xl mb-6"
            style={{
              fontFamily: "'Playfair Display', serif",
              color: '#F5F5F5',
              lineHeight: '1.2',
            }}
          >
            Three Steps to Excellence
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-12 lg:gap-16">
          {steps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 + index * 0.2 }}
              className="relative group"
            >
              {/* Connector Line (hidden on mobile) */}
              {index < steps.length - 1 && (
                <div
                  className="hidden md:block absolute top-16 left-[60%] w-full h-[2px] z-0"
                  style={{
                    background:
                      'linear-gradient(to right, rgba(212, 175, 55, 0.3), rgba(212, 175, 55, 0))',
                  }}
                />
              )}

              {/* Content */}
              <div className="relative z-10">
                {/* Number */}
                <div
                  className="text-7xl sm:text-8xl mb-6 opacity-20"
                  style={{
                    fontFamily: "'Playfair Display', serif",
                    color: '#D4AF37',
                    lineHeight: '1',
                  }}
                >
                  {step.number}
                </div>

                {/* Icon */}
                <div
                  className="inline-flex items-center justify-center w-20 h-20 mb-6 rounded-full transition-all duration-300 group-hover:scale-110 group-hover:shadow-lg"
                  style={{
                    backgroundColor: 'rgba(212, 175, 55, 0.1)',
                    border: '2px solid #D4AF37',
                  }}
                >
                  <step.icon size={36} color="#D4AF37" strokeWidth={1.5} />
                </div>

                {/* Title */}
                <h3
                  className="text-3xl sm:text-4xl mb-4"
                  style={{
                    fontFamily: "'Playfair Display', serif",
                    color: '#F5F5F5',
                  }}
                >
                  {step.title}
                </h3>

                {/* Description */}
                <p
                  className="text-base leading-relaxed"
                  style={{
                    fontFamily: "'Inter', sans-serif",
                    color: '#F5F5F5',
                    opacity: 0.7,
                  }}
                >
                  {step.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}