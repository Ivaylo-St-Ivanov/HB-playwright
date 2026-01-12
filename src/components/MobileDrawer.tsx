import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

import { useLanguage } from '../context/LanguageContext';
import ThemeToggle from './ThemeToggle';
import LanguageSwitcher from './LanguageSwitcher';

interface MobileDrawerProps {
    isOpen: boolean;
    onClose: () => void;
}

const MobileDrawer: React.FC<MobileDrawerProps> = ({ isOpen, onClose }) => {
    const location = useLocation();
    const { content } = useLanguage();
    const [isAboutOpen, setIsAboutOpen] = useState(false);

    const isActive = (path: string) => location.pathname === path ? 'mobile-drawer__link--active' : '';

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    <motion.div
                        className="mobile-drawer__overlay"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={(e) => {
                            e.stopPropagation();
                            onClose();
                        }}
                    />
                    <motion.div
                        className="mobile-drawer"
                        initial={{ x: '100%' }}
                        animate={{ x: 0 }}
                        exit={{ x: '100%' }}
                        transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div className="mobile-drawer__header">
                            <ThemeToggle />
                            <LanguageSwitcher />
                            <button
                                className="mobile-drawer__close"
                                onClick={onClose}
                                aria-label="Close menu"
                            >
                                <span></span>
                                <span></span>
                                <span></span>
                            </button>
                        </div>

                        <div className="mobile-drawer__links">
                            <div className="mobile-drawer__accordion">
                                <button
                                    className={`mobile-drawer__link ${[
                                        '/biography',
                                        '/staging',
                                        '/festivals-and-prizes',
                                        '/review'
                                    ].includes(location.pathname)
                                        ? 'mobile-drawer__link--active'
                                        : ''
                                        }`}
                                    onClick={() => setIsAboutOpen(!isAboutOpen)}
                                >
                                    {content.navbar.aboutMe}
                                    <span
                                        className={`mobile-drawer__arrow ${isAboutOpen
                                            ? 'mobile-drawer__arrow--open'
                                            : ''
                                            }`}
                                    >
                                        ▼
                                    </span>
                                </button>
                                <AnimatePresence>
                                    {isAboutOpen && (
                                        <motion.div
                                            initial={{ height: 0, opacity: 0 }}
                                            animate={{ height: 'auto', opacity: 1 }}
                                            exit={{ height: 0, opacity: 0 }}
                                            className="mobile-drawer__sub-links"
                                        >
                                            {[
                                                { to: '/biography', label: content.navbar.aboutLinks.biography },
                                                { to: '/staging', label: content.navbar.aboutLinks.staging },
                                                { to: '/festivals-and-prizes', label: content.navbar.aboutLinks.festivalsAndPrizes },
                                                { to: '/review', label: content.navbar.aboutLinks.review },
                                            ].map((link) => (
                                                <Link
                                                    key={link.to}
                                                    to={link.to}
                                                    className="mobile-drawer__sub-link"
                                                    onClick={onClose}
                                                >
                                                    {link.label}
                                                </Link>
                                            ))}
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>

                            <Link
                                to="/plays"
                                className={`mobile-drawer__link ${isActive('/plays')}`}
                                onClick={onClose}
                            >
                                {content.navbar.plays}
                            </Link>
                            <Link
                                to="/contact"
                                className={`mobile-drawer__link ${isActive('/contact')}`}
                                onClick={onClose}
                            >
                                {content.navbar.contact}
                            </Link>
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
};

export default MobileDrawer;
