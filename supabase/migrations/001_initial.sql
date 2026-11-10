-- Categories
create table if not exists categories (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  slug text not null unique,
  sort_order integer not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- Products
create table if not exists products (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  slug text not null unique,
  price numeric(12,2) not null default 0,
  description text,
  specs jsonb,
  category_id uuid references categories(id) on delete set null,
  status text not null default 'active' check (status in ('active', 'hidden')),
  sort_order integer not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- Product images
create table if not exists product_images (
  id uuid primary key default gen_random_uuid(),
  product_id uuid not null references products(id) on delete cascade,
  url text not null,
  alt text,
  is_primary boolean not null default false,
  sort_order integer not null default 0,
  created_at timestamptz not null default now()
);

-- Static pages
create table if not exists pages (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  title text not null,
  content text,
  updated_at timestamptz not null default now()
);

-- Analytics events
create table if not exists analytics_events (
  id uuid primary key default gen_random_uuid(),
  event_type text not null,
  product_id uuid,
  product_name text,
  page_url text,
  referrer text,
  created_at timestamptz not null default now()
);

-- Seed default pages
insert into pages (slug, title, content) values
  ('about', 'О компании', null),
  ('delivery', 'Доставка', null),
  ('payment', 'Оплата и возврат', null),
  ('contacts', 'Контакты', null)
on conflict (slug) do nothing;

-- RLS policies
alter table categories enable row level security;
alter table products enable row level security;
alter table product_images enable row level security;
alter table pages enable row level security;
alter table analytics_events enable row level security;

-- Public read access
create policy "Public can read categories" on categories for select using (true);
create policy "Public can read active products" on products for select using (status = 'active');
create policy "Public can read product images" on product_images for select using (true);
create policy "Public can read pages" on pages for select using (true);
create policy "Public can insert analytics" on analytics_events for insert with check (true);

-- Admin full access (authenticated users)
create policy "Admin can manage categories" on categories for all using (auth.role() = 'authenticated');
create policy "Admin can manage products" on products for all using (auth.role() = 'authenticated');
create policy "Admin can manage product images" on product_images for all using (auth.role() = 'authenticated');
create policy "Admin can manage pages" on pages for all using (auth.role() = 'authenticated');
create policy "Admin can read analytics" on analytics_events for select using (auth.role() = 'authenticated');

-- Storage bucket for product images
insert into storage.buckets (id, name, public) values ('products', 'products', true)
on conflict (id) do nothing;

create policy "Public can view product images" on storage.objects
  for select using (bucket_id = 'products');

create policy "Authenticated can upload product images" on storage.objects
  for insert with check (bucket_id = 'products' and auth.role() = 'authenticated');

create policy "Authenticated can delete product images" on storage.objects
  for delete using (bucket_id = 'products' and auth.role() = 'authenticated');
