import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

import { useLanguage } from '../context/LanguageContext';

const BgFlag = () => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 750 480" width="24" height="16">
        <rect fill="#fff" width="750" height="480" />
        <rect fill="#00966e" y="160" width="750" height="160" />
        <rect fill="#d62612" y="320" width="750" height="160" />
    </svg>
);

const UkFlag = () => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 60 30" width="24" height="16">
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

const EsFlag = () => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 750 500" width="24" height="16">
        <rect width="750" height="500" fill="#c60b1e" />
        <rect width="750" height="250" y="125" fill="#ffc400" />
    </svg>
);

const DeFlag = () => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 5 3" width="24" height="16">
        <rect width="5" height="3" y="0" x="0" fill="#000" />
        <rect width="5" height="2" y="1" x="0" fill="#d00" />
        <rect width="5" height="1" y="2" x="0" fill="#ffce00" />
    </svg>
);

const LanguageSwitcher: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);
    const { language, setLanguage } = useLanguage();

    const languages = [
        { code: 'en', label: 'EN', Flag: UkFlag },
        { code: 'bg', label: 'BG', Flag: BgFlag },
        { code: 'es', label: 'ES', Flag: EsFlag },
        { code: 'de', label: 'DE', Flag: DeFlag },
    ] as const;

    const currentLang = languages.find(l => l.code === language) || languages[0];

    return (
        <div
            onMouseEnter={() => setIsOpen(true)}
            onMouseLeave={() => setIsOpen(false)}
            style={{
                position: 'relative',
                marginLeft: '1rem',
                zIndex: 50,
                height: '100%',
                display: 'flex',
                alignItems: 'center'
            }}
        >
            <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="language-switcher"
                style={{
                    background: 'transparent',
                    border: '1px solid currentColor',
                    color: 'inherit',
                    cursor: 'pointer',
                    borderRadius: '4px',
                    fontFamily: 'inherit',
                    fontSize: '0.9rem',
                    width: '3.5rem',
                    height: '1.8rem',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    gap: '0.4rem'
                }}
            >
                <currentLang.Flag />
                <span>{currentLang.label}</span>
            </motion.button>

            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.2 }}
                        style={{
                            position: 'absolute',
                            top: '100%',
                            right: 0,
                            background: 'var(--color-bg)',
                            border: '1px solid var(--color-border)',
                            borderRadius: '4px',
                            padding: '0.5rem',
                            display: 'flex',
                            flexDirection: 'column',
                            gap: '0.5rem',
                            boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
                            minWidth: '120px',
                            marginTop: '0.5rem'
                        }}
                    >
                        {languages.map((lang) => (
                            <motion.button
                                key={lang.code}
                                className="navbar__dropdown-item"
                                onClick={() => {
                                    setLanguage(lang.code as any);
                                    setIsOpen(false);
                                }}
                                whileHover={{
                                    scale: 1.04,
                                    backgroundColor: 'rgba(128, 128, 128, 0.1)'
                                }}
                                style={{
                                    background: 'transparent',
                                    border: 'none',
                                    // color: 'var(--color-text)', // Handled by CSS
                                    cursor: 'pointer',
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '0.8rem',
                                    padding: '0.4rem 0.6rem',
                                    borderRadius: '4px',
                                    width: '100%',
                                    textAlign: 'left',
                                    fontSize: '0.9rem'
                                }}
                            >
                                <lang.Flag />
                                <span>{lang.label}</span>
                            </motion.button>
                        ))}
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default LanguageSwitcher;
