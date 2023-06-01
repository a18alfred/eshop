import React from 'react';
import TitleHead from '../Home/TitleHead';
import ProductCard from './ProductCard';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper';
import 'swiper/css';
import useSwiperSlide from '../../hooks/useSwiperSlide';
import SkeletonProductCard from '../Skeleton/SkeletonProductCard';
import { useQuery } from 'react-query';
import { IProduct } from '../../types/types';
import { getProducts } from '../../services/product';

type ProductListsProps = {
    titleHeadValue: string;
    titleHeadUrl: string;
    query: string;
    delay: number;
    excludeItemById?: number;
    noTitleLink?: boolean;
};

const ProductCarousel = ({
    titleHeadValue,
    titleHeadUrl,
    query,
    delay,
    excludeItemById,
    noTitleLink,
}: ProductListsProps) => {
    const { handleChangeSlide, isEndSlide } = useSwiperSlide();

    const { data: products } = useQuery<IProduct[], Error>({
        queryKey: ['products', query],
        queryFn: () => getProducts(query).then((res) => res.data.products),
    });

    return (
        <section className="mb-8">
            <TitleHead
                value={titleHeadValue}
                url={titleHeadUrl}
                noTitleLink={noTitleLink}
            />
            <Swiper
                speed={2000}
                slidesPerView={2}
                autoplay={{
                    delay,
                    disableOnInteraction: false,
                    reverseDirection: isEndSlide,
                }}
                breakpoints={{
                    640: {
                        slidesPerView: 3,
                    },
                    992: {
                        slidesPerView: 4,
                    },
                    1200: {
                        slidesPerView: 5,
                    },
                }}
                modules={[Autoplay]}
                onSlideChange={handleChangeSlide}
            >
                {!!products?.length
                    ? products.map((product) => {
                          if (product.id === excludeItemById) return null;
                          return (
                              <SwiperSlide key={product.id}>
                                  <ProductCard
                                      withRating={false}
                                      product={product}
                                  />
                              </SwiperSlide>
                          );
                      })
                    : [...Array(5)].map((_, i) => (
                          <SwiperSlide key={i}>
                              <SkeletonProductCard />
                          </SwiperSlide>
                      ))}
            </Swiper>
        </section>
    );
};

export default ProductCarousel;
