import React, { memo } from 'react';
import useZoomImage from '../../hooks/useZoomImage';

type ImageZoomProps = {
    img: string;
    alt?: string;
    width: number | string;
    height?: number | string;
    zoomWidth?: number | string;
};

const ImageZoom = (props: ImageZoomProps) => {
    const { imgRef, lensRef, zoomImgRef, lens, zoomImg } = useZoomImage();
    return (
        <div className="relative w-full h-full rounded-2xl">
            {/* Img source */}
            <img
                className={'object-cover w-full h-full rounded-2xl'}
                ref={imgRef}
                src={props.img}
                alt={props.alt}
                width={props.width}
                height={props.height}
            />
            {/* Lens  */}
            <div
                ref={lensRef}
                className="w-[100px] h-[100px] absolute bg-white border border-black opacity-50 z-10 top-0"
                style={{
                    top: lens.top,
                    left: lens.left,
                    display: lens.display,
                }}
            ></div>
            {/* Zoom img */}
            <div
                ref={zoomImgRef}
                className="z-[9999] absolute top-0 left-2.5 translate-x-full w-full h-full bg-white border-4 border-zinc-400"
                style={{
                    backgroundImage: `url(${props.img})`,
                    backgroundPosition: zoomImg.backgroundPosition,
                    backgroundSize: zoomImg.backgroundSize,
                    backgroundRepeat: 'no-repeat',
                    display: zoomImg.display,
                    width: props.zoomWidth,
                }}
            ></div>
        </div>
    );
};

export default memo(ImageZoom);
