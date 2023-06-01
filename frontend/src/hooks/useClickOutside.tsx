import { useEffect } from 'react';

const useClickOutside = (el: HTMLElement | null, callback: () => void) => {
    useEffect(() => {
        const handleClick = (e: Event) => {
            if (el && !el.contains(e.target as Node)) {
                callback();
            }
        };

        document.addEventListener('click', handleClick);

        return () => {
            document.removeEventListener('click', handleClick);
        };
    }, [el, callback]);
};

export default useClickOutside;
