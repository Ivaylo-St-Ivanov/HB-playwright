import React from 'react';

interface SidebarCountryFilterProps {
    countries: string[];
    selectedCountry: string;
    onSelect: (country: string) => void;
}

const SidebarCountryFilter: React.FC<SidebarCountryFilterProps> = ({
    countries,
    selectedCountry,
    onSelect
}) => {
    if (countries.length === 0) return null;

    return (
        <aside className="sidebar-filter">
            <ul className="sidebar-filter__list">
                {countries.map((country) => (
                    <li
                        key={country}
                        className={`sidebar-filter__item ${selectedCountry === country ? 'sidebar-filter__item--active' : ''}`}
                        onClick={() => onSelect(country)}
                    >
                        {country}
                    </li>
                ))}
            </ul>
        </aside>
    );
};

export default SidebarCountryFilter;
