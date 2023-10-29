[![Tests](../../actions/workflows/tests-13-sprint.yml/badge.svg)](../../actions/workflows/tests-13-sprint.yml) [![Tests](../../actions/workflows/tests-14-sprint.yml/badge.svg)](../../actions/workflows/tests-14-sprint.yml)
# Проект "Mesto фронтенд + бэкенд"🌍

### 📜Описание:
Mesto фронтенд + бэкенд - это проект бэкенд для приложения "Место", написанный на Node.js с использованием Express, MongoDB и Mongoose. Бэкенд предоставляет API для добавления, удаления, изменения юзеров и аватарки юзера, а также для добавления, удаления и лайкания/дизлайкания карточек. В проекте был использован линтер ESLint с настройками AirBase.

[Ссылка на проект express-mesto-gha](https://github.com/AsaevArtemV/express-mesto-gha)

### 🛠️Технологии:

* Node.js
* express.js
* MongoDB
* Mongoose

### ⚙️Установка и запуск проекта
1. Клонируйте репозиторий:
``
git clone git@github.com:AsaevArtemV/express-mesto-gha.git
``
2. Перейдите в директорию с проектом:
``
cd express-mesto-gha
``
3. Установите зависимости:
``
npm install
``
4. Запустите сервер:
``
npm run start
``
5. Запустите сервер с hot-reload:
``
npm run dev
``

### 🕹️Использование 
Бэкенд состоит из набора API-маршрутов, доступных через HTTP-запросы. Вот некоторые из них:

#### 👤Работа с пользователями 
- GET /users — получение списка всех пользователей;
- GET /users/:id — получение пользователя по ID;
- POST /users — создание нового пользователя;
- PATCH /users/me — обновление профиля пользователя;
- PATCH /users/me/avatar — обновление аватара пользователя;
- DELETE /users/me — удаление профиля пользователя.

#### 🌄Работа с карточками
- GET /cards — получение списка всех карточек;
- POST /cards — создание новой карточки;
- DELETE /cards/:id — удаление карточки по ID;
- PUT /cards/:id/likes — поставить лайк карточке по ID;
- DELETE /cards/:id/likes — удалить лайк с карточки по ID.

### 🗃️Директории

`/routes` — папка с файлами роутера  
`/controllers` — папка с файлами контроллеров пользователя и карточки   
`/models` — папка с файлами описания схем пользователя и карточки  

Остальные директории вспомогательные, создаются при необходимости разработчиком
