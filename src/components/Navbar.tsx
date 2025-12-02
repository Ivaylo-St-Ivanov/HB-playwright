import React from 'react';
import { Link, useLocation } from 'react-router-dom';

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
                        style={{ position: 'relative', display: 'inline-block' }}
                    >
                        <span
                            className={`navbar__link ${['/biography', '/staging', '/festivals-and-prizes', '/review'].includes(location.pathname)
                                ? 'navbar__link--active' : ''
                                }`}
                            style={{ cursor: 'pointer' }}
                        >
                            {content.navbar.aboutMe}
                        </span>
                        {isAboutOpen && (
                            <div
                                className="navbar__dropdown-menu"
                                style={{
                                    position: 'absolute',
                                    top: '100%',
                                    left: '50%',
                                    transform: 'translateX(-50%)',
                                    backgroundColor: 'rgba(0, 0, 0, 0.4)',
                                    backdropFilter: 'blur(10px)',
                                    WebkitBackdropFilter: 'blur(10px)',
                                    border: '1px solid var(--text-color)',
                                    borderRadius: '0.25rem',
                                    padding: '0.5rem',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    textAlign: 'center',
                                    gap: '0.75rem',
                                    minWidth: '150px',
                                    zIndex: 100
                                }}
                            >
                                <Link to="/biography" className="navbar__link navbar__link--dropdown" onClick={() => setIsAboutOpen(false)}>
                                    {content.navbar.aboutLinks.biography}
                                </Link>
                                <Link to="/staging" className="navbar__link navbar__link--dropdown" onClick={() => setIsAboutOpen(false)}>
                                    {content.navbar.aboutLinks.staging}
                                </Link>
                                <Link to="/festivals-and-prizes" className="navbar__link navbar__link--dropdown" onClick={() => setIsAboutOpen(false)}>
                                    {content.navbar.aboutLinks.festivalsAndPrizes}
                                </Link>
                                <Link to="/review" className="navbar__link navbar__link--dropdown" onClick={() => setIsAboutOpen(false)}>
                                    {content.navbar.aboutLinks.review}
                                </Link>
                            </div>
                        )}
                    </div>

                    <Link to="/plays" className={`navbar__link ${isActive('/plays')}`}>{content.navbar.plays}</Link>
                    <Link to="/contact" className={`navbar__link ${isActive('/contact')}`}>{content.navbar.contact}</Link>

                    <ThemeToggle />
                    <LanguageSwitcher />
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
