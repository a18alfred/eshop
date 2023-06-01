import React from 'react';
import Banner from '../components/Home/Banner';
import Hero from '../components/Home/Hero';
import ProductCarousel from '../components/Product/ProductCarousel';
import bannerFull1 from '../assets/banner_full_width.webp';
import bannerFull2 from '../assets/banner2_full_width.webp';
import Service from '../components/Home/Service';
import Container from '../components/Container/Container';

const banner1 = [
    {
        href: '/products?brand=Puratos',
        img: { src: bannerFull1, alt: 'Пуратос' },
    },
];

const banner2 = [
    {
        href: '/products?categorySlug=Zakvaski',
        img: { src: bannerFull2, alt: 'Закваски' },
    },
];

const Home = () => {
    return (
        <main>
            <Container>
                <Hero />

                <ProductCarousel
                    titleHeadValue="Лучшие предложения"
                    titleHeadUrl="products?sort=discount-desc"
                    query="sort=discount-desc"
                    delay={5000}
                />

                <Banner data={banner1} />

                <ProductCarousel
                    titleHeadValue="Новинки"
                    titleHeadUrl="products?sort=createdAt-desc"
                    query="sort=createdAt-desc"
                    delay={7500}
                />

                <Banner data={banner2} />

                <Service />
            </Container>
        </main>
    );
};

export default Home;
