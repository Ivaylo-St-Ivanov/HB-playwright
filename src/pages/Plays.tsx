import React from 'react';
import { motion } from 'framer-motion';

import { useLanguage } from '../context/LanguageContext';
import plays from '../data/plays.json';

const Plays: React.FC = () => {
    const { language } = useLanguage();

    return (
        <div className="container">
            <motion.h1
                style={{ margin: '2rem 0', textAlign: 'center' }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
            >
                {language === 'en' ? 'Selected Plays' : 'Избрани пиеси'}
            </motion.h1>

            <div className="plays-grid">
                {plays.map((play, index) => (
                    <motion.div
                        key={play.id}
                        className="play-card"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                    >
                        <h3 className="play-card__title">
                            {play.title[language as keyof typeof play.title]}
                        </h3>
                        <div className="play-card__meta">
                            {play.year} | {play.genre[language as keyof typeof play.genre]}
                        </div>
                        <p className="play-card__desc">
                            {play.description[language as keyof typeof play.description]}
                        </p>
                        <div style={{ marginTop: '1rem' }}>
                            <span style={{ fontSize: '0.8rem', color: '#888' }}>
                                {language === 'en' ? 'Available in: ' : 'Налична на: '}
                                {play.languages.join(', ')}
                            </span>
                        </div>
                    </motion.div>
                ))}
            </div>
        </div>
    );
};

export default Plays;
