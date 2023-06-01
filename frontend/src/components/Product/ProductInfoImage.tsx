import ImageZoom from '../ImageZoom/ImageZoom';
import { ChevronLeft, ChevronRight } from '../../icons/icons';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper';
import React, { useState } from 'react';
import useNavigationSwiper from '../../hooks/useNavigationSwiper';
import { Images } from '../../types/types';
import useWindowResize from '../../hooks/useWindowResize';

interface ProductInfoImageProps {
    images: Images[];
}

const ProductInfoImage = ({ images }: ProductInfoImageProps) => {
    const windowWidth = useWindowResize();
    const [activeIndexImg, setActiveIndexImg] = useState(0);
    const { nextEl, updateNextEl, prevEl, updatePrevEl } =
        useNavigationSwiper();

    return (
        <div className='w-full md:w-1/3'>
            <div className='block relative cursor-pointer mb-4 w-full aspect-square bg-zinc-100 rounded-2xl'>
                {!!images[activeIndexImg] && (
                    <>
                        {windowWidth > 992 ? (
                            <ImageZoom
                                img={images[activeIndexImg].src}
                                alt={images[activeIndexImg].alt}
                                width={'100%'}
                                zoomWidth={420}
                            />
                        ) : (
                            <img
                                className={
                                    'object-cover w-full h-full rounded-2xl'
                                }
                                src={images[activeIndexImg].src}
                                alt={images[activeIndexImg].alt}
                            />
                        )}
                    </>
                )}
            </div>
            <div className='relative overflow-hidden w-full'>
                <button
                    className='p-1 rounded-full bg-black/30 text-white hover:bg-violet-600 absolute top-1/2 left-0 -translate-y-1/2 z-50 cursor-pointer'
                    ref={updatePrevEl}
                >
                    <ChevronLeft className='w-4 h-4' />
                </button>
                <button
                    className='p-1 rounded-full bg-black/30 text-white hover:bg-violet-600 absolute top-1/2 right-0 -translate-y-1/2 z-50 cursor-pointer'
                    ref={updateNextEl}
                >
                    <ChevronRight className='w-4 h-4' />
                </button>

                <Swiper
                    slidesPerView={4}
                    spaceBetween={14}
                    navigation={{
                        prevEl,
                        nextEl,
                    }}
                    modules={[Navigation]}
                >
                    {images?.map((image, i) => (
                        <SwiperSlide
                            key={image.id}
                            onClick={() => setActiveIndexImg(i)}
                            className={`w-[2.5rem] h-auto aspect-square cursor-pointer rounded-2xl`}
                        >
                            <img
                                className='object-cover w-full h-full rounded-2xl'
                                src={image.src}
                                alt={image.alt}
                            />
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
        </div>
    );
};

export default ProductInfoImage;
