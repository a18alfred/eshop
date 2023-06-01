import React, { useMemo, memo } from 'react';

type LoadingMessageProps = {
    ball?: number;
    width?: string;
    height?: string;
    duration?: string;
};

const colors = [
    'bg-violet-700',
    'bg-yellow-400',
    'bg-violet-700',
    'bg-yellow-400',
];

const PullsLoader = ({
    ball = 4,
    width = '12px',
    height = '12px',
    duration = '1s',
}: LoadingMessageProps) => {
    const balls = useMemo(
        () => Array.from({ length: ball }, (_, index) => index),
        [ball]
    );

    return (
        <div className="flex items-center space-x-2.5">
            {balls.map((ball, i) => (
                <div
                    key={i}
                    className={`w-4 h-4 rounded-full ${
                        colors[i % colors.length]
                    } animate-messageLoading`}
                    style={{
                        animationDuration: duration,
                        animationDelay: `${ball * 150}ms`,
                        width,
                        height,
                    }}
                ></div>
            ))}
        </div>
    );
};

export default memo(PullsLoader);
