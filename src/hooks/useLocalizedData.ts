import { useMemo } from 'react';

import type { LocalizedValue } from '../types/data';
import { useLanguage } from '../context/LanguageContext';

// Helper to resolve localized value
export const getLocalizedValue = (value: LocalizedValue | undefined, language: string): string => {
    if (!value) return '';
    if (typeof value === 'string') return value;
    return value[language] || value['en'] || '';
};

export function useLocalizedData<TRawCountry extends { country: LocalizedValue, cities: any[] }, TOutputItem>(
    data: TRawCountry[],
    transformCity: (countryName: string, cityName: string, cityData: any, getLocalized: (val: LocalizedValue) => string) => TOutputItem[]
) {
    const { language } = useLanguage();

    return useMemo(() => {
        const items: TOutputItem[] = [];

        const getLocalized = (val: LocalizedValue) => getLocalizedValue(val, language);

        data.forEach((countryData) => {
            const countryName = getLocalized(countryData.country);

            countryData.cities.forEach((cityData) => {
                const cityName = getLocalized(cityData.name);
                const transformedItems = transformCity(countryName, cityName, cityData, getLocalized);
                items.push(...transformedItems);
            });
        });

        return items;
    }, [data, language, transformCity]);
}
