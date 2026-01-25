import React from 'react';
import { motion } from 'framer-motion';

import { useLanguage } from '../context/LanguageContext';

import hbLogo from '/favicon.png';

const Contact: React.FC = () => {
    const { content } = useLanguage();

    return (
        <div className="container">
            <motion.div
                className="contact-page"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8 }}
            >
                <img src={hbLogo} alt="Hristo Boytchev Logo" className="contact-page__logo" />
                <h1 style={{ opacity: '0' }}>{content.navbar.contact}</h1>
                <p style={{ marginTop: '1rem' }}>{content.contact.info}</p>
                <div className="contact-page__email">
                    <a href={`mailto:${content.contact.email}`}>{content.contact.email}</a>
                </div>
            </motion.div>
        </div>
    );
};

export default Contact;
