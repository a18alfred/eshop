import React, { memo, useCallback, useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { DoubleDown, DoubleUp } from '../../icons/icons';
import { motion } from 'framer-motion';

const hiddenDropdownVariants = {
    open: {
        height: 'auto',
        opacity: 1,
        display: 'block',
        transition: {
            duration: 0.3,
        },
    },
    closed: {
        height: 0,
        opacity: 0,
        overflow: 'hidden',
        transition: {
            duration: 0.3,
        },
        transitionEnd: {
            display: 'none',
        },
    },
};

type Items = {
    name: string;
    value: string;
};

type CheckboxGroupProps = {
    title: string;
    limit: number;
    items: Items[];
    filterBy: string;
    onClick?: () => void;
};

const CheckboxGroup = ({
                           title,
                           limit,
                           items,
                           filterBy,
                           onClick,
                       }: CheckboxGroupProps) => {
    const [urlSearchParams, setSearchParams] = useSearchParams();
    const [showMore, setShowMore] = useState(false);
    const [selected, setSeleted] = useState<boolean[]>(
        Array(items.length).fill(false),
    );

    const handleCheckbox = useCallback(
        (index: number) => {
            const newSelected = [...selected];
            newSelected[index] = !newSelected[index];
            setSeleted(newSelected);

            const selectedItems = newSelected.reduce(
                (prev: Items[], current: boolean, index: number) =>
                    current ? [...prev, items[index]] : prev,
                [],
            );
            const valueQueryParams = selectedItems
                .map((item) => item.value)
                .join('_');
            if (valueQueryParams) {
                urlSearchParams.set(filterBy, valueQueryParams);
            } else {
                urlSearchParams.delete(filterBy);
            }

            setSearchParams(urlSearchParams);
            onClick && onClick();
        },
        [items, selected, setSearchParams, urlSearchParams, filterBy, onClick],
    );

    const handleShowMore = useCallback(() => {
        setShowMore((prevShowMore) => !prevShowMore);
    }, []);

    const visibleItems = limit !== 0 ? items.slice(0, limit) : items;
    const hiddenItems = items.slice(limit);

    useEffect(() => {
        const queryParams = urlSearchParams.get(filterBy);
        if (queryParams) {
            const selectedValues = queryParams.split('_');
            const newSelected = items.map((_, index) =>
                selectedValues.includes(items[index].value),
            );
            setSeleted(newSelected);
        } else {
            setSeleted(Array(items.length).fill(false));
        }
    }, [urlSearchParams, items, filterBy]);

    return (
        <div className='mb-5'>
            <h2 className=' font-medium text-lg'>{title}</h2>
            <ul className='pt-1'>
                {visibleItems.map((item, i) => (
                    <li
                        key={i}
                        className='cursor-pointer leading-6 hover:text-violet-700'
                    >
                        <label
                            htmlFor={item.name}
                            className='relative block cursor-pointer mb-0.5'
                        >
                            <input
                                type='checkbox'
                                className='hidden'
                                id={item.name}
                                name={item.name}
                                checked={selected[i]}
                                value={item.value}
                                onChange={() => handleCheckbox(i)}
                            />
                            <span
                                className={`absolute top-1/2 -translate-y-1/2 left-0 w-5 h-5 border rounded ${
                                    selected[i]
                                        ? 'border-violet-700 after:absolute after:content-[\'\'] after:top-[calc(50%-2px)] after:-translate-y-1/2 after:left-1/2 after:-translate-x-1/2 after:border-solid after:border-violet-700 after:border-r-[3px]  after:border-b-[3px] after:rotate-45 after:w-1.5 after:h-2.5'
                                        : 'border-zinc-200'
                                }`}
                            ></span>
                            <p className='ml-7 select-none'>{item.name}</p>
                        </label>
                    </li>
                ))}
                {limit !== 0 && (
                    <motion.ul
                        initial={'closed'}
                        variants={hiddenDropdownVariants}
                        animate={showMore ? 'open' : 'closed'}
                    >
                        {hiddenItems.map((item, i) => (
                            <li
                                key={i}
                                className='cursor-pointer leading-6 hover:text-violet-700'
                            >
                                <label
                                    htmlFor={item.name}
                                    className='relative block cursor-pointer mb-0.5'
                                >
                                    <input
                                        type='checkbox'
                                        className='hidden'
                                        id={item.name}
                                        name={item.name}
                                        checked={selected[i + limit]}
                                        value={item.value}
                                        onChange={() =>
                                            handleCheckbox(i + limit)
                                        }
                                    />
                                    <span
                                        className={`absolute top-1/2 -translate-y-1/2 left-0 w-5 h-5 border rounded-sm ${
                                            selected[i + limit]
                                                ? 'border-violet-700 after:absolute after:content-[\'\'] after:top-[calc(50%-2px)] after:-translate-y-1/2 after:left-1/2 after:-translate-x-1/2 after:border-solid after:border-violet-700 after:border-r-[3px]  after:border-b-[3px] after:rotate-45 after:w-1.5 after:h-2.5'
                                                : 'border-zinc-200'
                                        }`}
                                    ></span>
                                    <p className='ml-7 select-none'>
                                        {item.name}
                                    </p>
                                </label>
                            </li>
                        ))}
                    </motion.ul>
                )}
            </ul>
            {limit !== 0 && (
                <div>
                    <button
                        className='py-2.5 ml-7 w-full text-violet-700 flex space-x-1 leading-none'
                        onClick={handleShowMore}
                    >
                        {showMore ? (
                            <>
                                <p>Скрыть</p>
                                <DoubleUp className='w-2 h-3.5' />
                            </>
                        ) : (
                            <>
                                <p>Ещё</p>
                                <DoubleDown className='w-2 h-3 5' />
                            </>
                        )}
                    </button>
                </div>
            )}
        </div>
    );
};

export default memo(CheckboxGroup);
