import { useEffect, useRef, useState } from 'react';

const useZoomImage = () => {
    const imgRef = useRef<HTMLImageElement | null>(null);
    const lensRef = useRef<HTMLDivElement | null>(null);
    const zoomImgRef = useRef<HTMLDivElement | null>(null);
    const [lens, setLens] = useState({
        top: '',
        left: '',
        display: 'none',
    });
    const [zoomImg, setZoomImg] = useState({
        backgroundSize: '',
        backgroundPosition: '',
        display: 'none',
    });

    useEffect(() => {
        const imgEl = imgRef.current;
        const lensEl = lensRef.current;
        const zoomImgEl = zoomImgRef.current;

        if (!(imgEl && lensEl && zoomImgEl)) {
            return;
        }

        const getCursorPos = (e: MouseEvent) => {
            const rect = imgEl.getBoundingClientRect();
            const x = e.pageX - rect.left - window.scrollX;
            const y = e.pageY - rect.top - window.scrollY;
            return { x, y };
        };

        const moveLens = (e: MouseEvent) => {
            e.preventDefault();

            // Ratio between result img and lens
            const cx = (zoomImgEl.offsetWidth / lensEl.offsetWidth) * 0.6;
            const cy = (zoomImgEl.offsetHeight / lensEl.offsetHeight) * 0.6;

            const pos = getCursorPos(e);
            let x = pos.x - lensEl.offsetWidth / 2;
            let y = pos.y - lensEl.offsetHeight / 2;
            if (x > imgEl.width - lensEl.offsetWidth) {
                x = imgEl.width - lensEl.offsetWidth;
            }
            if (x < 0) {
                x = 0;
            }
            if (y > imgEl.height - lensEl.offsetHeight) {
                y = imgEl.height - lensEl.offsetHeight;
            }
            if (y < 0) {
                y = 0;
            }

            setLens({
                top: `${y}px`,
                left: `${x}px`,
                display: 'block',
            });
            setZoomImg({
                backgroundSize: `${cx * imgEl.width}px ${cy * imgEl.height}px`,
                backgroundPosition: `${-x * cx}px ${-y * cy}px`,
                display: 'block',
            });
        };

        const mouseLeave = () => {
            setZoomImg((prev) => ({
                ...prev,
                display: 'none',
            }));
            setLens((prev) => ({
                ...prev,
                display: 'none',
            }));
        };

        lensEl.addEventListener('mousemove', moveLens);
        imgEl.addEventListener('mousemove', moveLens);
        lensEl.addEventListener('mouseleave', mouseLeave);
        imgEl.addEventListener('mouseleave', mouseLeave);

        return () => {
            lensEl.removeEventListener('mousemove', moveLens);
            imgEl.removeEventListener('mousemove', moveLens);
            lensEl.removeEventListener('mouseleave', mouseLeave);
            imgEl.removeEventListener('mouseleave', mouseLeave);
        };
    }, []);

    return { imgRef, lensRef, zoomImgRef, lens, zoomImg };
};

export default useZoomImage;
