import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface PlayModalProps {
    isOpen: boolean;
    onClose: () => void;
    playTitle: string;
    languageName: string;
    fullText: string;
}

const PlayModal: React.FC<PlayModalProps> = ({
    isOpen,
    onClose,
    playTitle,
    languageName,
    fullText
}) => {
    useEffect(() => {
        const handleEsc = (event: KeyboardEvent) => {
            if (event.key === 'Escape') {
                onClose();
            }
        };
        if (isOpen) {
            window.addEventListener('keydown', handleEsc);
        }
        return () => {
            window.removeEventListener('keydown', handleEsc);
        };
    }, [isOpen, onClose]);

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    className="modal-overlay"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onClick={onClose}
                >
                    <motion.div
                        className="modal-content"
                        initial={{ opacity: 0, scale: 0.9, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9, y: 20 }}
                        onClick={(e) => e.stopPropagation()}
                    >
                        <button className="modal-close" onClick={onClose}>
                            <svg viewBox="0 0 24 24" width="24" height="24">
                                <path fill="currentColor" d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" />
                            </svg>
                        </button>

                        <div className="modal-header">
                            <h2>{playTitle}</h2>
                            <span className="modal-language">{languageName}</span>
                        </div>

                        <div className="modal-body">
                            {fullText.split('\n\n').map((paragraph, index) => (
                                <p key={index}>{paragraph}</p>
                            ))}
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default PlayModal;
