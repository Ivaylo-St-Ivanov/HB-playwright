import React from 'react';
import { motion } from 'framer-motion';

import { useLanguage } from '../context/LanguageContext';

const Home: React.FC = () => {
    const { content } = useLanguage();

    return (
        <div className="hero">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
            >
                <h1 className="hero__title">{content.home.title}</h1>
                <h2 className="hero__subtitle">{content.home.subtitle}</h2>
                {/* <p style={{ maxWidth: '600px', margin: '0 auto', fontSize: '1.1rem' }}>
                    {content.home.intro}
                </p> */}
            </motion.div>
        </div>
    );
};

export default Home;
