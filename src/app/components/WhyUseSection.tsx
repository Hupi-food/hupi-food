import { motion, useInView } from 'motion/react';
import { useRef } from 'react';
import imgFoodBag from '../../assets/food-bag.png';

const foodCategories = [
    'PAN ARTESANAL',
    'CROISSANTS',
    'POSTRES',
    'BUÑUELOS',
    'PANDEBONO',
    'CAFÉ',
    'GALLETAS',
    'TORTAS',
    'EMPANADAS',
    'ALMOJÁBANAS',
    'JUGOS',
    'BROWNIES',
];

function InfiniteTicker() {
    const items = [...foodCategories, ...foodCategories];

    return (
        <div
            className="relative overflow-hidden py-5"
            style={{ backgroundColor: '#1B1B2F' }}
        >
            <motion.div
                className="flex gap-12 whitespace-nowrap"
                animate={{ x: ['0%', '-50%'] }}
                transition={{
                    x: {
                        duration: 25,
                        repeat: Infinity,
                        ease: 'linear',
                    },
                }}
            >
                {items.map((item, i) => (
                    <span
                        key={i}
                        className="text-2xl sm:text-3xl font-black tracking-wider"
                        style={{
                            fontFamily: "'Outfit', sans-serif",
                            color: i % 2 === 0 ? '#F77F00' : '#FFF8F0',
                            opacity: i % 2 === 0 ? 1 : 0.5,
                        }}
                    >
                        {item}
                    </span>
                ))}
            </motion.div>
        </div>
    );
}

export function WhyUseSection() {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: '-100px' });

    const benefits = [
        {
            icon: (
                <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
                    <rect width="40" height="40" rx="12" fill="rgba(45,106,79,0.12)" />
                    <path
                        d="M14 26L12 18h16l-2 8H14z"
                        stroke="#2D6A4F"
                        strokeWidth="1.8"
                        strokeLinejoin="round"
                    />
                    <path d="M12 18l2-4h12l2 4" stroke="#2D6A4F" strokeWidth="1.8" />
                    <path d="M20 22v2" stroke="#2D6A4F" strokeWidth="1.8" strokeLinecap="round" />
                </svg>
            ),
            title: 'Comida a mitad de precio',
            description: 'Disfruta de buena comida por la mitad del precio original (o menos)',
        },
        {
            icon: (
                <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
                    <rect width="40" height="40" rx="12" fill="rgba(45,106,79,0.12)" />
                    <path
                        d="M20 12c-4.418 0-8 3.134-8 7 0 5.25 8 13 8 13s8-7.75 8-13c0-3.866-3.582-7-8-7z"
                        stroke="#2D6A4F"
                        strokeWidth="1.8"
                    />
                    <circle cx="20" cy="19" r="2.5" stroke="#2D6A4F" strokeWidth="1.8" />
                </svg>
            ),
            title: 'Rescata comida cerca de ti',
            description: 'Encuentra panaderías y restaurantes cerca a tu barrio',
        },
        {
            icon: (
                <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
                    <rect width="40" height="40" rx="12" fill="rgba(45,106,79,0.12)" />
                    <circle cx="20" cy="20" r="8" stroke="#2D6A4F" strokeWidth="1.8" />
                    <path
                        d="M14 20c0-2 2.5-4 6-4s6 2 6 4"
                        stroke="#2D6A4F"
                        strokeWidth="1.5"
                    />
                    <path d="M20 12v1M20 27v1" stroke="#2D6A4F" strokeWidth="1.5" strokeLinecap="round" />
                </svg>
            ),
            title: 'Ayuda al medio ambiente',
            description: 'Reduciendo el desperdicio de alimentos cuidas nuestro planeta',
        },
        {
            icon: (
                <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
                    <rect width="40" height="40" rx="12" fill="rgba(45,106,79,0.12)" />
                    <rect x="13" y="16" width="14" height="10" rx="2" stroke="#2D6A4F" strokeWidth="1.8" />
                    <path d="M17 16v-2a3 3 0 016 0v2" stroke="#2D6A4F" strokeWidth="1.8" />
                    <path d="M20 20v3" stroke="#2D6A4F" strokeWidth="1.8" strokeLinecap="round" />
                </svg>
            ),
            title: 'Prueba nuevas panaderías',
            description: 'Descubre cafeterías, panaderías y restaurantes locales de tu zona',
        },
    ];

    return (
        <>
            {/* Ticker */}
            <InfiniteTicker />

            {/* Why Use Section */}
            <section
                ref={ref}
                id="por-que"
                className="py-24 sm:py-32 px-6 sm:px-8 lg:px-12 relative overflow-hidden"
                style={{ backgroundColor: '#FFF8F0' }}
            >
                <div className="max-w-7xl mx-auto relative z-10">
                    {/* Header */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={isInView ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.8 }}
                        className="text-center mb-16"
                    >
                        <h2
                            className="text-4xl sm:text-5xl lg:text-6xl mb-4 font-black tracking-tight"
                            style={{
                                fontFamily: "'Outfit', sans-serif",
                                color: '#1B1B2F',
                                lineHeight: '1.1',
                                textTransform: 'uppercase',
                            }}
                        >
                            Por qué usar
                        </h2>
                        <h3
                            className="text-4xl sm:text-5xl lg:text-6xl font-bold italic"
                            style={{
                                fontFamily: "'Georgia', serif",
                                color: '#2D6A4F',
                                lineHeight: '1.1',
                            }}
                        >
                            Hupi-food
                        </h3>
                    </motion.div>

                    <div className="grid lg:grid-cols-2 gap-16 items-center">
                        {/* Left: Benefits Grid */}
                        <motion.div
                            initial={{ opacity: 0, x: -30 }}
                            animate={isInView ? { opacity: 1, x: 0 } : {}}
                            transition={{ duration: 0.8, delay: 0.2 }}
                            className="grid grid-cols-2 gap-6"
                        >
                            {benefits.map((benefit, index) => (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                                    transition={{ duration: 0.5, delay: 0.3 + index * 0.12 }}
                                    whileHover={{ y: -5, scale: 1.03 }}
                                    className="text-center p-5"
                                >
                                    <div className="flex justify-center mb-4">{benefit.icon}</div>
                                    <h4
                                        className="text-base sm:text-lg font-black mb-2 uppercase tracking-wide"
                                        style={{
                                            fontFamily: "'Outfit', sans-serif",
                                            color: '#1B1B2F',
                                            fontSize: '0.85rem',
                                        }}
                                    >
                                        {benefit.title}
                                    </h4>
                                    <p
                                        className="text-sm leading-relaxed"
                                        style={{
                                            fontFamily: "'Inter', sans-serif",
                                            color: '#1B1B2F',
                                            opacity: 0.6,
                                        }}
                                    >
                                        {benefit.description}
                                    </p>
                                </motion.div>
                            ))}
                        </motion.div>

                        {/* Right: Food Bag Image */}
                        <motion.div
                            initial={{ opacity: 0, x: 30 }}
                            animate={isInView ? { opacity: 1, x: 0 } : {}}
                            transition={{ duration: 0.8, delay: 0.3 }}
                            className="relative"
                        >
                            <motion.div
                                whileHover={{ scale: 1.02 }}
                                transition={{ duration: 0.3 }}
                                className="relative overflow-hidden rounded-3xl"
                            >
                                <img
                                    src={imgFoodBag}
                                    alt="Bolsa Hupi-food con pan artesanal colombiano"
                                    className="w-full h-auto object-cover rounded-3xl"
                                    style={{
                                        boxShadow: '0 20px 60px rgba(0,0,0,0.15)',
                                    }}
                                />
                            </motion.div>
                        </motion.div>
                    </div>
                </div>
            </section>
        </>
    );
}
