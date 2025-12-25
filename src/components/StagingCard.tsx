import React from 'react';
import { motion } from 'framer-motion';

interface StagingCardProps {
    city: string;
    theater: string;
    play: string;
    premiere?: string;
    director?: string;
    actors?: string;
    image?: string;
    premiereLabel: string;
    directorLabel: string;
    actorsLabel: string;
}

const StagingCard: React.FC<StagingCardProps> = ({
    city,
    theater,
    play,
    premiere,
    director,
    actors,
    image,
    premiereLabel,
    directorLabel,
    actorsLabel
}) => {
    return (
        <motion.div
            className="staging-card"
            whileHover={{ scale: 1.02 }}
            transition={{ type: "spring", stiffness: 300 }}
        >
            <div className="staging-card-content">
                <div className="staging-header">
                    <h3 className="city-name">{city}</h3>
                    <h4 className="theater-name">{theater}</h4>
                </div>

                <div className="play-info">
                    <h2 className="play-title">{play}</h2>
                </div>

                <div className="staging-details">
                    <p><strong>{premiereLabel}:</strong> {premiere}</p>
                    <p><strong>{directorLabel}:</strong> {director}</p>
                    <p><strong>{actorsLabel}:</strong> {actors}</p>
                </div>
            </div>
            {image && (
                <div className="staging-image">
                    <img src={image} alt={`${play} in ${city}`} />
                </div>
            )}
        </motion.div>
    );
};

export default StagingCard;
