import React, { createContext, useContext, useState, type ReactNode } from 'react';

import contentData from '../data/content.json';

type Language = 'en' | 'bg' | 'es';

interface LanguageContextType {
    language: Language;
    setLanguage: (lang: Language) => void;
    content: typeof contentData['en'];
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [language, setLanguage] = useState<Language>('en');

    const content = contentData[language];

    return (
        <LanguageContext.Provider value={{ language, setLanguage, content }}>
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
