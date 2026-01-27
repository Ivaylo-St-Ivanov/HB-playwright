import React from 'react';

import { useLanguage } from '../context/LanguageContext';

interface ErrorMessageProps {
    message?: string; // Optional custom message
}

const ErrorMessage: React.FC<ErrorMessageProps> = ({ message }) => {
    const { language } = useLanguage();

    const getDefaultMessage = () => {
        if (language === 'en') return 'Failed to load data. Please try again later.';
        if (language === 'bg') return 'Грешка при зареждане на данните. Моля опитайте отново по-късно.';
        if (language === 'es') return 'Error al cargar los datos. Por favor, inténtelo de nuevo más tarde.';
        if (language === 'de') return 'Fehler beim Laden der Daten. Bitte versuchen Sie es später noch einmal.';
        return 'Failed to load data. Please try again later.';
    };

    return (
        <div className="error-container">
            <div className="error-icon">⚠️</div>
            <p className="error-text">
                {message || getDefaultMessage()}
            </p>
        </div>
    );
};

export default ErrorMessage;
