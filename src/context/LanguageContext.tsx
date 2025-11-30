import React, { createContext, useContext, useState, type ReactNode } from 'react';

import contentData from '../data/content.json';

type Language = 'en' | 'bg';

interface LanguageContextType {
    language: Language;
    toggleLanguage: () => void;
    content: typeof contentData['en'];
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [language, setLanguage] = useState<Language>('en');

    const toggleLanguage = () => {
        setLanguage((prev) => (prev === 'en' ? 'bg' : 'en'));
    };

    const content = contentData[language];

    return (
        <LanguageContext.Provider value={{ language, toggleLanguage, content }}>
            {children}
        </LanguageContext.Provider>
    );
};

export const useLanguage = () => {
    const context = useContext(LanguageContext);
    if (!context) {
        throw new Error('useLanguage must be used within a LanguageProvider');
    }
    return context;
};
