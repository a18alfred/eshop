module.exports = {
    content: ['./src/**/*.{js,jsx,ts,tsx}'],
    theme: {
        extend: {
            fontFamily: {
                montserrat: ['Montserrat', 'sans-serif'],
                arial: ['Arial Regular', 'Arial'],
            },

            screens: {
                xs: '400px',
                lg: '992px',
                xl: '1200px',
            },

            fontSize: {
                sm: ['14px', '1.42857143'],
            },

            maxWidth: {
                '3xl': '750px',
                '5xl': '970px',
                '6xl': '1200px',
            },

            gridTemplateColumns: {
                slide2: '74.7% auto',
            },

            transitionTimingFunction: {
                ease: 'ease',
            },

            boxShadow: {
                card: 'rgba(0,0,0,0.2) 0 0 5px',
            },

            animation: {
                growUp: 'growUp 1.5s ease infinite',
                messageLoading: 'message 1s ease-out infinite',
                progress: 'progress 1s ease-in-out infinite',
            },

            keyframes: {
                growUp: {
                    '0%': { transform: 'scale(1)' },
                    '15%': {
                        'box-shadow': '0 0 0 3px rgb(185 28 28 / 15%)',
                    },
                    '25%': {
                        'box-shadow':
                            '0 0 0 3px rgb(185 28 28 / 15%),0 0 0 5px rgb(185 28 28 / 15%)',
                    },
                    '30%': {
                        transform: 'scale(1.2)',
                    },
                    '50%': {
                        'box-shadow':
                            '0 0 0 7px rgb(185 28 28 / 15%),0 0 0 7px rgb(185 28 28 / 15%),0 0 0 10px rgb(185 28 28 / 15%)',
                    },
                    '80%': { transform: 'scale(1)' },
                },
                message: {
                    '0%': {
                        transform: 'scale(0)',
                    },
                    '50%': {
                        transform: 'scale(100%)',
                    },
                    '100%': {
                        transform: 'scale(0)',
                    },
                },
                progress: {
                    '0%': {
                        width: 0,
                    },
                    '50%': {
                        width: '50%',
                    },
                    '100%': {
                        width: '100%',
                    },
                },
            },
        },
    },

    plugins: [],
};
