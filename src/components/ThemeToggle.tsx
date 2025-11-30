import React, { useState } from 'react';
import { Moon, Sun } from 'lucide-react';

import { useTheme } from '../context/ThemeContext';

const ThemeToggle: React.FC = () => {
    const [isHovered, setIsHovered] = useState(false);
    const { theme, toggleTheme } = useTheme();

    const getIconColor = () => {
        if (!isHovered) return 'var(--color-text)';
        return theme === 'dark' ? '#FFA500' : '#F4E99B'; // Orange for Sun, Pale Yellow for Moon
    };

    return (
        <button
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            onClick={toggleTheme}
            style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '0.5rem',
                borderRadius: '50%',
                background: 'transparent',
                color: getIconColor(),
                cursor: 'pointer',
                transition: 'transform 0.2s ease, color 0.2s ease'
            }}
            title={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
        >
            {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
        </button>
    );
};

export default ThemeToggle;
