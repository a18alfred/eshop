import categorySlugToName from './category';

const costFilter = {
    title: 'Диапазон цен',
    limit: 5,
    filterBy: 'cost',
    items: [
        {
            name: '1 - 100',
            value: '1-100',
        },
        {
            name: '100 - 1000',
            value: '100-1000',
        },
        {
            name: '1000 - 2000',
            value: '1000-2000',
        },
        {
            name: '2000 - 5000',
            value: '2000-5000',
        },
        {
            name: '5000 - 10000',
            value: '5000-10000',
        },
        {
            name: '10000 - 20000',
            value: '10000-20000',
        },
        {
            name: '20000 - 50000',
            value: '20000-50000',
        },
    ],
};

const categoryFilter = {
    title: 'Категория',
    limit: 0,
    filterBy: 'categorySlug',
    items: Object.entries(categorySlugToName).map(([value, name]) => ({
        name,
        value,
    })),
};

export { costFilter, categoryFilter };
