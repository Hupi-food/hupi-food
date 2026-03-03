import { motion, useInView, AnimatePresence } from 'motion/react';
import { useRef, useState } from 'react';
import { ChevronDown, Users, Store } from 'lucide-react';

const userFaqs = [
    {
        question: '¿Qué es exactamente una Caja Sorpresa?',
        answer:
            'Es un paquete lleno de deliciosos productos frescos que las panaderías hornearon hoy, pero que no se vendieron antes de la hora de cierre. Como el contenido depende de lo que haya sobrado ese día en específico, ¡siempre es una sorpresa deliciosa a mitad de precio!',
    },
    {
        question: '¿Los productos están a punto de vencerse o en mal estado?',
        answer:
            '¡Para nada! Son productos horneados y preparados el mismo día. La única razón por la que están en la caja es porque la panadería cerró y nosotros preferimos que lleguen a tu mesa frescos antes que terminar en la basura. Son 100% seguros y deliciosos.',
    },
    {
        question: '¿Puedo elegir qué pan o postre viene en mi caja?',
        answer:
            'La magia está en la sorpresa. No puedes elegir los productos exactos, ya que todo depende del excedente diario del local. Sin embargo, te garantizamos que el valor real de los productos siempre será al menos el doble de lo que pagaste.',
    },
    {
        question: '¿Cómo y cuándo recojo mi pedido?',
        answer:
            'Al comprar tu caja en la App, verás una "Ventana de Recogida" (generalmente los últimos 30 minutos antes de que cierre el local). Solo debes acercarte a la panadería en ese horario, mostrar tu código de confirmación digital y disfrutar.',
    },
    {
        question: '¿Qué pasa si el tráfico de Bogotá me retrasa y llego cuando la panadería ya cerró?',
        answer:
            'Entendemos que la ciudad es caótica, pero los horarios de nuestros aliados son estrictos. Si llegas fuera de la ventana de recogida, la panadería estará cerrada y perderás tu pedido sin opción a reembolso. ¡Te recomendamos planear tu ruta con tiempo!',
    },
];

const partnerFaqs = [
    {
        question: '¿Vender a mitad de precio no hará que mis clientes de siempre dejen de comprar temprano?',
        answer:
            'Nuestros datos demuestran que no. El usuario de nuestra App es un cliente diferente (estudiantes, oficinistas jóvenes) que busca la oportunidad del horario nocturno y la sostenibilidad. Además, como el contenido es sorpresa y el stock es limitado, tu cliente tradicional preferirá seguir comprando a precio completo para elegir su producto favorito a la hora que quiera.',
    },
    {
        question: '¿Qué pasa si un día vendo todo y no me sobra nada para la App?',
        answer:
            '¡Celebramos contigo, porque ese es el objetivo ideal de tu negocio! Tú tienes el control total. Si un día no hay excedentes, simplemente no publicas cajas en la plataforma. No tienes cuotas mínimas ni obligación de hornear de más.',
    },
    {
        question: '¿Tiene algún costo de inscripción o mensualidad unirme a la plataforma?',
        answer:
            'Cero costos de entrada. No pagas suscripciones ni mensualidades. Nosotros solo cobramos una pequeña comisión por cada caja que efectivamente se venda a través de la App. Si tú no vendes cajas un día, nosotros no cobramos nada. Es un modelo 100% a riesgo compartido.',
    },
    {
        question: '¿Tengo que atender quejas si un usuario llega cuando ya cerré la reja?',
        answer:
            'Absolutamente no. Nuestra plataforma cuenta con un cronómetro estricto. Si el usuario llega un minuto tarde, la App invalida su código y tú no tienes que abrir la puerta ni dar explicaciones. Nosotros nos encargamos del soporte al cliente para proteger tu operación.',
    },
];

function FAQItem({
    question,
    answer,
    index,
    isOpen,
    onToggle,
    accentColor,
}: {
    question: string;
    answer: string;
    index: number;
    isOpen: boolean;
    onToggle: () => void;
    accentColor: string;
}) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: index * 0.07 }}
            className="rounded-2xl overflow-hidden"
            style={{
                border: `1px solid ${isOpen ? accentColor + '40' : 'rgba(45,106,79,0.12)'}`,
                backgroundColor: isOpen ? 'rgba(255,255,255,0.06)' : 'rgba(255,255,255,0.03)',
                transition: 'border-color 0.3s, background-color 0.3s',
            }}
        >
            <button
                onClick={onToggle}
                className="w-full text-left flex items-start justify-between gap-4 p-6"
            >
                <span
                    className="text-base sm:text-lg font-semibold leading-snug"
                    style={{
                        fontFamily: "'Outfit', sans-serif",
                        color: '#FFF8F0',
                    }}
                >
                    {question}
                </span>
                <motion.div
                    animate={{ rotate: isOpen ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                    className="flex-shrink-0 mt-0.5"
                >
                    <ChevronDown size={22} color={isOpen ? accentColor : '#FFF8F0'} style={{ opacity: isOpen ? 1 : 0.4 }} />
                </motion.div>
            </button>

            <AnimatePresence initial={false}>
                {isOpen && (
                    <motion.div
                        key="content"
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.35, ease: 'easeInOut' }}
                        style={{ overflow: 'hidden' }}
                    >
                        <div
                            className="px-6 pb-6 text-sm sm:text-base leading-relaxed"
                            style={{
                                fontFamily: "'Inter', sans-serif",
                                color: '#FFF8F0',
                                opacity: 0.7,
                                borderTop: `1px solid ${accentColor}25`,
                                paddingTop: '1rem',
                            }}
                        >
                            {answer}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.div>
    );
}

export function FAQSectionModern() {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: '-100px' });
    const [activeTab, setActiveTab] = useState<'usuarios' | 'aliados'>('usuarios');
    const [openIndex, setOpenIndex] = useState<number | null>(0);

    const faqs = activeTab === 'usuarios' ? userFaqs : partnerFaqs;
    const accentColor = activeTab === 'usuarios' ? '#F77F00' : '#40916C';

    const handleTabChange = (tab: 'usuarios' | 'aliados') => {
        setActiveTab(tab);
        setOpenIndex(0);
    };

    return (
        <section
            ref={ref}
            id="faq"
            className="py-24 sm:py-32 px-6 sm:px-8 lg:px-12 relative overflow-hidden"
            style={{ backgroundColor: '#1B1B2F' }}
        >
            {/* Background grid */}
            <div
                className="absolute inset-0 opacity-[0.03]"
                style={{
                    backgroundImage: 'radial-gradient(circle at 1px 1px, #F77F00 1px, transparent 0)',
                    backgroundSize: '48px 48px',
                }}
            />

            <div className="max-w-4xl mx-auto relative z-10">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.8 }}
                    className="text-center mb-14"
                >
                    <div
                        className="inline-flex items-center gap-2 px-4 py-2 mb-6 rounded-full"
                        style={{
                            backgroundColor: 'rgba(247, 127, 0, 0.1)',
                            border: '1px solid rgba(247, 127, 0, 0.25)',
                        }}
                    >
                        <span className="text-base">💬</span>
                        <span
                            className="text-xs tracking-wider uppercase font-semibold"
                            style={{ fontFamily: "'Inter', sans-serif", color: '#FCBF49' }}
                        >
                            Preguntas Frecuentes
                        </span>
                    </div>

                    <h2
                        className="text-4xl sm:text-5xl lg:text-6xl mb-5 font-bold"
                        style={{
                            fontFamily: "'Outfit', sans-serif",
                            color: '#FFF8F0',
                            lineHeight: '1.1',
                        }}
                    >
                        Tenemos las
                        <br />
                        <span
                            style={{
                                background: 'linear-gradient(135deg, #F77F00, #FCBF49)',
                                WebkitBackgroundClip: 'text',
                                WebkitTextFillColor: 'transparent',
                            }}
                        >
                            respuestas 😄
                        </span>
                    </h2>

                    <p
                        className="text-lg max-w-2xl mx-auto"
                        style={{
                            fontFamily: "'Inter', sans-serif",
                            color: '#FFF8F0',
                            opacity: 0.55,
                        }}
                    >
                        Todo lo que necesitás saber antes de pedir tu primer Hupit o unirte como aliado.
                    </p>
                </motion.div>

                {/* Tab Switcher */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="flex gap-3 p-1.5 rounded-2xl mb-10 mx-auto w-fit"
                    style={{
                        backgroundColor: 'rgba(255,255,255,0.05)',
                        border: '1px solid rgba(45,106,79,0.2)',
                    }}
                >
                    {(['usuarios', 'aliados'] as const).map((tab) => {
                        const isActive = activeTab === tab;
                        return (
                            <motion.button
                                key={tab}
                                onClick={() => handleTabChange(tab)}
                                whileHover={{ scale: 1.03 }}
                                whileTap={{ scale: 0.97 }}
                                className="relative flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-sm transition-colors duration-300"
                                style={{
                                    fontFamily: "'Inter', sans-serif",
                                    color: isActive ? '#1B1B2F' : '#FFF8F0',
                                    background: isActive
                                        ? tab === 'usuarios'
                                            ? 'linear-gradient(135deg, #F77F00, #FCBF49)'
                                            : 'linear-gradient(135deg, #2D6A4F, #40916C)'
                                        : 'transparent',
                                    opacity: isActive ? 1 : 0.5,
                                }}
                            >
                                {tab === 'usuarios' ? <Users size={16} /> : <Store size={16} />}
                                {tab === 'usuarios' ? 'Soy Usuario' : 'Soy Panadería'}
                            </motion.button>
                        );
                    })}
                </motion.div>

                {/* FAQ List */}
                <AnimatePresence mode="wait">
                    <motion.div
                        key={activeTab}
                        initial={{ opacity: 0, y: 15 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -15 }}
                        transition={{ duration: 0.3 }}
                        className="flex flex-col gap-3"
                    >
                        {faqs.map((faq, index) => (
                            <FAQItem
                                key={index}
                                index={index}
                                question={faq.question}
                                answer={faq.answer}
                                isOpen={openIndex === index}
                                onToggle={() => setOpenIndex(openIndex === index ? null : index)}
                                accentColor={accentColor}
                            />
                        ))}
                    </motion.div>
                </AnimatePresence>

                {/* Bottom CTA */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6, delay: 0.6 }}
                    className="mt-12 text-center p-8 rounded-2xl"
                    style={{
                        background: 'linear-gradient(135deg, rgba(45,106,79,0.1), rgba(247,127,0,0.06))',
                        border: '1px solid rgba(45,106,79,0.15)',
                    }}
                >
                    <p
                        className="mb-4 font-medium"
                        style={{ fontFamily: "'Inter', sans-serif", color: '#FFF8F0', opacity: 0.7 }}
                    >
                        ¿Tenés una pregunta diferente? Escríbenos 👋
                    </p>
                    <motion.a
                        href="mailto:hola@hupifood.co"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="inline-block px-7 py-3 rounded-xl font-semibold text-sm"
                        style={{
                            background: 'linear-gradient(135deg, #F77F00, #FCBF49)',
                            color: '#1B1B2F',
                            fontFamily: "'Inter', sans-serif",
                        }}
                    >
                        hola@hupifood.co
                    </motion.a>
                </motion.div>
            </div>
        </section>
    );
}
