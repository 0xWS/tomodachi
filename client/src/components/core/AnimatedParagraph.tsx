import React, { useEffect, useState } from "react";

interface AnimatedParagraphProps {
    paragraphs: string[];
}

const AnimatedParagraph: React.FC<AnimatedParagraphProps> = ({ paragraphs }) => {
    const [currentParagraph, setCurrentParagraph] = useState(0);
    const [isAnimating, setIsAnimating] = useState(false);

    useEffect(() => {
        const intervalId = setInterval(() => {
            setIsAnimating(true);
            setTimeout(() => {
                setCurrentParagraph((prev) => (prev + 1) % paragraphs.length);
                setIsAnimating(false);
            }, 1000);
        }, 5000);

        return () => clearInterval(intervalId);
    }, []);

    return (
        <div className="h-20 overflow-hidden">
            <p
                className={`text-xl text-center transition-all duration-1000 ease-in-out
                    ${isAnimating ? '-translate-y-full opactity-0' : 'translate-y-0 opacity-100'}`}
            >
                {paragraphs[currentParagraph]}
            </p>
        </div>
    );
};

export default AnimatedParagraph;