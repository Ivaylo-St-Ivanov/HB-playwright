import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface StickyCountryFilterProps {
    countries: string[];
    selectedCountry: string;
    onSelect: (country: string) => void;
    placeholder: string;
}

const StickyCountryFilter: React.FC<StickyCountryFilterProps> = ({
    countries,
    selectedCountry,
    onSelect,
    placeholder
}) => {
    const [isHovered, setIsHovered] = useState(false);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    if (countries.length === 0) return null;

    const isExpanded = isHovered || isDropdownOpen;

    const handleSelect = (country: string) => {
        onSelect(country);
        setIsDropdownOpen(false);
        setIsHovered(false);
    };

    return (
        <div
            className={`sticky-filter ${isExpanded ? 'sticky-filter--expanded' : ''}`}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => {
                setIsHovered(false);
                setIsDropdownOpen(false);
            }}
        >
            <div
                className="sticky-filter__icon"
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            >
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

            <div
                className={`sticky-filter__custom-dropdown ${isExpanded
                    ? 'sticky-filter__custom-dropdown--visible'
                    : ''}`}
            >
                <div
                    className="sticky-filter__selected"
                    onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                >
                    {selectedCountry || placeholder}
                    <span
                        className={`sticky-filter__arrow ${isDropdownOpen ? 'sticky-filter__arrow--open' : ''}`}
                    >
                        ▼
                    </span>
                </div>

                <AnimatePresence>
                    {isDropdownOpen && (
                        <motion.ul
                            className="sticky-filter__options"
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            transition={{ duration: 0.2 }}
                        >
                            <li
                                className={`sticky-filter__option ${!selectedCountry
                                    ? 'sticky-filter__option--active'
                                    : ''}`}
                                onClick={() => handleSelect('')}
                            >
                                {placeholder}
                            </li>
                            {countries.map((country) => (
                                <li
                                    key={country}
                                    className={`sticky-filter__option ${selectedCountry === country
                                        ? 'sticky-filter__option--active'
                                        : ''}`}
                                    onClick={() => handleSelect(country)}
                                >
                                    {country}
                                </li>
                            ))}
                        </motion.ul>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
};

export default StickyCountryFilter;
