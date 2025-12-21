import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

import { useLanguage } from '../context/LanguageContext';

import ThemeToggle from './ThemeToggle';
import LanguageSwitcher from './LanguageSwitcher';

const Navbar: React.FC = () => {
    const location = useLocation();
    const { content } = useLanguage();
    const [isAboutOpen, setIsAboutOpen] = React.useState(false);

    const isActive = (path: string) => location.pathname === path ? 'navbar__link--active' : '';

    return (
        <nav className="navbar">
            <div className="navbar__container">
                {location.pathname !== '/' && (
                    <Link to="/" className="navbar__logo">
                        {content.navbar.logo}
                    </Link>
                )}

                <div className="navbar__links">
                    <div
                        className="navbar__dropdown-container"
                        onMouseEnter={() => setIsAboutOpen(true)}
                        onMouseLeave={() => setIsAboutOpen(false)}
                        style={{
                            position: 'relative',
                            height: '100%',
                            display: 'flex',
                            alignItems: 'center'
                        }}
                    >
                        <span
                            className={`navbar__link ${[
                                '/biography',
                                '/staging',
                                '/festivals-and-prizes',
                                '/review'
                            ].includes(location.pathname)
                                ? 'navbar__link--active'
                                : ''
                                }`}
                            style={{
                                cursor: 'pointer',
                                display: 'flex',
                                alignItems: 'center',
                                height: '100%'
                            }}
                        >
                            {content.navbar.aboutMe}
                        </span>
                        <AnimatePresence>
                            {isAboutOpen && (
                                <motion.div
                                    className="navbar__dropdown-menu"
                                    initial={{ opacity: 0, y: -10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -10 }}
                                    transition={{ duration: 0.2 }}
                                    style={{
                                        position: 'absolute',
                                        top: '100%',
                                        left: '50%',
                                        transform: 'translateX(-50%)',
                                        backgroundColor: 'var(--color-bg)',
                                        border: '1px solid var(--color-border)',
                                        borderRadius: '4px',
                                        padding: '0.5rem',
                                        display: 'flex',
                                        flexDirection: 'column',
                                        gap: '0.5rem',
                                        boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
                                        minWidth: '180px',
                                        zIndex: 100,
                                        marginTop: '0.5rem'
                                    }}
                                >
                                    {[
                                        {
                                            to: '/biography',
                                            label: content.navbar.aboutLinks.biography
                                        },
                                        {
                                            to: '/staging',
                                            label: content.navbar.aboutLinks.staging
                                        },
                                        {
                                            to: '/festivals-and-prizes',
                                            label: content.navbar.aboutLinks.festivalsAndPrizes
                                        },
                                        {
                                            to: '/review',
                                            label: content.navbar.aboutLinks.review
                                        },
                                    ].map((link) => (
                                        <Link
                                            key={link.to}
                                            to={link.to}
                                            onClick={() => setIsAboutOpen(false)}
                                            style={{ textDecoration: 'none', color: 'inherit' }}
                                        >
                                            <motion.div
                                                className="navbar__dropdown-item"
                                                whileHover={{
                                                    scale: 1.04,
                                                    backgroundColor: 'rgba(128, 128, 128, 0.1)'
                                                }}
                                                style={{
                                                    padding: '0.4rem 0.6rem',
                                                    borderRadius: '4px',
                                                    width: '100%',
                                                    textAlign: 'left',
                                                    fontSize: '0.9rem',
                                                    // color: 'var(--color-text)', // Handled by CSS
                                                    whiteSpace: 'nowrap'
                                                }}
                                            >
                                                {link.label}
                                            </motion.div>
                                        </Link>
                                    ))}
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>

                    <Link
                        to="/plays"
                        className={`navbar__link ${isActive('/plays')}`}
                    >
                        {content.navbar.plays}
                    </Link>
                    <Link
                        to="/contact"
                        className={`navbar__link ${isActive('/contact')}`}
                    >
                        {content.navbar.contact}
                    </Link>

                    {location.pathname !== '/' && <ThemeToggle />}

                    <LanguageSwitcher />
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
