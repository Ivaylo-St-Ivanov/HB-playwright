import React from 'react';
import { motion } from 'framer-motion';

const Review: React.FC = () => {
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="container"
        >
            <h1>Review</h1>
            <p>Content coming soon...</p>
        </motion.div>
    );
};

export default Review;
