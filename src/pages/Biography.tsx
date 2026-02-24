import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

import { useLanguage } from '../context/LanguageContext';
import { fetchBiographyEvents, fetchBiographyInfo } from '../services/parseService';

import LoadingSpinner from '../components/LoadingSpinner';
import ErrorMessage from '../components/ErrorMessage';

const Biography: React.FC = () => {
    const { language, content } = useLanguage();

    const [events, setEvents] = useState<any[]>([]);
    const [additionalInfo, setAdditionalInfo] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const loadBiography = async () => {
            try {
                setLoading(true);
                const [eventsData, infoData] = await Promise.all([
                    fetchBiographyEvents(),
                    fetchBiographyInfo()
                ]);

                setEvents(eventsData);
                setAdditionalInfo(infoData);
                setError(null);
            } catch (err: any) {
                console.error('Error loading biography:', err);
                setError('LOAD_ERROR');
            } finally {
                setLoading(false);
            }
        };

        loadBiography();
    }, []);

    // Helper to get text based on current language
    const getLocalizedText = (item: any, prefix = 'text_') => {
        if (!item) return '';
        return item[`${prefix}${language}`] || item[`${prefix}en`] || '';
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
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8 }}
            className="biography-page"
        >
            <div className="biography-page__image-container">
                <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTLSq8zHdyl63jSSohx9FCaFosALmrXjm6g3ZK5T39bVkejJnkwpP1kBJm4Akc_-QF4wuSIHg&s" alt="Hristo Boytchev" />
            </div>

            <h1>{content.biography.title}</h1>

            <ul className="biography-page__timeline">
                {events.map((event, index) => (
                    <motion.li
                        key={event.id || index}
                        className="biography-page__item"
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, amount: 0.3 }}
                        transition={{ duration: 0.8, delay: index * 0.05 }}
                    >
                        <span className="biography-page__year">{event.year}</span>
                        <span className="biography-page__text">{getLocalizedText(event)}</span>
                    </motion.li>
                ))}
            </ul>

            <div style={{ marginTop: '2rem' }}>
                <p className="biography-page__text">{getLocalizedText(additionalInfo)}</p>
            </div>
        </motion.div>
    );
};

export default Biography;
