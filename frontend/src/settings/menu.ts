export type MenuItem = {
    url: string;
    value: string;
    submenu?: MenuItem[];
};

export const Menu: MenuItem[] = [
    {
        url: '/recipes',
        value: 'Рецепты',
    },
    {
        url: '/how-to-buy',
        value: 'Как купить',
    },
    {
        url: '/about',
        value: 'Компания',
    },
    {
        url: '/contacts',
        value: 'Контакты',
    },
];

export const CategoryMenu: MenuItem[] = [
    {
        url: '/products?categorySlug=Inventar',
        value: 'Инвентарь',
        submenu: [
            {
                url: '/products?categorySlug=Bordyurnaya-lenta',
                value: 'Бордюрная лента',
            },
            {
                url: '/products?categorySlug=Instrumentarij-dlya-dekora',
                value: 'Инструментарий для декора',
            },
            {
                url: '/products?categorySlug=Prajs-Deko-Pro',
                value: 'Прайс Деко Про',
            },
        ],
    },
    {
        url: '/products?categorySlug=Siropy',
        value: 'Сиропы',
    },
    {
        url: '/products?categorySlug=Toppingi',
        value: 'Топпинги',
    },
    {
        url: '/products?categorySlug=Tvorozhennyj-syr',
        value: 'Твороженный сыр',
    },
    {
        url: '/products?categorySlug=Slivki',
        value: 'Сливки',
    },
    {
        url: '/products?categorySlug=Aromatizatory',
        value: 'Ароматизаторы',
    },
    {
        url: '/products?categorySlug=Drozhzhi',
        value: 'Дрожжи',
    },
    {
        url: '/products?categorySlug=Glazuri',
        value: 'Глазури',
    },
    {
        url: '/products?categorySlug=Zakvaski',
        value: 'Закваски',
    },
    {
        url: '/products?categorySlug=Smesi-zernovye',
        value: 'Смеси зерновые',
    },
    {
        url: '/products?categorySlug=Upakovka',
        value: 'Упаковка',
    },
];