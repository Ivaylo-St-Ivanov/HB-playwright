import React, { createContext, useContext, useState, useEffect, type ReactNode } from 'react';

import contentData from '../data/content.json';

type Language = 'en' | 'bg' | 'es' | 'de' | 'ru';

interface LanguageContextType {
    language: Language;
    setLanguage: (lang: Language) => void;
    content: typeof contentData['en'];
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const LANGUAGE_STORAGE_KEY = 'hb-preferred-language';

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [language, setLanguage] = useState<Language>(() => {
        const savedLanguage = localStorage.getItem(LANGUAGE_STORAGE_KEY);
        return (savedLanguage as Language) || 'en';
    });

    useEffect(() => {
        localStorage.setItem(LANGUAGE_STORAGE_KEY, language);
    }, [language]);

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
