import React, { useMemo } from 'react';
import { motion } from 'framer-motion';

import { useLanguage } from '../context/LanguageContext';

import StagingCard from '../components/StagingCard';

interface StagingItem {
    id: string;
    country: string;
    city: string;
    play: string;
    theater: string;
    premiere?: string;
    director?: string;
    actors?: string;
    images: string[];
}

const Staging: React.FC = () => {
    const { content } = useLanguage();

    // Group stagings by country
    const stagingsByCountry = useMemo(() => {
        return content.staging.items
            .reduce((acc: { [key: string]: StagingItem[] }, staging: StagingItem) => {
                const country = staging.country;
                if (!acc[country]) {
                    acc[country] = [];
                }
                acc[country].push(staging);
                return acc;
            }, {});
    }, [content.staging.items]);

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1
            }
        }
    };

    const itemVariants = {
        hidden: { y: 20, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1
        }
    };

    return (
        <motion.div
            className="staging-page"
            key={content.staging.title} // Force re-render on language change
            initial="hidden"
            animate="visible"
            variants={containerVariants}
        >
            <motion.h1 variants={itemVariants}>{content.staging.title}</motion.h1>

            {Object.entries(stagingsByCountry).map(([country, stagings]) => {
                // Use first staging's ID to create a stable key
                const countryKey = stagings[0]?.id.split('-')[0] || country;

                return (
                    <motion.div
                        key={countryKey}
                        className="country-section"
                        variants={itemVariants}
                    >
                        <h2 className="country-section__title">{country}</h2>
                        <div className="country-section__grid">
                            {stagings.map((staging) => (
                                <StagingCard
                                    key={staging.id}
                                    city={staging.city}
                                    theater={staging.theater}
                                    play={staging.play}
                                    premiere={staging.premiere || ''}
                                    director={staging.director || ''}
                                    actors={staging.actors || ''}
                                    image={staging.images && staging.images.length > 0
                                        ? staging.images[0]
                                        : undefined}
                                    premiereLabel={content.staging.premiere}
                                    directorLabel={content.staging.director}
                                    actorsLabel={content.staging.actors}
                                />
                            ))}
                        </div>
                    </motion.div>
                );
            })}
        </motion.div>
    );
};

export default Staging;
