import React, { useRef } from 'react';
import { motion, useMotionValue, useTransform, useSpring } from 'framer-motion';

interface PlayCardProps {
    play: any;
    language: string;
    handleLanguageClick: (playTitle: string, lang: string, fullText: string) => void;
    index: number;
}

const PlayCard: React.FC<PlayCardProps> = ({ play, language, handleLanguageClick, index }) => {
    const cardRef = useRef<HTMLDivElement>(null);
    const [isHoveringLink, setIsHoveringLink] = React.useState(false);

    // Motion values for mouse position relative to card center (-0.5 to 0.5)
    const x = useMotionValue(0);
    const y = useMotionValue(0);

    // Smooth the motion values
    const mouseXSpring = useSpring(x, { stiffness: 150, damping: 20 });
    const mouseYSpring = useSpring(y, { stiffness: 150, damping: 20 });

    // Map mouse position to rotation (max 10 degrees)
    const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], [10, -10]);
    const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], [-10, 10]);

    // Combine into a transform string with perspective
    const transform = useTransform(
        [rotateX, rotateY],
        ([rX, rY]) => `perspective(1000px) rotateX(${rX}deg) rotateY(${rY}deg)`
    );

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!cardRef.current) return;

        const rect = cardRef.current.getBoundingClientRect();
        const width = rect.width;
        const height = rect.height;

        const mouseX = e.clientX - rect.left;
        const mouseY = e.clientY - rect.top;

        const xPct = mouseX / width - 0.5;
        const yPct = mouseY / height - 0.5;

        x.set(xPct);
        y.set(yPct);
    };

    const handleMouseLeave = () => {
        x.set(0);
        y.set(0);
        setIsHoveringLink(false);
    };

    return (
        <div
            ref={cardRef}
            className="play-card-container"
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={{ cursor: isHoveringLink ? 'pointer' : 'default' }}
        >
            <motion.div
                className="play-card"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                style={{
                    transform,
                    transformStyle: "preserve-3d",
                }}
            >
                <div className="play-card__inner">
                    <h3 className="play-card__title">
                        {play.title[language as keyof typeof play.title]}
                    </h3>
                    <div className="play-card__meta">
                        {play.year} | {play.genre[language as keyof typeof play.genre]}
                    </div>
                    <p className="play-card__desc">
                        {play.description[language as keyof typeof play.description]}
                    </p>
                    <div className="play-card__languages">
                        <span className="play-card__languages-label">
                            {language === 'en' ? 'Available in: ' : 'Налична на: '}
                        </span>
                        <div className="play-card__languages-list">
                            {play.languages.map((langObj: any, langIndex: number) => (
                                <React.Fragment key={langObj.name}>
                                    <span
                                        className="play-card__language-link"
                                        onMouseEnter={() => setIsHoveringLink(true)}
                                        onMouseLeave={() => setIsHoveringLink(false)}
                                        onClick={() => handleLanguageClick(
                                            play.title[language as keyof typeof play.title],
                                            langObj.name,
                                            langObj.text
                                        )}
                                    >
                                        {langObj.name}
                                    </span>
                                    {langIndex < play.languages.length - 1 && ', '}
                                </React.Fragment>
                            ))}
                        </div>
                    </div>
                </div>
            </motion.div>
        </div>
    );
};

export default PlayCard;
