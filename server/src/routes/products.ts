import { Router } from 'express';
import { randomUUID } from 'node:crypto';
import type { Product, ProductStatus, Paginated } from '../types.js';
import { PRODUCT_STATUSES } from '../types.js';
import * as store from '../store.js';
import { validateProductInput } from '../validation.js';

export const productsRouter = Router();

type SortKey = 'createdAt' | 'price' | 'stock' | 'name';

// GET /api/products?search=&category=&status=&sort=&order=&page=&pageSize=
// 목록 + 검색 + 필터 + 정렬 + 페이지네이션을 한 번에 처리한다.
productsRouter.get('/', (req, res) => {
  const search = String(req.query.search ?? '').trim().toLowerCase();
  const category = String(req.query.category ?? '');
  const status = String(req.query.status ?? '') as ProductStatus | '';
  const sort = (String(req.query.sort ?? 'createdAt')) as SortKey;
  const order = String(req.query.order ?? 'desc') === 'asc' ? 'asc' : 'desc';
  const page = Math.max(1, Number(req.query.page) || 1);
  const pageSize = Math.min(100, Math.max(1, Number(req.query.pageSize) || 10));

  let items = store.getAll();

  // 검색: 상품명 또는 SKU 부분 일치
  if (search) {
    items = items.filter(
      (p) => p.name.toLowerCase().includes(search) || p.sku.toLowerCase().includes(search),
    );
  }
  // 필터: 카테고리
  if (category) {
    items = items.filter((p) => p.category === category);
  }
  // 필터: 상태
  if (status && PRODUCT_STATUSES.includes(status)) {
    items = items.filter((p) => p.status === status);
  }

  // 정렬
  items = [...items].sort((a, b) => {
    let cmp = 0;
    if (sort === 'price') cmp = a.price - b.price;
    else if (sort === 'stock') cmp = a.stock - b.stock;
    else if (sort === 'name') cmp = a.name.localeCompare(b.name, 'ko');
    else cmp = a.createdAt.localeCompare(b.createdAt);
    return order === 'asc' ? cmp : -cmp;
  });

  const total = items.length;
  const start = (page - 1) * pageSize;
  const paged = items.slice(start, start + pageSize);

  const body: Paginated<Product> = { items: paged, total, page, pageSize };
  res.json(body);
});

// GET /api/products/:id
productsRouter.get('/:id', (req, res) => {
  const product = store.getById(req.params.id);
  if (!product) {
    return res.status(404).json({ message: '상품을 찾을 수 없습니다.' });
  }
  res.json(product);
});

// POST /api/products
productsRouter.post('/', (req, res) => {
  const { errors, value } = validateProductInput(req.body, 'create');
  if (errors.length > 0) {
    return res.status(400).json({ message: '입력값을 확인해 주세요.', errors });
  }
  // SKU 중복 검사 (서버에서만 알 수 있는 규칙 — 폼 에러 표시 학습용)
  if (value.sku && store.existsBySku(value.sku)) {
    return res.status(409).json({
      message: '이미 존재하는 SKU 입니다.',
      errors: [{ field: 'sku', message: '이미 사용 중인 SKU 입니다.' }],
    });
  }

  const now = new Date().toISOString();
  const product: Product = {
    id: `prd_${randomUUID().slice(0, 8)}`,
    name: value.name!,
    sku: value.sku!,
    category: value.category!,
    price: value.price!,
    stock: value.stock!,
    status: value.status!,
    description: value.description ?? '',
    imageUrl: value.imageUrl ?? '',
    createdAt: now,
    updatedAt: now,
  };
  store.insert(product);
  res.status(201).json(product);
});

// PATCH /api/products/:id  (수정 + 상태 변경 모두 처리)
productsRouter.patch('/:id', (req, res) => {
  const existing = store.getById(req.params.id);
  if (!existing) {
    return res.status(404).json({ message: '상품을 찾을 수 없습니다.' });
  }
  const { errors, value } = validateProductInput(req.body, 'update');
  if (errors.length > 0) {
    return res.status(400).json({ message: '입력값을 확인해 주세요.', errors });
  }
  if (value.sku && store.existsBySku(value.sku, existing.id)) {
    return res.status(409).json({
      message: '이미 존재하는 SKU 입니다.',
      errors: [{ field: 'sku', message: '이미 사용 중인 SKU 입니다.' }],
    });
  }
  const updated = store.update(existing.id, value);
  res.json(updated);
});

// DELETE /api/products/:id
productsRouter.delete('/:id', (req, res) => {
  const ok = store.remove(req.params.id);
  if (!ok) {
    return res.status(404).json({ message: '상품을 찾을 수 없습니다.' });
  }
  res.status(204).end();
});
