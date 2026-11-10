# Интернет-магазин MVP

Минималистичный интернет-магазин с каталогом товаров и оформлением заказов через WhatsApp.

## Стек

- **Frontend/Backend**: Next.js 15 (App Router) + TypeScript
- **UI**: Tailwind CSS
- **База данных**: Supabase PostgreSQL
- **Авторизация**: Supabase Auth
- **Хранение фото**: Supabase Storage
- **Деплой**: Vercel

---

## Локальный запуск

### 1. Установить зависимости

```bash
npm install
```

### 2. Создать файл `.env.local`

```bash
cp .env.example .env.local
```

Заполните переменные окружения (см. раздел ниже).

### 3. Запустить dev-сервер

```bash
npm run dev
```

Откройте [http://localhost:3000](http://localhost:3000)

---

## Настройка Supabase

### 1. Создайте проект

Зайдите на [supabase.com](https://supabase.com) и создайте новый проект.

### 2. Выполните SQL-миграцию

В разделе **SQL Editor** выполните содержимое файла:

```
supabase/migrations/001_initial.sql
```

Это создаст все таблицы, политики RLS и bucket для хранения фото.

### 3. Получите ключи

В разделе **Settings → API**:
- `Project URL` → `NEXT_PUBLIC_SUPABASE_URL`
- `anon public` → `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `service_role` → `SUPABASE_SERVICE_ROLE_KEY`

---

## Переменные окружения

```env
NEXT_PUBLIC_SUPABASE_URL=https://xxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGci...
SUPABASE_SERVICE_ROLE_KEY=eyJhbGci...
NEXT_PUBLIC_SITE_URL=https://your-domain.com
NEXT_PUBLIC_WHATSAPP_NUMBER=77717011151
```

---

## Создание первого администратора

В Supabase перейдите в **Authentication → Users** и нажмите **Add user**.

Укажите email и пароль. Этот пользователь получит доступ к `/admin`.

Альтернативно — через SQL Editor:

```sql
-- Выполнять в Supabase SQL Editor
select * from auth.users;
```

Или используйте Supabase Dashboard для создания пользователя напрямую.

---

## Деплой на Vercel

1. Подключите репозиторий на [vercel.com](https://vercel.com)
2. Добавьте все переменные окружения в настройках проекта
3. Деплой произойдёт автоматически при push в main

---

## Архитектура

```
src/
  app/
    (shop)/          # Публичная часть магазина
      page.tsx       # Главная + каталог
      products/[slug]/page.tsx  # Страница товара
      pages/[slug]/page.tsx     # Информационные страницы
    admin/           # Административная панель
      login/         # Страница входа
      products/      # Управление товарами
      categories/    # Управление категориями
      pages/         # Редактирование страниц
      analytics/     # Аналитика
  components/
    shop/            # Компоненты магазина
    admin/           # Компоненты админки
    layout/          # Шапка и подвал
  lib/
    actions/         # Server Actions (CRUD операции)
    supabase/        # Клиенты Supabase
    format.ts        # Форматирование цен и WhatsApp URL
    utils.ts         # Вспомогательные функции
  types/
    database.ts      # TypeScript-типы базы данных
```

---

## Что реализовано

- ✅ Главная страница / каталог (3 колонки на десктопе, 2 на мобильном)
- ✅ Фильтрация по категориям
- ✅ Страница товара с галереей фото
- ✅ Кнопка «Оформить заказ» → WhatsApp с подготовленным сообщением
- ✅ Информационные страницы (О нас, Доставка, Оплата, Контакты)
- ✅ Авторизация администратора
- ✅ Управление товарами (создание, редактирование, удаление)
- ✅ Загрузка и управление фотографиями товаров
- ✅ Управление категориями
- ✅ Редактирование информационных страниц
- ✅ Аналитика: просмотры, клики WhatsApp, конверсия
- ✅ SEO: title, description, Open Graph, sitemap.xml, robots.txt
- ✅ Адаптивный дизайн
- ✅ Row Level Security в базе данных

## Что не реализовано (MVP ограничения)

- Онлайн-оплата
- Корзина
- Личный кабинет покупателя
- Управление заказами
- Программа лояльности
