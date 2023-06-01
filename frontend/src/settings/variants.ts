export const portalVariants = {
    open: {
        opacity: 1,
        scale: 1,
        display: 'flex',
        transition: {
            duration: 0.2,
            ease: 'easeIn',
        },
    },
    closed: {
        scale: 0.95,
        opacity: 0,
        transition: {
            duration: 0.2,
            ease: 'easeOut',
        },
        transitionEnd: {
            display: 'none',
        },
    },
};

export const mobileDropdownVariant = {
    open: {
        height: 'auto',
        display: 'block',
        overflow: 'hidden',
        opacity: 1,
        transition: {
            duration: 0.3,
        },
    },
    closed: {
        height: 0,
        opacity: 0,
        transition: {
            duration: 0.3,
        },
        transitionEnd: {
            display: 'none',
            overflow: 'visible',
        },
    },
};
