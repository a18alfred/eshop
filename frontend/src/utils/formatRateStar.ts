const formatRateStar = (rate: number) => {
    rate = Math.min(Math.max(rate, 0), 5);
    const newRate = Math.floor(rate) + 0.5;
    const starFull = rate >= newRate ? Math.ceil(rate) : Math.floor(rate);
    const star = starFull === 5 ? 0 : 5 - starFull;
    return { starFull, star };
};

export default formatRateStar;
