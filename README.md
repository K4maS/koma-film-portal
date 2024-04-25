# komaFilm portal

## Задача:

Необходимо создать приложение "name"Portal (например moviePortal). Как вариант на основе
The Open Movie Database: www.omdbapi.com.

Проект создаем с помощью Create React App (https://create-react-app.dev/).
Библиотеки, которые следует использовать для выполнения задачи:
React JS, Redux Toolkit, React router, Typescript (опционально).

## Состав:

1. Главная страница. На ней присутствует header: Логотип сайта - при клике осуществляется
   переход на главную страницу; "избранные" - переход на страницу избранных фильмов; Login
   пользователь или кнопка "войти" и "авторизоваться" - переход на страницу авторизации.  
    На главной странице должен отображаться список фильмов. Список фильмов можно отфильтровать
   (например по дате, алфавиту и т.д.).
   Реализовать кастомную пагинацию для вывода списка фильмов. Реализовать поиск фильма по
   введенной строке из поля поиска.
   При клике по карточке фильма - открывается страница с информацией о конкретном фильме.

2. Страница с информацией о конкретном фильме.
   Есть кнопка "like", которая добавляет текущий фильм в "избранные". (Если текущий фильм
   уже есть в списке "избранных", то вместо кнопки "like" отображается кнопка "убрать из избранных".)
   Если на кнопку "like" нажал не авторизованный пользователь, то происходит редирект на страницу
   авторизации. Только авторизованные пользователи могут сохранять фильмы в "избранные".

3. Страница авторизации. Должна присутствовать кнопка "вход" и кнопка "регистрация".
   При клике по "вход" отображается форма с полями login и password, при правильном вводе
   данных пользователь становится авторизованным и в header отображается его login.
   При клике на "регистрация" отображается форма для регистрации нового пользователя
   с 3 полями: login, пароль, повторите пароль. Для пароля требуется предусмотреть
   минимальную валидацию.

4. Страница со списком "избранных фильмов" (данные хранятся в LS).
   Реализовать пагинацию для избранных фильмов.

5. 404 страница.

6. Страница для Error Boundary.
   Так же необходимо предусмотреть ленивую подгрузку контента, лоадеры, обернуть
   приложение в
   Error Boundary (https://ru.reactjs.org/docs/error-boundaries.html#introducing-error-boundaries).

## Требования к проекту.

1. В проекте используются функциональные компоненты c хуками.+
2. Есть четкое разделение на умные и глупые компоненты.+
3. Есть рендеринг списков в компонентах. (минимум в 2).+
4. Реализованы формы в компонентах. (минимуи в 1).+
5. Есть применение React Контекст API.+
6. Есть применение предохранителя.+
7. Есть кастомные хуки (минимум 1).+
8. Используется PropTypes (для проектов без TS) (минимум в 3 компонентах).+
9. Есть кейс с применение Debounce.+
10. Есть применение lazy + Suspense.+
11. В проекте используется Redux Toolkit. +
12. В проекте используется RTK Query.+
13. В проекте есть кастомная мидлвара (минимум 1).(Это кастомный хук?)
14. Регистрация пользователей в приложении осуществляется через LocalStorage.+

## Примечания:

При создании поля поиска не забудьте реализовать debounce, если вешаете запросы на onChange
инпута, либо делайте кнопку для отправки запроса и очищайте после этого поле поиска.
Конечное приложение должно быть развернуто на каком-нибудь сервере и доступно для
просмотра в интернете. Вы можете использовать Github Pages или любое другое решение.
Для вывода контента страницы используйте данные, которые предоставляет API.
Необходимо создать сайт с приятным UI интерфейсом и удобной навигацией. Вы можете усложнить приложение, добавив новые
страницы, анимацию, расширив функционал различными фильтрами, сортировками, поиском.
Использование Type Script приветствуется, но не является обязательным, поскольку для
некоторых эта задача может быть очень сложной.
Будет плюсом (но не обязательно):

1. адаптация сайта под мобильные устройства; +
2. поддержка мультиязычности;-
3. light/dark theme.+
   Постарайтесь реализовать свои идеи и создать хороший продукт. Хорошего коддинга!
