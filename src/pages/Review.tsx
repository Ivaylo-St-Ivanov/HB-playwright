import React, { useCallback } from 'react';
import { motion } from 'framer-motion';

import { useLanguage } from '../context/LanguageContext';
import { useCountryFilter } from '../hooks/useCountryFilter';
import { useLocalizedData } from '../hooks/useLocalizedData';
import type { ReviewCountryData, ReviewCityData, LocalizedValue } from '../types/data';
import reviewsData from '../data/reviews.json';

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

    // Transform logic for reviews
    const transformReviewCity = useCallback((
        countryName: string,
        cityName: string,
        cityData: ReviewCityData,
        getLocalized: (val: LocalizedValue) => string
    ) => {
        const reviews = cityData.reviews.map((review) => ({
            title: getLocalized(review.title),
            text: review.text
        }));

        return [{
            country: countryName,
            city: cityName,
            reviews: reviews
        }];
    }, []);

    // Use the shared hook for data transformation
    const reviewItems = useLocalizedData<ReviewCountryData, ReviewCountry>(
        reviewsData as ReviewCountryData[],
        transformReviewCity
    );

    // Use the custom hook for filtering logic
    const {
        countries,
        itemsByCountry,
        selectedCountry,
        handleCountrySelect,
        countryRefs
    } = useCountryFilter<ReviewCountry>(
        reviewItems,
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
        <>
            <motion.div
                key={`${content.review.title}-filter`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.8 }}
            >
                <StickyCountryFilter
                    countries={countries}
                    selectedCountry={selectedCountry}
                    onSelect={handleCountrySelect}
                    placeholder={getPlaceholderText()}
                />
            </motion.div>

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
        </>
    );
};

export default Review;
