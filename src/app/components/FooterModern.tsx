import { motion } from 'motion/react';
import { Instagram, MapPin, Mail, Phone } from 'lucide-react';
import { HupiIcon } from './ui/HupiIcon';

export function FooterModern() {
  const currentYear = new Date().getFullYear();

  return (
    <footer
      className="relative pt-20 pb-8 px-6 sm:px-8 lg:px-12"
      style={{ backgroundColor: '#1B1B2F' }}
    >
      {/* Decorative Top Border */}
      <div
        className="absolute top-0 left-0 right-0 h-[3px]"
        style={{
          background: 'linear-gradient(to right, transparent, #2D6A4F, #F77F00, #2D6A4F, transparent)',
        }}
      />

      <div className="max-w-7xl mx-auto">
        {/* Main Footer Content */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Brand Column */}
          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              {/* Logo */}
              <div className="flex items-center gap-2 mb-6">
                <HupiIcon size={40} />
                <span
                  className="text-3xl font-bold tracking-tight"
                  style={{
                    fontFamily: "'Outfit', sans-serif",
                    color: '#FFF8F0',
                  }}
                >
                  hupi<span style={{ color: '#F77F00' }}>food</span>
                </span>
              </div>

              <p
                className="text-base leading-relaxed max-w-md mb-6"
                style={{
                  fontFamily: "'Inter', sans-serif",
                  color: '#FFF8F0',
                  opacity: 0.6,
                }}
              >
                Rescatamos comida deliciosa de las mejores panaderías de tu barrio.
                Cajas sorpresa a precio justo, cero desperdicio. ¡Así de simple, parcero! 🇨🇴
              </p>

              {/* Social Links */}
              <div className="flex gap-3">
                {[
                  {
                    icon: () => (
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="#25D366"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" /></svg>
                    ), label: 'WhatsApp', href: 'https://whatsapp.com/channel/hupi-food'
                  },
                  { icon: Instagram, label: 'Instagram', href: '#' },
                  { icon: () => <span className="text-lg">🎵</span>, label: 'TikTok', href: '#' },
                ].map((social, index) => (
                  <motion.a
                    key={index}
                    href={social.href}
                    target={social.href.startsWith('http') ? '_blank' : undefined}
                    rel={social.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                    whileHover={{ scale: 1.1, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    className="w-11 h-11 rounded-xl flex items-center justify-center transition-all duration-300"
                    style={{
                      backgroundColor: 'rgba(45, 106, 79, 0.15)',
                      border: '1px solid rgba(45, 106, 79, 0.25)',
                    }}
                  >
                    {typeof social.icon === 'function' ? (
                      <social.icon />
                    ) : (
                      <social.icon size={18} color="#40916C" />
                    )}
                  </motion.a>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Links Column */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <h4
              className="mb-5 tracking-wider uppercase text-sm font-bold"
              style={{
                fontFamily: "'Inter', sans-serif",
                color: '#F77F00',
              }}
            >
              Explorar
            </h4>

            <ul className="space-y-3">
              {[
                '¿Qué es un Hupit?',
                'Cómo Funciona',
                'Nuestros Aliados',
                'Registra tu Negocio',
                'Blog',
                'Preguntas Frecuentes',
              ].map((link, index) => (
                <li key={index}>
                  <a
                    href="#"
                    className="text-sm transition-all duration-300 hover:translate-x-2 inline-block hover:opacity-100"
                    style={{
                      fontFamily: "'Inter', sans-serif",
                      color: '#FFF8F0',
                      opacity: 0.6,
                    }}
                  >
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Contact Column */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h4
              className="mb-5 tracking-wider uppercase text-sm font-bold"
              style={{
                fontFamily: "'Inter', sans-serif",
                color: '#F77F00',
              }}
            >
              Contacto
            </h4>

            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin size={18} color="#40916C" className="mt-0.5 flex-shrink-0" />
                <span
                  className="text-sm"
                  style={{
                    fontFamily: "'Inter', sans-serif",
                    color: '#FFF8F0',
                    opacity: 0.6,
                  }}
                >
                  Bogotá, Colombia 🇨🇴
                </span>
              </li>

              <li className="flex items-start gap-3">
                <Mail size={18} color="#40916C" className="mt-0.5 flex-shrink-0" />
                <a
                  href="mailto:hola@hupifood.co"
                  className="text-sm transition-colors duration-300 hover:opacity-100"
                  style={{
                    fontFamily: "'Inter', sans-serif",
                    color: '#FFF8F0',
                    opacity: 0.6,
                  }}
                >
                  hola@hupifood.co
                </a>
              </li>

              <li className="flex items-start gap-3">
                <Phone size={18} color="#40916C" className="mt-0.5 flex-shrink-0" />
                <a
                  href="tel:+573001234567"
                  className="text-sm transition-colors duration-300 hover:opacity-100"
                  style={{
                    fontFamily: "'Inter', sans-serif",
                    color: '#FFF8F0',
                    opacity: 0.6,
                  }}
                >
                  +57 300 123 4567
                </a>
              </li>
            </ul>
          </motion.div>
        </div>

        {/* Newsletter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mb-12 p-8 rounded-2xl"
          style={{
            background: 'linear-gradient(135deg, rgba(45, 106, 79, 0.1), rgba(247, 127, 0, 0.05))',
            border: '1px solid rgba(45, 106, 79, 0.15)',
          }}
        >
          <div className="max-w-2xl mx-auto text-center">
            <h4
              className="text-2xl mb-3 font-bold"
              style={{
                fontFamily: "'Outfit', sans-serif",
                color: '#FFF8F0',
              }}
            >
              ¿Querés enterarte primero? 📬
            </h4>

            <p
              className="text-sm mb-5"
              style={{
                fontFamily: "'Inter', sans-serif",
                color: '#FFF8F0',
                opacity: 0.6,
              }}
            >
              Noticias, ofertas y tips sobre desperdicio alimentario directo a tu correo
            </p>

            <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <input
                type="email"
                placeholder="tu@email.com"
                className="flex-1 px-5 py-3 text-sm rounded-xl"
                style={{
                  backgroundColor: 'rgba(255, 248, 240, 0.08)',
                  border: '1px solid rgba(45, 106, 79, 0.3)',
                  color: '#FFF8F0',
                  fontFamily: "'Inter', sans-serif",
                }}
              />

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-6 py-3 rounded-xl font-semibold text-sm"
                style={{
                  background: 'linear-gradient(135deg, #F77F00, #FCBF49)',
                  color: '#1B1B2F',
                  fontFamily: "'Inter', sans-serif",
                }}
              >
                Suscribirme
              </motion.button>
            </div>
          </div>
        </motion.div>

        {/* Bottom Bar */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="pt-8 border-t flex flex-col sm:flex-row justify-between items-center gap-4"
          style={{ borderColor: 'rgba(45, 106, 79, 0.15)' }}
        >
          <p
            className="text-sm"
            style={{
              fontFamily: "'Inter', sans-serif",
              color: '#FFF8F0',
              opacity: 0.4,
            }}
          >
            © {currentYear} Hupi-food. Todos los derechos reservados.
          </p>

          <div className="flex gap-6">
            {['Privacidad', 'Términos', 'Cookies'].map((link, index) => (
              <a
                key={index}
                href="#"
                className="text-sm transition-colors duration-300 hover:opacity-100"
                style={{
                  fontFamily: "'Inter', sans-serif",
                  color: '#FFF8F0',
                  opacity: 0.4,
                }}
              >
                {link}
              </a>
            ))}
          </div>
        </motion.div>

        {/* Made with love */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="text-center mt-6"
        >
          <p
            className="text-xs"
            style={{
              fontFamily: "'Inter', sans-serif",
              color: '#40916C',
              opacity: 0.6,
            }}
          >
            Hecho con ❤️ y pandebono en Bogotá 🇨🇴
          </p>
        </motion.div>
      </div>
    </footer>
  );
}
