import { createClient } from '@supabase/supabase-js'
import * as dotenv from 'dotenv'
import * as path from 'path'

dotenv.config({ path: path.resolve(__dirname, '../.env.local') })

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

const PLACEHOLDER = 'https://images.unsplash.com/photo'

const images = {
  bag1:    `${PLACEHOLDER}-1548036328-c9fa89d128fa?w=800&q=80`,
  bag2:    `${PLACEHOLDER}-1590874103328-eac38a683ce7?w=800&q=80`,
  bag3:    `${PLACEHOLDER}-1553062407-98eeb64c6a62?w=800&q=80`,
  watch1:  `${PLACEHOLDER}-1523275335684-37898b6baf30?w=800&q=80`,
  watch2:  `${PLACEHOLDER}-1546868871-7041f2a55e12?w=800&q=80`,
  shoes1:  `${PLACEHOLDER}-1542291026-7eec264c27ff?w=800&q=80`,
  shoes2:  `${PLACEHOLDER}-1491553895911-0055eca6402d?w=800&q=80`,
  shoes3:  `${PLACEHOLDER}-1600185365483-26d7a4cc7519?w=800&q=80`,
  tshirt1: `${PLACEHOLDER}-1521572163474-6864f9cf17ab?w=800&q=80`,
  tshirt2: `${PLACEHOLDER}-1583743814966-8d20eb5a0d3c?w=800&q=80`,
  pants1:  `${PLACEHOLDER}-1624378439575-d8705ad7ae80?w=800&q=80`,
  jacket1: `${PLACEHOLDER}-1591047139829-d91aecb6caea?w=800&q=80`,
}

async function seed() {
  console.log('🌱 Seeding...')

  // Categories
  const { data: cats, error: catsErr } = await supabase
    .from('categories')
    .upsert([
      { name: 'Сумки', slug: 'bags', sort_order: 1 },
      { name: 'Часы', slug: 'watches', sort_order: 2 },
      { name: 'Обувь', slug: 'shoes', sort_order: 3 },
      { name: 'Одежда', slug: 'clothing', sort_order: 4 },
    ], { onConflict: 'slug' })
    .select()

  if (catsErr) { console.error(catsErr); process.exit(1) }
  console.log('✓ Categories:', cats!.map(c => c.name).join(', '))

  const bySlug = Object.fromEntries(cats!.map(c => [c.slug, c.id]))

  // Products
  const products = [
    {
      name: 'Кожаная сумка «Классик»',
      slug: 'leather-bag-classic',
      price: 45000,
      description: 'Вместительная сумка из натуральной телячьей кожи. Два основных отделения, внутренний карман на молнии. Металлическая фурнитура цвета золото.',
      category_id: bySlug['bags'],
      status: 'active',
      specs: { Материал: 'Натуральная кожа', Размер: '38 × 28 × 12 см', Цвет: 'Коньяк', Страна: 'Италия' },
      image: images.bag1,
    },
    {
      name: 'Мини-сумка через плечо',
      slug: 'mini-crossbody',
      price: 28000,
      description: 'Компактная сумочка на длинном ремешке. Идеально для города — помещает телефон, карты и ключи.',
      category_id: bySlug['bags'],
      status: 'active',
      specs: { Материал: 'Эко-кожа', Размер: '20 × 15 × 6 см', Цвет: 'Чёрный' },
      image: images.bag2,
    },
    {
      name: 'Тоут «Минимал»',
      slug: 'tote-minimal',
      price: 19500,
      description: 'Вместительный шоппер из плотного текстиля. Подходит для работы, шопинга или пляжа.',
      category_id: bySlug['bags'],
      status: 'active',
      specs: { Материал: 'Парусина', Размер: '42 × 38 × 10 см', Цвет: 'Экрю' },
      image: images.bag3,
    },
    {
      name: 'Часы «Монохром»',
      slug: 'watch-monochrome',
      price: 89000,
      description: 'Минималистичные часы с японским механизмом Miyota. Сапфировое стекло, водозащита 50 м. Ремешок из натуральной кожи.',
      category_id: bySlug['watches'],
      status: 'active',
      specs: { Механизм: 'Miyota 9015', Диаметр: '40 мм', Стекло: 'Сапфировое', Водозащита: '5 ATM' },
      image: images.watch1,
    },
    {
      name: 'Смарт-часы Pro',
      slug: 'smartwatch-pro',
      price: 125000,
      description: 'Умные часы с AMOLED-дисплеем, мониторингом здоровья и автономностью до 14 дней.',
      category_id: bySlug['watches'],
      status: 'active',
      specs: { Дисплей: 'AMOLED 1.4"', Автономность: '14 дней', GPS: 'Есть', Водозащита: 'IP68' },
      image: images.watch2,
    },
    {
      name: 'Кроссовки «Коммут»',
      slug: 'sneakers-commute',
      price: 32000,
      description: 'Лёгкие кроссовки для города. Дышащий верх из сетки, амортизирующая подошва EVA.',
      category_id: bySlug['shoes'],
      status: 'active',
      specs: { Верх: 'Сетка / кожа', Подошва: 'EVA', Размеры: '36–45', Цвет: 'Белый/Серый' },
      image: images.shoes1,
    },
    {
      name: 'Лоферы «Классик»',
      slug: 'loafers-classic',
      price: 56000,
      description: 'Классические лоферы из гладкой кожи. Удобная колодка, ручная отделка.',
      category_id: bySlug['shoes'],
      status: 'active',
      specs: { Материал: 'Натуральная кожа', Подкладка: 'Натуральная кожа', Размеры: '36–45', Цвет: 'Чёрный' },
      image: images.shoes2,
    },
    {
      name: 'Кеды «Монохром»',
      slug: 'canvas-mono',
      price: 15500,
      description: 'Простые парусиновые кеды — основа любого образа. Вулканизированная подошва.',
      category_id: bySlug['shoes'],
      status: 'active',
      specs: { Верх: 'Парусина', Подошва: 'Резина', Размеры: '36–46', Цвет: 'Молочный' },
      image: images.shoes3,
    },
    {
      name: 'Футболка оверсайз',
      slug: 'tshirt-oversized',
      price: 7900,
      description: '100% хлопок плотностью 220 г/м². Усиленные швы, дропшолдер. Не садится после стирки.',
      category_id: bySlug['clothing'],
      status: 'active',
      specs: { Состав: '100% хлопок', Плотность: '220 г/м²', Размеры: 'XS–3XL', Цвет: 'Белый' },
      image: images.tshirt1,
    },
    {
      name: 'Футболка «Базовая»',
      slug: 'tshirt-basic',
      price: 5900,
      description: 'Слимфит из мягкого джерси. Идеальная база для любого образа.',
      category_id: bySlug['clothing'],
      status: 'active',
      specs: { Состав: '95% хлопок, 5% эластан', Размеры: 'XS–2XL', Цвет: 'Чёрный' },
      image: images.tshirt2,
    },
    {
      name: 'Брюки «Прямой крой»',
      slug: 'trousers-straight',
      price: 24000,
      description: 'Прямые брюки из шерстяного габардина. Два боковых кармана, карман сзади.',
      category_id: bySlug['clothing'],
      status: 'active',
      specs: { Состав: '70% шерсть, 30% полиэстер', Крой: 'Прямой', Размеры: 'XS–XL', Цвет: 'Тёмно-синий' },
      image: images.pants1,
    },
    {
      name: 'Куртка «Бомбер»',
      slug: 'jacket-bomber',
      price: 68000,
      description: 'Классический бомбер из нейлона. Подкладка из флиса. Подходит для межсезонья.',
      category_id: bySlug['clothing'],
      status: 'active',
      specs: { Верх: '100% нейлон', Подкладка: 'Флис', Размеры: 'XS–XL', Цвет: 'Оливковый' },
      image: images.jacket1,
    },
  ]

  for (const p of products) {
    const { image, ...productData } = p
    const { data: prod, error } = await supabase
      .from('products')
      .upsert({ ...productData }, { onConflict: 'slug' })
      .select()
      .single()

    if (error) { console.error('Product error:', p.name, error.message); continue }

    // Add image
    await supabase.from('product_images').upsert({
      product_id: prod.id,
      url: image,
      alt: p.name,
      is_primary: true,
      sort_order: 0,
    })

    console.log('✓', prod.name, '—', prod.price, '₸')
  }

  console.log('\n✅ Done! Open http://localhost:3000 to see the catalog.')
}

seed().catch(console.error)
