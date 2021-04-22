import {useEffect, useState} from 'react';

function getWindowDimensions() {
    if (typeof window === "undefined") return { width: 1000, height: 1000};

    const { innerWidth: width, innerHeight: height, devicePixelRatio, outerWidth, outerHeight } = window;
    return {
        width,
        height,
        devicePixelRatio,
        outerWidth,
        outerHeight,
    };
}

export default function useWindowDimensions() {
    const [windowDimensions, setWindowDimensions] = useState(getWindowDimensions());

    useEffect(() => {
        if (typeof window === "undefined") return;

        function handleResize() {
            setWindowDimensions(getWindowDimensions());
        }

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return windowDimensions;
}
