import React, { memo } from 'react';

type PageTitleProps = {
    value: string;
    style?: React.CSSProperties;
};

const PageTitle = ({ value, style }: PageTitleProps) => {
    return (
        <h1
            style={style}
            className=" text-lg inline-block text-zinc-800 font-medium relative my-5"
        >
            <span className="block h-9 before:absolute before:left-0 before:bottom-0 before:content-[''] before:h-0.5 before:bg-violet-700 before:w-[50px]">
                {value}
            </span>
        </h1>
    );
};

export default memo(PageTitle);
