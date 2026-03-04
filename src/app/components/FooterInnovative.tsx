import { motion } from 'motion/react';
import { HupiIcon } from './ui/HupiIcon';
import { Mail, MapPin, Phone } from 'lucide-react';

export function FooterInnovative() {
  const currentYear = new Date().getFullYear();

  return (
    <footer
      className="relative overflow-hidden"
      style={{ backgroundColor: '#050A1A' }}
    >
      {/* Decorative background */}
      <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-96 h-96 rounded-full blur-3xl opacity-15 pointer-events-none" style={{ backgroundColor: '#FF6B35' }} />

      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-20 relative z-10">
        <div className="grid md:grid-cols-4 gap-12 mb-16">
          {/* Brand Column */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex items-center gap-2 mb-6">
              <HupiIcon size={32} />
              <span
                className="text-2xl font-black tracking-tight"
                style={{
                  fontFamily: "'Outfit', sans-serif",
                  color: '#FFFFFF',
                }}
              >
                hupi<span style={{ color: '#FF6B35' }}>food</span>
              </span>
            </div>
            <p
              className="text-sm mb-6"
              style={{
                fontFamily: "'Inter', sans-serif",
                color: '#999999',
                lineHeight: '1.6',
              }}
            >
              Rescata comida deliciosa. Gana descuentos increíbles. Salva el planeta.
            </p>
            <div className="flex gap-4">
              {[
                { icon: '🌐', href: '/login' },
                { icon: '📱', href: 'https://whatsapp.com/channel/0029VbCQrFV1SWt3xy6MQE1A' },
                { icon: '🤝', href: '#' }
              ].map((item, i) => (
                <motion.a
                  key={i}
                  href={item.href}
                  target={item.href.startsWith('http') ? "_blank" : "_self"}
                  rel={item.href.startsWith('http') ? "noopener noreferrer" : ""}
                  whileHover={{ scale: 1.2, y: -3 }}
                  className="inline-flex items-center justify-center w-10 h-10 rounded-full"
                  style={{
                    backgroundColor: 'rgba(255, 255, 255, 0.1)',
                    border: '1px solid rgba(255, 255, 255, 0.2)',
                  }}
                >
                  <span className="text-lg">{item.icon}</span>
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <h4
              className="font-black text-lg mb-6"
              style={{
                fontFamily: "'Outfit', sans-serif",
                color: '#FFFFFF',
              }}
            >
              Producto
            </h4>
            <ul className="space-y-3">
              {['¿Qué es un Hupit?', 'Cómo Funciona', 'Nuestros Aliados', 'Preguntas Frecuentes'].map((link) => (
                <li key={link}>
                  <a
                    href="#"
                    className="text-sm transition-colors duration-300 hover:opacity-100"
                    style={{
                      fontFamily: "'Inter', sans-serif",
                      color: '#999999',
                      opacity: 0.7,
                    }}
                  >
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Company */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h4
              className="font-black text-lg mb-6"
              style={{
                fontFamily: "'Outfit', sans-serif",
                color: '#FFFFFF',
              }}
            >
              Empresa
            </h4>
            <ul className="space-y-3">
              {['Sobre Nosotros', 'Sostenibilidad', 'Contacto', 'Blog'].map((link) => (
                <li key={link}>
                  <a
                    href="#"
                    className="text-sm transition-colors duration-300 hover:opacity-100"
                    style={{
                      fontFamily: "'Inter', sans-serif",
                      color: '#999999',
                      opacity: 0.7,
                    }}
                  >
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Contact */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <h4
              className="font-black text-lg mb-6"
              style={{
                fontFamily: "'Outfit', sans-serif",
                color: '#FFFFFF',
              }}
            >
              Contacto
            </h4>
            <div className="space-y-4">
              <a
                href="mailto:hola@hupifood.co"
                className="flex items-center gap-3 text-sm group transition-colors duration-300 hover:text-orange-400"
                style={{
                  fontFamily: "'Inter', sans-serif",
                  color: '#999999',
                }}
              >
                <Mail size={18} color="#FF6B35" />
                <span>hola@hupifood.co</span>
              </a>
              <a
                href="tel:+573001234567"
                className="flex items-center gap-3 text-sm group transition-colors duration-300 hover:text-orange-400"
                style={{
                  fontFamily: "'Inter', sans-serif",
                  color: '#999999',
                }}
              >
                <Phone size={18} color="#FF6B35" />
                <span>+57 300 123 4567</span>
              </a>
              <div
                className="flex items-center gap-3 text-sm"
                style={{
                  fontFamily: "'Inter', sans-serif",
                  color: '#999999',
                }}
              >
                <MapPin size={18} color="#FF6B35" />
                <span>Bogotá, Colombia</span>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Divider */}
        <div
          className="h-px mb-12"
          style={{ backgroundColor: 'rgba(255, 255, 255, 0.1)' }}
        />

        {/* Bottom Section */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="flex flex-col md:flex-row md:items-center md:justify-between gap-6"
        >
          <p
            className="text-sm"
            style={{
              fontFamily: "'Inter', sans-serif",
              color: '#666666',
            }}
          >
            © {currentYear} Hupi Food. Todos los derechos reservados. Hecho con ❤️ en Bogotá.
          </p>

          <div className="flex gap-6">
            {['Privacidad', 'Términos', 'Cookies'].map((link) => (
              <a
                key={link}
                href="#"
                className="text-sm transition-colors duration-300 hover:opacity-100"
                style={{
                  fontFamily: "'Inter', sans-serif",
                  color: '#666666',
                  opacity: 0.8,
                }}
              >
                {link}
              </a>
            ))}
          </div>
        </motion.div>
      </div>
    </footer>
  );
}
