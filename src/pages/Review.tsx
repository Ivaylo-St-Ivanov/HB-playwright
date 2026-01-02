import React from 'react';
import { motion } from 'framer-motion';

import { useLanguage } from '../context/LanguageContext';
import { useCountryFilter } from '../hooks/useCountryFilter';
import StickyCountryFilter from '../components/StickyCountryFilter';

interface ReviewItem {
    title: string;
    text: string;
}

interface ReviewCountry {
    country: string;
    city: string;
    reviews: ReviewItem[];
}

const Review: React.FC = () => {
    const { content } = useLanguage();

    // Use the custom hook for filtering logic
    // We need to cast items to ReviewCountry[] because the JSON structure might be inferred loosely
    const {
        countries,
        itemsByCountry,
        selectedCountry,
        handleCountryChange,
        countryRefs
    } = useCountryFilter<ReviewCountry>(
        content.review.items as unknown as ReviewCountry[],
        content.review.title
    );

    const getPlaceholderText = () => {
        const title = content.review.title;
        if (title === 'Рецензии') return 'Изберете държава...';
        if (title === 'Reseñas') return 'Seleccione un país...';
        if (title === 'Rezensionen') return 'Land auswählen...';
        return 'Select a country...';
    };

    return (
        <motion.div
            className="review-page"
            key={content.review.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8 }}
        >
            <h1>{content.review.title}</h1>
            <p className="review-page__subtitle">{content.review.subtitle}</p>

            <StickyCountryFilter
                countries={countries}
                selectedCountry={selectedCountry}
                onChange={handleCountryChange}
                placeholder={getPlaceholderText()}
            />

            {countries.map((country) => {
                const countryItems = itemsByCountry[country];
                return (
                    <div
                        key={country}
                        ref={(el) => { countryRefs.current[country] = el; }}
                        className="country-section"
                    >
                        <h2 className="country-section__title">{country}</h2>
                        <div className="country-section__content">
                            {countryItems.map((item, index) => (
                                <div key={index} className="city-block">
                                    <h3 className="city-block__title">{item.city}</h3>
                                    {item.reviews.map((review, rIndex) => (
                                        <div key={rIndex} className="review-item">
                                            {review.title && <h4>{review.title}</h4>}
                                            <p className="review-item__text">{review.text}</p>
                                        </div>
                                    ))}
                                </div>
                            ))}
                        </div>
                    </div>
                );
            })}
        </motion.div>
    );
};

export default Review;
