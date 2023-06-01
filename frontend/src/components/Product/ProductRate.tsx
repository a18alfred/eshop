import React, { memo, useMemo } from 'react';
import { Star, StarFull } from '../../icons/icons';
import formatRateStar from '../../utils/formatRateStar';

type ProductRateProps = {
    rate: number;
    className?: string;
    spaceBetween?: string;
};

const ProductRate = ({ rate, className, spaceBetween }: ProductRateProps) => {
    const { starFull, star } = useMemo(() => formatRateStar(rate), [rate]);

    return (
        <>
            <div
                className={`flex items-center h-5 ${
                    spaceBetween || 'space-x-0.5'
                }`}
            >
                {[...Array(starFull)].map((_, i) => (
                    <StarFull
                        key={i}
                        className={`text-yellow-500 ${
                            className || 'h-2.5 w-2.5'
                        }`}
                    />
                ))}
                {[...Array(star)].map((_, i) => (
                    <Star
                        key={i}
                        className={`text-yellow-500 ${
                            className || 'h-2.5 w-2.5'
                        }`}
                    />
                ))}
            </div>
        </>
    );
};

export default memo(ProductRate);
