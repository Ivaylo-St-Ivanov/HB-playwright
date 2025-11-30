import React, { useState } from 'react';
import { motion } from 'framer-motion';

import { useLanguage } from '../context/LanguageContext';

const BgFlag = () => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 480" width="24" height="15">
        <rect fill="#fff" width="640" height="480" />
        <rect fill="#00966e" y="160" width="640" height="160" />
        <rect fill="#d62612" y="320" width="640" height="160" />
    </svg>
);

const UkFlag = () => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 60 30" width="24" height="12">
        <clipPath id="t">
            <path d="M30,15h30v15zv15h-30zh-30v-15zv-15h30z" />
        </clipPath>
        <path d="M0,0v30h60v-30z" fill="#00247d" />
        <path d="M0,0l60,30m0-30l-60,30" stroke="#fff" strokeWidth="6" />
        <path d="M0,0l60,30m0-30l-60,30" clipPath="url(#t)" stroke="#cf142b" strokeWidth="4" />
        <path d="M30,0v30m-30-15h60" stroke="#fff" strokeWidth="10" />
        <path d="M30,0v30m-30-15h60" stroke="#cf142b" strokeWidth="6" />
    </svg>
);

const LanguageSwitcher: React.FC = () => {
    const [isHovered, setIsHovered] = useState(false);
    const { language, toggleLanguage } = useLanguage();

    return (
        <motion.button
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            onClick={toggleLanguage}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="language-switcher"
            style={{
                background: 'transparent',
                border: '1px solid currentColor',
                color: 'inherit',
                // padding: 0, // Remove padding as we use fixed dimensions
                cursor: 'pointer',
                borderRadius: '4px',
                fontFamily: 'inherit',
                fontSize: '0.9rem',
                marginLeft: '1rem',
                width: '2.5rem', // Fixed width
                height: '1.5rem', // Fixed height
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center'
            }}
        >
            {isHovered
                ? (language === 'en' ? <BgFlag /> : <UkFlag />)
                : (language === 'en' ? 'BG' : 'EN')
            }
        </motion.button>
    );
};

export default LanguageSwitcher;
