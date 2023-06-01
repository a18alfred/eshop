import React, { memo } from 'react';
import { useSearchParams } from 'react-router-dom';
import ProductRate from './ProductRate';

const stars = [5, 4, 3, 2, 1];

const RatingStarGroup = ({ onClick }: { onClick?: () => void }) => {
    const [urlSearchParams, setSearchParams] = useSearchParams();

    return (
        <div className="mb-5">
            <h2 className=" font-medium text-lg">Рейтинг</h2>
            <ul className="pt-1 inline-flex flex-col">
                {stars.map((star) => (
                    <li
                        key={star}
                        onClick={() => {
                            urlSearchParams.set('avgRating', star.toString());
                            setSearchParams(urlSearchParams);
                            onClick && onClick();
                        }}
                        className="ml-3 mb-0.5 px-3 py-0.5 inline-flex items-center hover:bg-zinc-200 rounded-2xl space-x-2 cursor-pointer"
                    >
                        <ProductRate
                            rate={star}
                            className="w-3.5 h-3.5"
                            spaceBetween="space-x-1"
                        />
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default memo(RatingStarGroup);
