import { useState, useEffect } from 'react';

export function useIsMobile() {

    const [isMobile, setIsMobile] = useState<boolean>();

    useEffect(() => {
        function handleResize() {
            setIsMobile(window.innerWidth < 720);
        }

        handleResize();

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return isMobile;
}