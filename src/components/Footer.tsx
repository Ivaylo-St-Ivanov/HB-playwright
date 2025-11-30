import React from 'react';

import { useLanguage } from '../context/LanguageContext';

const Footer: React.FC = () => {
    const { content } = useLanguage();

    return (
        <footer className="footer">
            <p>&copy; {new Date().getFullYear()} {content.footer.copyright}</p>
        </footer>
    );
};

export default Footer;
