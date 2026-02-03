import React, { useState, useEffect, useRef } from 'react';

const Counter = ({ end, duration = 2000, suffix = '' }) => {
    const [count, setCount] = useState(0);
    const countRef = useRef(null);
    const observerRef = useRef(null);
    const hasAnimated = useRef(false);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting && !hasAnimated.current) {
                    hasAnimated.current = true;
                    animate();
                }
            },
            { threshold: 0.5 }
        );

        if (countRef.current) {
            observerRef.current = countRef.current;
            observer.observe(countRef.current);
        }

        return () => {
            if (observerRef.current) {
                observer.unobserve(observerRef.current);
            }
        };
    }, [end, duration]);

    const animate = () => {
        const startTime = performance.now();
        const startValue = 0;

        const step = (currentTime) => {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);

            // Easing function for smooth deceleration (easeOutExpo)
            const easeOut = 1 - Math.pow(2, -10 * progress);

            const current = Math.floor(startValue + (end - startValue) * easeOut);
            setCount(current);

            if (progress < 1) {
                requestAnimationFrame(step);
            } else {
                setCount(end); // Ensure we hit exact target
            }
        };

        requestAnimationFrame(step);
    };

    return (
        <span ref={countRef}>
            {count}{suffix}
        </span>
    );
};

export default Counter;
