import React, { memo } from 'react';
import { Link } from 'react-router-dom';

type Data = {
    href: string;
    img: {
        src: string;
        alt: string;
    };
};

type BannerProps = {
    data: Data[];
};

type GridColumn = {
    [key: string]: string;
};

const gridColumVariants: GridColumn = {};

for (let i = 1; i <= 12; i++) {
    gridColumVariants[i] = `grid-cols-${i}`;
}

const Banner = ({ data }: BannerProps) => {
    return (
        <section
            className={`mb-8 grid gap-x-8 gap-y-4 rounded-2xl ${
                gridColumVariants[data.length > 12 ? 12 : data.length]
            } grid-cols`}
        >
            {data.map((data, i) => (
                <Link key={i} to={data.href} className="relative block">
                    <img
                        className={'rounded-2xl'}
                        src={data.img.src}
                        alt={data.img.alt}
                    />
                </Link>
            ))}
        </section>
    );
};

export default memo(Banner);
