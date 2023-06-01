import React, { useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation, Pagination } from 'swiper';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight } from '../../icons/icons';
import { bannerImgs, slides } from '../../settings/hero';

const Hero = () => {
    const [prevEl, setPrevEl] = useState<HTMLButtonElement | null>(null);
    const [nextEl, setNextEl] = useState<HTMLButtonElement | null>(null);

    return (
        <section className='mt-4 lg:mt-4 mb-8 grid grid-cols-3 lg:grid-cols-slide2 gap-y-4 lg:gap-4 lg:-mb-4'>
            <Swiper
                autoplay={{
                    delay: 5000,
                    disableOnInteraction: false,
                }}
                navigation={{
                    prevEl,
                    nextEl,
                }}
                pagination={{
                    clickable: true,
                }}
                loop
                modules={[Pagination, Navigation, Autoplay]}
                className='col-span-3 lg:col-span-1 w-full lg:row-span-3 rounded-2xl h-auto lg:h-[453px] xl:h-[563px]'
            >
                <button
                    className='hidden sm:block p-2 rounded-full bg-black/30 text-white hover:bg-violet-600 absolute top-1/2 left-0 -translate-y-1/2 z-50'
                    ref={(node) => setPrevEl(node)}
                >
                    <ChevronLeft className='w-4 h-4' />
                </button>
                <button
                    className='hidden sm:block p-2 rounded-full bg-black/30 text-white hover:bg-violet-600 absolute top-1/2 right-0 -translate-y-1/2 z-50'
                    ref={(node) => setNextEl(node)}
                >
                    <ChevronRight className='w-4 h-4' />
                </button>
                {slides.map((slide) => (
                    <SwiperSlide key={slide.url} className={'rounded-2xl'}>
                        <Link to={slide.url}>
                            <img
                                className={'rounded-2xl'}
                                src={slide.src}
                                alt={slide.alt}
                                loading='lazy'
                            />
                        </Link>
                    </SwiperSlide>
                ))}
            </Swiper>

            <div
                className={
                    'col-span-3 lg:col-span-1 flex flex-row lg:flex-col gap-4'
                }
            >
                {bannerImgs.map((banner, i) => (
                    <Link key={i} to={banner.url}>
                        <div
                            className={
                                'bg-zinc-100 w-full h-auto lg:h-[218px] xl:h-[274px] rounded-2xl'
                            }
                        >
                            <img
                                className={
                                    'object-cover w-full h-full rounded-2xl'
                                }
                                src={banner.src}
                                alt={banner.alt}
                            />
                        </div>
                    </Link>
                ))}
            </div>
        </section>
    );
};

export default Hero;
