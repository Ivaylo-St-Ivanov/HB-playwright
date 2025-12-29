import React, { useMemo, useState, useRef, useEffect } from 'react';
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
    const [selectedCountry, setSelectedCountry] = useState<string>('');
    const countryRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});

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

    // Get sorted list of countries
    const countries = useMemo(() => {
        return Object.keys(stagingsByCountry).sort();
    }, [stagingsByCountry]);

    // Reset selected country when language changes
    useEffect(() => {
        setSelectedCountry('');
    }, [content.staging.title]);

    // Handle country selection and scroll
    const handleCountryChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const country = event.target.value;
        setSelectedCountry(country);

        if (country && countryRefs.current[country]) {
            countryRefs.current[country]?.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    };

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

            {/* Sticky Country Filter */}
            {countries.length > 0 && (
                <motion.div
                    className="staging-page__filter"
                    variants={itemVariants}
                >
                    <select
                        className="staging-page__dropdown"
                        value={selectedCountry}
                        onChange={handleCountryChange}
                    >
                        <option value="">
                            {content.staging.title === 'Staging' ? 'Select a country...' :
                                content.staging.title === 'Постановки' ? 'Изберете държава...' :
                                    content.staging.title === 'Puesta en escena' ? 'Seleccione un país...' :
                                        'Land auswählen...'}
                        </option>
                        {countries.map((country) => (
                            <option key={country} value={country}>
                                {country}
                            </option>
                        ))}
                    </select>
                </motion.div>
            )}

            {countries.map((country) => {
                const stagings = stagingsByCountry[country];
                // Use first staging's ID to create a stable key
                const countryKey = stagings[0]?.id.split('-')[0] || country;

                return (
                    <motion.div
                        key={countryKey}
                        ref={(el) => { countryRefs.current[country] = el; }}
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
