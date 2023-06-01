import React from 'react';
import { Social } from '../../settings/social';

const FooterSocial = () => {
    return (
        <div className='flex items-center space-x-3 mb-1 md:mb-8'>
            {Social.map((lfp, i) => (
                <a
                    href={lfp.url}
                    className='w-10 h-10 rounded-full bg-white flex items-center justify-center text-zinc-400 transition-all duration-150 ease-in-out hover:text-white hover:bg-violet-700'
                    target='_blank'
                    rel='noreferrer'
                    key={i}
                >
                    <lfp.Icon className='w-4 h-4' />
                </a>
            ))}
        </div>
    );
};

export default FooterSocial;
