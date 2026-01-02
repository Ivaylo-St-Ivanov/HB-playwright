import React from 'react';

interface StickyCountryFilterProps {
    countries: string[];
    selectedCountry: string;
    onChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
    placeholder: string;
}

const StickyCountryFilter: React.FC<StickyCountryFilterProps> = ({
    countries,
    selectedCountry,
    onChange,
    placeholder
}) => {
    if (countries.length === 0) return null;

    return (
        <div className="sticky-filter">
            <select
                className="sticky-filter__dropdown"
                value={selectedCountry}
                onChange={onChange}
            >
                <option value="">{placeholder}</option>
                {countries.map((country) => (
                    <option key={country} value={country}>
                        {country}
                    </option>
                ))}
            </select>
        </div>
    );
};

export default StickyCountryFilter;
