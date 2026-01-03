import { useState, useRef, useMemo, useEffect } from 'react';

interface ItemWithCountry {
    country: string;
    [key: string]: any;
}

export const useCountryFilter = <T extends ItemWithCountry>(
    items: T[],
    resetDependency: any
) => {
    const [selectedCountry, setSelectedCountry] = useState<string>('');
    const countryRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});

    // Group items by country
    const itemsByCountry = useMemo(() => {
        const grouped: { [key: string]: T[] } = {};
        items.forEach((item) => {
            if (!grouped[item.country]) {
                grouped[item.country] = [];
            }
            grouped[item.country].push(item);
        });
        return grouped;
    }, [items]);

    // Get sorted list of countries
    const countries = useMemo(() => {
        return Object.keys(itemsByCountry).sort();
    }, [itemsByCountry]);

    // Reset selected country when dependency changes (e.g. language)
    useEffect(() => {
        setSelectedCountry('');
    }, [resetDependency]);

    // Handle country selection and scroll
    const handleCountrySelect = (country: string) => {
        setSelectedCountry(country);

        if (country && countryRefs.current[country]) {
            countryRefs.current[country]?.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    };

    return {
        countries,
        itemsByCountry,
        selectedCountry,
        handleCountrySelect,
        countryRefs
    };
};
