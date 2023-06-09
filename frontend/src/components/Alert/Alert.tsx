import React, { memo } from 'react';

type AlertProps = {
    value: string;
    onClick?: () => void;
    type?: 'success' | 'error';
};

const Alert = ({ value, onClick, type = 'success' }: AlertProps) => {
    return (
        <div
            className={`flex p-4 mb-4 rounded-md ${
                type === 'success'
                    ? 'text-green-800 bg-green-50'
                    : 'text-violet-700 bg-violet-100'
            }`}
        >
            <svg
                aria-hidden='true'
                className='flex-shrink-0 w-5 h-5'
                fill='currentColor'
                viewBox='0 0 20 20'
                xmlns='http://www.w3.org/2000/svg'
            >
                <path
                    fillRule='evenodd'
                    d='M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z'
                    clipRule='evenodd'
                ></path>
            </svg>
            <div className='ml-3 text-sm font-medium'>
                {value}
            </div>
            <button
                type='button'
                className={`ml-auto -mx-1.5 -my-1.5  rounded-md focus:ring-2  p-1.5 inline-flex h-8 w-8 ${
                    type === 'success'
                        ? 'bg-green-50 text-green-800 focus:ring-green-400 hover:bg-green-100 '
                        : 'bg-violet-100 text-violet-500 focus:ring-violet-400 hover:bg-violet-200'
                }`}
                data-dismiss-target='#alert-2'
                onClick={onClick}
            >
                <svg
                    className='w-5 h-5'
                    fill='currentColor'
                    viewBox='0 0 20 20'
                    xmlns='http://www.w3.org/2000/svg'
                >
                    <path
                        fillRule='evenodd'
                        d='M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z'
                        clipRule='evenodd'
                    ></path>
                </svg>
            </button>
        </div>
    );
};

export default memo(Alert);
