const formatDate = (date: Date) =>
    new Intl.DateTimeFormat('ru-RU', {
        dateStyle: 'short',
    }).format(new Date(date));

export default formatDate;
