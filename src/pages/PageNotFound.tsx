import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

import { useLanguage } from '../context/LanguageContext';
import theaterImg from '../assets/404_theater_stage.png';

const PageNotFound: React.FC = () => {
    const { content } = useLanguage();
    const navigate = useNavigate();

    return (
        <motion.div
            className="page-not-found"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6 }}
        >
            {/* Background image with overlay */}
            <div className="page-not-found__bg">
                <img src={theaterImg} alt="Empty theater stage" className="page-not-found__bg-img" />
                <div className="page-not-found__overlay" />
            </div>

            {/* Content */}
            <div className="page-not-found__content">
                <motion.h1
                    className="page-not-found__code"
                    initial={{ opacity: 0, y: -30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7, delay: 0.2 }}
                >
                    {content.pageNotFound?.title || '404'}
                </motion.h1>

                <motion.h2
                    className="page-not-found__title"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7, delay: 0.4 }}
                >
                    {content.pageNotFound?.subtitle || 'Page Not Found'}
                </motion.h2>

                <motion.p
                    className="page-not-found__text"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.7, delay: 0.6 }}
                >
                    {content.pageNotFound?.text || 'The page you are looking for does not exist.'}
                </motion.p>

                <motion.button
                    className="page-not-found__btn"
                    onClick={() => navigate(-1)}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, delay: 0.8 }}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.97 }}
                >
                    ← {content.pageNotFound?.back || 'Go Back'}
                </motion.button>
            </div>
        </motion.div>
    );
};

export default PageNotFound;
