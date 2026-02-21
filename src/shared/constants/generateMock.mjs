import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const mockDataPath = path.join(__dirname, 'mockData.ts');

function generateCategories() {
  const cats = [];
  const names = [
    'Electronics',
    "Men's Fashion",
    "Women's Fashion",
    'Home & Kitchen',
    'Accessories',
    'Gaming',
    'Toys',
    'Sports',
    'Automotive',
    'Health & Beauty',
    'Books',
    'Groceries',
    'Pet Supplies',
    'Office Supplies',
    'Garden & Outdoors',
  ];
  for (let i = 0; i < 15; i++) {
    cats.push({
      id: `cat_${i + 1}`,
      name: names[i] || `Category ${i + 1}`,
      slug: (names[i] || `Category ${i + 1}`).toLowerCase().replace(/[^a-z0-9]+/g, '-'),
      productCount: Math.floor(Math.random() * 200) + 10,
      image: '/assets/promo_2.png',
    });
  }
  return cats;
}

function generateBrands() {
  const brands = [];
  const names = [
    'Sony',
    'Logitech',
    'Apple',
    'Samsung',
    'Nintendo',
    'DJI',
    'Nike',
    'Adidas',
    'Puma',
    'LG',
    'Bose',
    'Philips',
    'Microsoft',
    'Razer',
    'HP',
  ];
  for (let i = 0; i < 15; i++) {
    brands.push({
      id: `brand_${i + 1}`,
      name: names[i],
      slug: names[i].toLowerCase(),
    });
  }
  return brands;
}

function generateUsers() {
  const users = [];
  for (let i = 0; i < 20; i++) {
    users.push({
      id: `usr_${i + 1}`,
      name: `User ${i + 1}`,
      isVerified: Math.random() > 0.5,
    });
  }
  return users;
}

function generateCoupons() {
  const coupons = [];
  for (let i = 0; i < 15; i++) {
    coupons.push({
      id: `coup_${i + 1}`,
      name: `DISCOUNT${i + 1}0`,
      expiresAt: '2025-12-31T23:59:59Z',
      quota: Math.floor(Math.random() * 1000) + 100,
    });
  }
  return coupons;
}

function generateProducts() {
  const products = [];
  for (let i = 0; i < 15; i++) {
    const price = Math.floor(Math.random() * 1000) + 50;
    const discount = Math.floor(Math.random() * 30);
    products.push({
      id: `prod_${i + 1}`,
      name: `Amazing Product ${i + 1}`,
      slug: `amazing-product-${i + 1}`,
      price: price * (1 - discount / 100),
      originalPrice: price,
      sku: `SKU-${i + 1}000`,
      inStock: true,
      stockStatus: 'In Stock',
      discounted: discount,
      discount: discount,
      rating: +(Math.random() * 2 + 3).toFixed(1), // 3.0 to 5.0
      image: `/images/products/product-${(i % 5) + 1}a.png`, // cycle through 1 to 5 to reuse images
      images: [`/images/products/product-${(i % 5) + 1}a.png`, `/images/products/product-${(i % 5) + 1}b.png`],
      brandId: `brand_${(i % 15) + 1}`,
      categoryIds: [`cat_${(i % 15) + 1}`, `cat_${((i + 1) % 15) + 1}`],
      colors: ['#000000', '#FFFFFF', '#FF0000'].slice(0, Math.floor(Math.random() * 3) + 1),
      sizes: ['S', 'M', 'L', 'XL'].slice(0, Math.floor(Math.random() * 4) + 1),
      tags: ['Featured', 'Trending', 'New'],
      specifications: [
        { key: 'Weight', value: `${Math.floor(Math.random() * 100)}g` },
        { key: 'Material', value: 'Premium' },
      ],
      description: `This is the amazing description for Amazing Product ${i + 1}. It has all the features you will ever need.`,
      couponIds: [`coup_${(i % 15) + 1}`],
    });
  }
  return products;
}

function generateRatings(products) {
  const ratings = [];
  products.forEach((p) => {
    // We want at least 12 total reviews/ratings
    // We will generate the numbers ensuring they sum to at least 12. Let's say 20.
    ratings.push({
      id: `rtg_${p.id}`,
      productId: p.id,
      rating: p.rating,
      oneStar: Math.floor(Math.random() * 2),
      twoStar: Math.floor(Math.random() * 2),
      threeStar: Math.floor(Math.random() * 5),
      fourStar: Math.floor(Math.random() * 10) + 2,
      fiveStar: Math.floor(Math.random() * 20) + 5,
    });
  });
  return ratings;
}

function generateReviews(products, users) {
  const reviews = [];
  let reviewIdCounter = 1;

  products.forEach((p) => {
    // generate 15 reviews per product
    for (let i = 0; i < 15; i++) {
      const userIndex = Math.floor(Math.random() * users.length);
      reviews.push({
        id: `rev_${reviewIdCounter++}`,
        productId: p.id,
        userId: users[userIndex].id,
        rating: Math.floor(Math.random() * 2) + 4, // 4 or 5
        createdAt: `2024-${String(Math.floor(Math.random() * 11) + 1).padStart(2, '0')}-${String(Math.floor(Math.random() * 27) + 1).padStart(2, '0')}T10:00:00Z`,
        likes: Math.floor(Math.random() * 50),
        images: i % 3 === 0 ? [`/images/products/product-${(parseInt(p.id.split('_')[1]) % 2) + 1}a.png`] : [],
        comment: [
          'Great product!',
          'Not bad, quite decent.',
          'Highly recommended!',
          'Excellent quality for the price.',
          'Will buy again.',
        ][Math.floor(Math.random() * 5)],
      });
    }
  });
  return reviews;
}

function generateQnA(products, users) {
  const qna = [];
  let qaIdCounter = 1;

  products.forEach((p) => {
    // generate 12 QnAs per product
    for (let i = 0; i < 12; i++) {
      const userIndex = Math.floor(Math.random() * users.length);
      qna.push({
        id: `qna_${qaIdCounter++}`,
        productId: p.id,
        userId: users[userIndex].id,
        question: `Question ${i + 1} about this ${p.name}?`,
        answer: i % 4 !== 0 ? `This is the official answer to question ${i + 1} providing much detail.` : null,
        createdAt: `2024-${String(Math.floor(Math.random() * 11) + 1).padStart(2, '0')}-${String(Math.floor(Math.random() * 27) + 1).padStart(2, '0')}T12:00:00Z`,
      });
    }
  });
  return qna;
}

const content = fs.readFileSync(mockDataPath, 'utf-8');

const markerStart =
  '// ----------------------------------------------------------------------------\n// RAW MOCK DATA Arrays\n// ----------------------------------------------------------------------------';
const markerEnd =
  '// ----------------------------------------------------------------------------\n// ASSEMBLED DATA (The "Join" simulation)\n// ----------------------------------------------------------------------------';

const startIndex = content.indexOf(markerStart);
const endIndex = content.indexOf(markerEnd);

if (startIndex !== -1 && endIndex !== -1) {
  const topPart = content.slice(0, startIndex + markerStart.length);
  const bottomPart = content.slice(endIndex);

  const categories = generateCategories();
  const brands = generateBrands();
  const users = generateUsers();
  const coupons = generateCoupons();
  const products = generateProducts();
  const ratings = generateRatings(products);
  const reviews = generateReviews(products, users);
  const qna = generateQnA(products, users);

  const middlePart = `

export const categories: Category[] = ${JSON.stringify(categories, null, 2)};

export const brands: Brand[] = ${JSON.stringify(brands, null, 2)};

export const mockUsers: User[] = ${JSON.stringify(users, null, 2)};

export const coupons: Coupon[] = ${JSON.stringify(coupons, null, 2)};

export const rawVariants: (Variant & { productId: string })[] = [];

export const rawRatings: RawRating[] = ${JSON.stringify(ratings, null, 2)};

export const rawReviews: RawReview[] = ${JSON.stringify(reviews, null, 2)};

export const rawQnA: RawQnA[] = ${JSON.stringify(qna, null, 2)};

export const rawProducts: RawProduct[] = ${JSON.stringify(products, null, 2)};

`;

  const newContent = topPart + middlePart + bottomPart;
  fs.writeFileSync(mockDataPath, newContent, 'utf-8');
  console.log('Successfully updated mockData.ts with large generated dataset.');
} else {
  console.error('Could not find markers to replace content.');
}
