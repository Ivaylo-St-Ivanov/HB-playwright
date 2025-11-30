import React from 'react';
import { motion } from 'framer-motion';

const Biography: React.FC = () => {
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="container"
        >
            <h1>Biography</h1>
            <p>Content coming soon...</p>
        </motion.div>
    );
};

export default Biography;
