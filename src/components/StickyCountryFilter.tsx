import React, { useState } from 'react';

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
    const [isVisible, setIsVisible] = useState(false);

    if (countries.length === 0) return null;

    return (
        <div
            className="sticky-filter"
            onMouseEnter={() => setIsVisible(true)}
            onMouseLeave={() => setIsVisible(false)}
        >
            <div className="sticky-filter__icon">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    width="30"
                    height="30"
                >
                    <circle cx="11" cy="11" r="8"></circle>
                    <path d="m21 21-4.35-4.35"></path>
                </svg>
            </div>
            <select
                className={`sticky-filter__dropdown ${isVisible ? 'sticky-filter__dropdown--visible' : ''}`}
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
