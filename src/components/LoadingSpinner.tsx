import React from 'react';

import { useLanguage } from '../context/LanguageContext';

interface LoadingSpinnerProps {
    text?: string; // Optional custom text
}

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({ text }) => {
    const { language } = useLanguage();

    const getDefaultText = () => {
        if (language === 'en') return 'Loading...';
        if (language === 'bg') return 'Зареждане...';
        if (language === 'es') return 'Cargando...';
        if (language === 'de') return 'Wird geladen...';
        return 'Loading...';
    };

    return (
        <div className="loading-container">
            <div className="spinner"></div>
            <p className="loading-text">
                {text || getDefaultText()}
            </p>
        </div>
    );
};

export default LoadingSpinner;
