import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

import { useLanguage } from '../context/LanguageContext';

const Home: React.FC = () => {
    const { content } = useLanguage();
    const [showIntro, setShowIntro] = useState(false);

    useEffect(() => {
        document.body.classList.add('home-page-theme');
        return () => {
            document.body.classList.remove('home-page-theme');
        };
    }, []);

    useEffect(() => {
        const intervalDuration = showIntro ? 8000 : 3000; // 8s for intro, 3s for title
        const timer = setTimeout(() => {
            setShowIntro((prev) => !prev);
        }, intervalDuration);

        return () => clearTimeout(timer);
    }, [showIntro]);

    const variants = {
        enter: { opacity: 0, x: 70 },
        center: { opacity: 1, x: 0 },
        exit: { opacity: 0, x: -70 },
    };

    return (
        <div className="hero">
            <AnimatePresence mode="wait">
                {!showIntro ? (
                    <motion.div
                        key="title-group"
                        variants={variants}
                        initial="enter"
                        animate="center"
                        exit="exit"
                        transition={{ duration: 0.8 }}
                        style={{ position: 'absolute', width: '100%', padding: '0 1rem' }}
                    >
                        <h1 className="hero__title">{content.home.title}</h1>
                        <h2 className="hero__subtitle">{content.home.subtitle}</h2>
                    </motion.div>
                ) : (
                    <motion.div
                        key="intro-group"
                        variants={variants}
                        initial="enter"
                        animate="center"
                        exit="exit"
                        transition={{ duration: 0.8 }}
                        style={{ position: 'absolute', width: '100%', padding: '0 1rem' }}
                    >
                        <h3 style={{ maxWidth: '600px', margin: '0 auto', fontSize: '1.1rem' }}>
                            {content.home.intro}
                        </h3>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default Home;
