import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

import { useLanguage } from '../context/LanguageContext';
import { fetchPlays } from '../services/parseService';

import LoadingSpinner from '../components/LoadingSpinner';
import ErrorMessage from '../components/ErrorMessage';
import PlayCard from '../components/PlayCard';

const Plays: React.FC = () => {
    const { language } = useLanguage();
    const [plays, setPlays] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const loadPlays = async () => {
            try {
                setLoading(true);
                const data = await fetchPlays();
                setPlays(data);
                setError(null);
            } catch (err: any) {
                console.error('Error loading plays:', err);
                setError('LOAD_ERROR');
            } finally {
                setLoading(false);
            }
        };

        loadPlays();
    }, []);

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

    if (loading) {
        return (
            <div className="container">
                <LoadingSpinner />
            </div>
        );
    }

    if (error) {
        return (
            <div className="container">
                <ErrorMessage />
            </div>
        );
    }

    return (
        <div className="container">
            <motion.h1
                style={{ margin: '2rem 0', textAlign: 'center' }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
            >
                {language === 'en' && 'Selected Plays'}
                {language === 'bg' && 'Избрани пиеси'}
                {language === 'es' && 'Obras Seleccionadas'}
                {language === 'de' && 'Ausgewählte Stücke'}
            </motion.h1>

            <div className="plays-grid">
                {plays.map((play, index) => (
                    <PlayCard
                        key={play.objectId || play.playId}
                        play={{
                            id: play.playId,
                            title: play.title,
                            year: play.year,
                            genre: play.genre,
                            description: play.description,
                            languages: play.languages
                        }}
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
