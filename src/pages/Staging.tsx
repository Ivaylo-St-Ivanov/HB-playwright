import React from 'react';
import { motion } from 'framer-motion';

import { useLanguage } from '../context/LanguageContext';
import { useCountryFilter } from '../hooks/useCountryFilter';

import StickyCountryFilter from '../components/StickyCountryFilter';
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

    // Use the custom hook for filtering logic
    const {
        countries,
        itemsByCountry,
        selectedCountry,
        handleCountrySelect,
        countryRefs
    } = useCountryFilter<StagingItem>(
        content.staging.items,
        content.staging.title
    );

    return (
        <>
            <motion.div
                key={`${content.staging.title}-filter`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.8 }}
            >
                <StickyCountryFilter
                    countries={countries}
                    selectedCountry={selectedCountry}
                    onSelect={handleCountrySelect}
                    placeholder={
                        content.staging.title === 'Staging' ? 'Select a country...' :
                            content.staging.title === 'Постановки' ? 'Изберете държава...' :
                                content.staging.title === 'Puesta en escena' ? 'Seleccione un país...' :
                                    'Land auswählen...'
                    }
                />
            </motion.div>

            <motion.div
                className="staging-page"
                key={content.staging.title} // Force re-render on language change
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.8 }}
            >
                <h1>{content.staging.title}</h1>

                {countries.map((country) => {
                    const stagings = itemsByCountry[country];
                    // Use first staging's ID to create a stable key
                    const countryKey = stagings[0]?.id.split('-')[0] || country;

                    return (
                        <div
                            key={countryKey}
                            ref={(el) => { countryRefs.current[country] = el; }}
                            className="country-section"
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
                        </div>
                    );
                })}
            </motion.div>
        </>
    );
};

export default Staging;
