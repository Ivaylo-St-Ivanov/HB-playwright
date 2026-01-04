import React, { useState } from 'react';
import { motion } from 'framer-motion';

import { useLanguage } from '../context/LanguageContext';
import plays from '../data/plays.json';

import PlayCard from '../components/PlayCard';
import PlayModal from '../components/PlayModal';

const Plays: React.FC = () => {
    const { language } = useLanguage();
    const [selectedPlay, setSelectedPlay] = useState<string | null>(null);
    const [selectedLang, setSelectedLang] = useState<string | null>(null);
    const [selectedFullText, setSelectedFullText] = useState<string | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleLanguageClick = (playTitle: string, lang: string, fullText: string) => {
        setSelectedPlay(playTitle);
        setSelectedLang(lang);
        setSelectedFullText(fullText);
        setIsModalOpen(true);
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

            <PlayModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                playTitle={selectedPlay || ''}
                languageName={selectedLang || ''}
                fullText={selectedFullText || ''}
            />
        </div>
    );
};

export default Plays;
