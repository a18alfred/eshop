import React, { useState } from 'react';
import { Search } from '../../icons/icons';
import { useNavigate } from 'react-router-dom';

const SearchElement = () => {
    const navigate = useNavigate();
    const [searchValue, setSearchValue] = useState<string>('');

    const onSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (searchValue.length < 3) return;
        navigate(`/products?search=${searchValue}`);
    };

    return (
        <div className="order-1 mt-2 w-full lg:m-0 lg:px-4 lg:w-1/2">
            <form
                onSubmit={onSubmit}
                className="w-full h-[42px] flex items-center relative border border-zinc-200 rounded-2xl bg-zinc-50"
                autoComplete="off"
            >
                <input
                    type="text"
                    className="w-full min-w-0 px-3 text-[13px] placeholder:text-zinc-400/70 focus:outline-none caret-violet-700 flex-auto h-full bg-zinc-50 rounded-2xl"
                    placeholder={'Поиск товаров'}
                    autoComplete="off"
                    value={searchValue}
                    maxLength={100}
                    onChange={(e) => setSearchValue(e.target.value)}
                />
                <button type={'submit'}>
                    <Search
                        className={
                            'w-5 h-5 fill-zinc-500 hover:fill-violet-700 cursor-pointer mr-2'
                        }
                    />
                </button>
            </form>
        </div>
    );
};

export default SearchElement;
