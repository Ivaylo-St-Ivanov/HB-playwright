import React from 'react';
import { motion } from 'framer-motion';

import { useLanguage } from '../context/LanguageContext';

const Biography: React.FC = () => {
    const { content } = useLanguage();

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8 }}
            className="biography-page"
        >
            <div className="biography-page__image-container">
                <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTLSq8zHdyl63jSSohx9FCaFosALmrXjm6g3ZK5T39bVkejJnkwpP1kBJm4Akc_-QF4wuSIHg&s" alt="Hristo Boytchev" />
            </div>

            <h1>{content.biography.title}</h1>

            <ul className="biography-page__timeline">
                {content.biography.events.map((event, index) => (
                    <motion.li
                        key={index}
                        className="biography-page__item"
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, amount: 0.3 }}
                        transition={{ duration: 0.8, delay: index * 0.05 }}
                    >
                        <span className="biography-page__year">{event.year}</span>
                        <span className="biography-page__text">{event.text}</span>
                    </motion.li>
                ))}
            </ul>

            <div style={{ marginTop: '2rem' }}>
                <p className="biography-page__text">{content.biography.additionalInfo}</p>
            </div>
        </motion.div>
    );
};

export default Biography;
