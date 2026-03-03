import { motion, AnimatePresence } from 'motion/react';
import { ChevronDown } from 'lucide-react';
import { useState } from 'react';

export function FAQSectionInnovative() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      question: '¿Qué es exactamente un Hupit?',
      answer: 'Un Hupit es una caja sorpresa con pan artesanal, pasteles y delicias frescas de nuestros aliados (panaderías y restaurantes). Cada caja es un misterio culinario que puedes comprar a mitad de precio.',
      emoji: '🎁',
    },
    {
      question: '¿Cuáles son los 3 tiers y en qué se diferencian?',
      answer: 'Bronze ($14,900): Introducción a lo mejor de la panadería. Silver ($24,900): Experiencia curada con especialidades. Gold ($39,900): Lujo garantizado con selecciones premium. Cada tier tiene contenido diferente y sorpresas únicas.',
      emoji: '🏆',
    },
    {
      question: '¿Cómo funciona el sistema de pago?',
      answer: 'Realizas la compra en la app, luego realizas una transferencia manual a través de Nequi, Daviplata, Bre-b o Ualá. Una vez que subes la evidencia de pago, nuestro equipo verifica y aprueba. Recibirás un código QR para canjear tu caja en la tienda.',
      emoji: '💰',
    },
    {
      question: '¿Hay garantía de frescura?',
      answer: '¡Por supuesto! Todas nuestras cajas contienen alimentos del día, garantizando máxima frescura. Si hay algún problema, nuestro equipo está listo para ayudarte. La satisfacción del cliente es nuestra prioridad.',
      emoji: '🌟',
    },
    {
      question: '¿Puedo devolver o cambiar mi caja?',
      answer: 'Sí, si la caja llega con algún problema o no cumple con tu expectativa, contáctanos inmediatamente. Ofrecemos cambios o reembolsos dentro de 24 horas.',
      emoji: '🔄',
    },
    {
      question: '¿Cuál es el impacto ambiental real?',
      answer: 'Cada caja vendida salva aproximadamente 0.5kg de alimento del desperdicio. Hemos rescatado más de 500kg de comida y estamos reduciendo la huella de carbono de nuestros aliados en un 80%.',
      emoji: '♻️',
    },
  ];

  return (
    <section
      id="faq"
      className="py-24 px-6 sm:px-8 lg:px-12 relative overflow-hidden"
      style={{ backgroundColor: '#0A0E27' }}
    >
      {/* Decorative background */}
      <div className="absolute top-1/2 left-0 w-96 h-96 rounded-full blur-3xl opacity-15 pointer-events-none" style={{ backgroundColor: '#FF6B35' }} />

      <div className="max-w-4xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2
            className="text-5xl sm:text-6xl lg:text-7xl font-black mb-6"
            style={{
              fontFamily: "'Outfit', sans-serif",
              color: '#FFFFFF',
              lineHeight: '1.1',
            }}
          >
            Preguntas
            <br />
            <span style={{
              background: 'linear-gradient(135deg, #FF6B35, #FFD60A)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}>
              Frecuentes
            </span>
          </h2>
          <p
            className="text-lg max-w-2xl mx-auto mt-6"
            style={{
              fontFamily: "'Inter', sans-serif",
              color: '#E0E0E0',
            }}
          >
            Tenemos respuestas a todas tus dudas sobre Hupi.
          </p>
        </motion.div>

        {/* FAQ Items */}
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.05 }}
              className="group"
            >
              <motion.button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full text-left p-6 rounded-2xl transition-all duration-300 flex items-start gap-4"
                style={{
                  backgroundColor: openIndex === index ? 'rgba(255, 107, 53, 0.15)' : 'rgba(255, 255, 255, 0.08)',
                  border: `2px solid ${openIndex === index ? 'rgba(255, 107, 53, 0.4)' : 'rgba(255, 255, 255, 0.15)'}`,
                  backdropFilter: 'blur(10px)',
                }}
                whileHover={{
                  backgroundColor: openIndex === index ? 'rgba(255, 107, 53, 0.2)' : 'rgba(255, 255, 255, 0.12)',
                }}
              >
                {/* Emoji */}
                <span className="text-3xl flex-shrink-0 mt-1">{faq.emoji}</span>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <h3
                    className="text-lg font-bold mb-0 pr-8"
                    style={{
                      fontFamily: "'Outfit', sans-serif",
                      color: '#FFFFFF',
                    }}
                  >
                    {faq.question}
                  </h3>
                </div>

                {/* Chevron */}
                <motion.div
                  animate={{ rotate: openIndex === index ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                  className="flex-shrink-0 mt-1"
                >
                  <ChevronDown
                    size={24}
                    color="#FF6B35"
                    strokeWidth={2}
                  />
                </motion.div>
              </motion.button>

              {/* Answer */}
              <AnimatePresence mode="wait">
                {openIndex === index && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <div
                      className="p-6 pt-0"
                      style={{
                        backgroundColor: 'rgba(255, 107, 53, 0.08)',
                      }}
                    >
                      <p
                        className="text-base leading-relaxed"
                        style={{
                          fontFamily: "'Inter', sans-serif",
                          color: '#E0E0E0',
                        }}
                      >
                        {faq.answer}
                      </p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>

        {/* Contact CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-16 text-center p-8 rounded-3xl"
          style={{
            backgroundColor: 'rgba(0, 212, 170, 0.1)',
            border: '2px solid rgba(0, 212, 170, 0.3)',
            backdropFilter: 'blur(10px)',
          }}
        >
          <h3
            className="text-2xl font-black mb-4"
            style={{
              fontFamily: "'Outfit', sans-serif",
              color: '#00D4AA',
            }}
          >
            ¿Aún tienes preguntas?
          </h3>
          <p
            className="mb-6"
            style={{
              fontFamily: "'Inter', sans-serif",
              color: '#E0E0E0',
            }}
          >
            Nuestro equipo está listo para ayudarte en cualquier momento.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <motion.a
              href="https://whatsapp.com/channel/hupi-food"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-3 rounded-xl font-bold text-white no-underline inline-flex items-center justify-center gap-2"
              style={{
                background: 'linear-gradient(135deg, #25D366, #128C7E)',
              }}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" /></svg>
              WhatsApp
            </motion.a>
            <motion.a
              href="mailto:hola@hupifood.co"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-3 rounded-xl font-bold no-underline inline-flex items-center justify-center gap-2"
              style={{
                backgroundColor: 'rgba(255, 255, 255, 0.15)',
                color: '#FFFFFF',
                border: '2px solid rgba(255, 255, 255, 0.3)',
              }}
            >
              📧 Email
            </motion.a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
