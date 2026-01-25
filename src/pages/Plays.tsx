import React from 'react';
import { motion } from 'framer-motion';

import { useLanguage } from '../context/LanguageContext';
import plays from '../data/plays.json';

import PlayCard from '../components/PlayCard';

const Plays: React.FC = () => {
    const { language } = useLanguage();

    const handleLanguageClick = (playTitle: string, lang: string, downloadUrl?: string) => {
        if (!downloadUrl) {
            console.warn(`No download URL found for ${playTitle} - ${lang}`);
            return;
        }

        // Create a link element
        const link = document.createElement('a');
        link.href = downloadUrl;

        // Extract filename from URL for download attribute
        const filename = downloadUrl.split('/').pop() || 'document.doc';
        link.download = filename;

        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    return (
        <div className="container">
            <motion.h1
                style={{ margin: '2rem 0', textAlign: 'center' }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
            >
                {language === 'en' ? 'Selected Plays' : 'Избрани пиеси'}
            </motion.h1>

            <div className="plays-grid">
                {plays.map((play, index) => (
                    <PlayCard
                        key={play.id}
                        play={play}
                        language={language}
                        handleLanguageClick={handleLanguageClick}
                        index={index}
                    />
                ))}
            </div>
        </div>
    );
};

export default Plays;
