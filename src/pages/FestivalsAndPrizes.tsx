import React from 'react';
import { motion } from 'framer-motion';

import { useLanguage } from '../context/LanguageContext';

const FestivalsAndPrizes: React.FC = () => {
    const { content } = useLanguage();

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8 }}
            className="festivals-page"
        >
            <h1>{content.festivalsAndPrizes.title}</h1>

            <ul className="festivals-page__list">
                {content.festivalsAndPrizes.items.map((item, index) => (
                    <motion.li
                        key={index}
                        className="festivals-page__item"
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, amount: 0.3 }}
                        transition={{ duration: 0.8 }}
                    >
                        <div className="festivals-page__image-container">
                            <img src={item.image} alt={item.title} />
                        </div>
                        <div className="festivals-page__content">
                            <h3 className="festivals-page__title">{item.title}</h3>
                            <p className="festivals-page__text">{item.text}</p>
                        </div>
                    </motion.li>
                ))}
            </ul>
        </motion.div>
    );
};

export default FestivalsAndPrizes;
