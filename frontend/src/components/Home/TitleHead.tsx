import React, { memo } from 'react';
import { Link } from 'react-router-dom';

type TitleHeadProps = {
    value: string;
    url: string;
    noTitleLink?: boolean;
};

const TitleHead = ({ value, url, noTitleLink }: TitleHeadProps) => {
    return (
        <div className="w-full min-h-[30px] mt-4 mb-4 rounded-2xl">
            {noTitleLink ? (
                <p className="text-lg md:text-xl font-bold">{value}</p>
            ) : (
                <Link
                    to={url}
                    className="text-lg md:text-xl font-bold hover:text-violet-700"
                >
                    {value}
                </Link>
            )}
        </div>
    );
};

export default memo(TitleHead);
