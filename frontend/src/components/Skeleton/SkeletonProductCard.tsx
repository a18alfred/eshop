import React from 'react';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';

const SkeletonProductCard = () => {
    return (
        <SkeletonTheme duration={1}>
            <div className={`select-none`}>
                <div className="px-2.5">
                    <div className="h-32 xs:h-44 lg:h-52  aspect-square w-auto mb-0.5 relative">
                        <Skeleton height={'100%'} />
                    </div>
                    <div className="py-3 px-0">
                        <Skeleton className="mb-2" height={20} />
                        <div className="w-full grid grid-cols-2 gap-x-2.5">
                            <Skeleton className="w-full" />
                            <Skeleton className="w-full" />
                        </div>
                    </div>
                </div>
            </div>
        </SkeletonTheme>
    );
};

export default SkeletonProductCard;
