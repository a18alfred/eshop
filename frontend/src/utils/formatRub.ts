const formatRub = (n: number) => {
    return (
        new Intl.NumberFormat('ru-RU', {
            style: 'decimal',
            currency: 'RUB',
        }).format(n) + ' ₽'
    );
};

export default formatRub;
