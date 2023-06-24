# Fullstack E-commerce Website

Это полноценный e-commerce веб-сайт, созданный с использованием React, Tailwind CSS, Redux Toolkit, TypeScript, Node.js, Express, Multer, Nodemailer, JWT и Sequelize (MySQL).

## Технологический стек

#### Клиент:

- React
- Tailwind CSS
- Redux Toolkit
- TypeScript

#### Сервер / API:

- Node.js
- Express
- Multer
- Nodemailer
- JWT
- Sequelize (MySQL)

## Инструкции по настройке

### Клиент

1. Клонируйте репозиторий.
2. Перейдите в директорию client.
3. Запустите команду npm install, чтобы установить зависимости.
4. Заполните необходимые значения в файле .env следующим образом.

VITE_API=YOU_API_ADDRESS

5. Запустите клиентскую часть с помощью команды npm run dev.

### Сервер / API
 
1. Клонируйте репозиторий.
2. Перейдите в директорию server.
3. Запустите команду npm install, чтобы установить зависимости.
4. Создайте файл .env на основе предоставленного файла .env.sample.
5. Заполните необходимые значения в файле .env следующим образом:

PORT=YOUR_SERVER_PORT
DB_USERNAME=YOUR_DATABASE_USERNAME
DB_PASSWORD=YOUR_DATABASE_PASSWORD
DB_NAME=YOUR_DATABASE_NAME
DB_HOST=YOUR_DATABASE_HOST
DB_PORT=YOUR_DATABASE_PORT
DB_DIALECT=YOUR_DATABASE_DIALECT
DB_TIMEZONE=YOUR_DATABASE_TIMEZONE
SECRET_KEY_ACCESS_TOKEN=YOUR_ACCESS_TOKEN_SECRET_KEY
SECRET_KEY_REFRESH_TOKEN=YOUR_REFRESH_TOKEN_SECRET_KEY
EMAIL_HOST=YOUR_EMAIL_HOST
EMAIL_PORT=YOUR_EMAIL_PORT
EMAIL_USER=YOUR_EMAIL_USER_ID
EMAIL_PASS=YOUR_EMAIL_PASSWORD
ORIGIN_CLIENT=YOUR_CLIENT_ORIGIN
ORIGIN_API=YOUR_API_ORIGIN

6. Запустите сервер с помощью команды npm run start.

## Маршруты API

### /api/product

- GET /api/product/get - Получить товары
- GET /api/product/get/:productCode - Получить товар по артикулу.
- POST /api/product/create - Создать новый товар (требуется токен аутентификации и права администратора).
- PATCH /api/product/update/:productId - Обновить информацию о товаре (требуется токен аутентификации и права администратора).
- DELETE /api/product/delete/:productId - Удалить товар (требуется токен аутентификации и права администратора).

### /api/category

- GET /api/category/get - Получить список категорий.
- POST /api/category/create - Создать новую категорию (требуется токен аутентификации и права администратора).
- DELETE /api/category/delete/:categoryId - Удалить категорию (требуется токен аутентификации и права администратора).

### /api/image

- POST /api/image/upload - Загрузить изображение к товару (требуется токен аутентификации и права администратора).
- POST /api/image/delete/:imageId - Удалить изображение товара (требуется токен аутентификации и права администратора).

### /api/auth

- POST /api/auth/signUp - Зарегистрировать нового пользователя.
- POST /api/auth/signIn - Авторизовать пользователя.
- GET /api/auth/refreshToken - Обновить токен доступа с помощью токена обновления.
- POST /api/auth/signOut - Выход пользователя из системы (требуется токен аутентификации).
- POST /api/auth/forgotPassword - Запросить сброс пароля.
- POST /api/auth/verifyRecovery - Проверить токен для сброса пароля.
- POST /api/auth/resetPassword - Сбросить пароль.

### /api/user

- GET /api/user/get - Получить информацию о текущем пользователе (требуется токен аутентификации).
- GET /api/user/orders - Получить заказы пользователя (требуется токен аутентификации).
- PATCH /api/user/role/:userId - Поменять роль пользователя (требуется токен админа).
- PATCH /api/user/update/:userId - Обновить информацию пользователя (требуется токен аутентификации).

### /api/address

- POST /api/address/create - Создать новый адрес (требуется токен аутентификации).
- PUT /api/address/update - Обновить адрес (требуется токен аутентификации).

### /api/comment

- POST /api/comment/create - Создать новый комментарий (требуется токен аутентификации).
- DELETE /api/comment/delete/:commentId - Удалить комментарий (требуется токен аутентификации).
- GET /api/comment/byproduct/:productId - Получить комментарии к товару.

### /api/order

- POST /api/order/create - Создать новый заказ (требуется токен аутентификации).
- PATCH /api/order/update/:orderId - Обновить информацию о заказе (требуется токен аутентификации и права администратора).
- PATCH /api/order/cancel/:orderId - Отменить заказ (требуется токен аутентификации).
- PATCH /api/order/get - Получить все заказы (требуется токен аутентификации и права администратора).

## Внимание
В целях безопасности и защиты от мошенников, личный кабинет и функция оформления заказов были удалены.
