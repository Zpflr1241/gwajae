import { CATEGORIES } from './seed.js';
import { PRODUCT_STATUSES, type Product, type ProductStatus } from './types.js';

export interface FieldError {
  field: string;
  message: string;
}

const categoryIds = new Set(CATEGORIES.map((c) => c.id));
const statusSet = new Set<ProductStatus>(PRODUCT_STATUSES);

// 입력값(body)을 검증하고, 통과하면 정제된 상품 필드를 돌려준다.
// mode 가 'create' 면 모든 필드 필수, 'update' 면 들어온 필드만 검증한다.
export function validateProductInput(
  body: unknown,
  mode: 'create' | 'update',
): { errors: FieldError[]; value: Partial<Product> } {
  const errors: FieldError[] = [];
  const value: Partial<Product> = {};
  const b = (body ?? {}) as Record<string, unknown>;

  const has = (key: string) => b[key] !== undefined && b[key] !== null;
  const required = (key: string) => mode === 'create' || has(key);

  // name
  if (required('name')) {
    const name = String(b.name ?? '').trim();
    if (name.length < 2) errors.push({ field: 'name', message: '상품명은 2자 이상이어야 합니다.' });
    else if (name.length > 100) errors.push({ field: 'name', message: '상품명은 100자 이하여야 합니다.' });
    else value.name = name;
  }

  // sku
  if (required('sku')) {
    const sku = String(b.sku ?? '').trim().toUpperCase();
    if (!/^[A-Z]{2}-\d{4}$/.test(sku)) {
      errors.push({ field: 'sku', message: 'SKU 형식은 영문 2자-숫자 4자 입니다. 예: EL-1001' });
    } else {
      value.sku = sku;
    }
  }

  // category
  if (required('category')) {
    const category = String(b.category ?? '');
    if (!categoryIds.has(category)) {
      errors.push({ field: 'category', message: '존재하지 않는 카테고리입니다.' });
    } else {
      value.category = category;
    }
  }

  // price
  if (required('price')) {
    const price = Number(b.price);
    if (!Number.isFinite(price) || price < 0) {
      errors.push({ field: 'price', message: '가격은 0 이상의 숫자여야 합니다.' });
    } else if (price > 100_000_000) {
      errors.push({ field: 'price', message: '가격이 너무 큽니다.' });
    } else {
      value.price = Math.round(price);
    }
  }

  // stock
  if (required('stock')) {
    const stock = Number(b.stock);
    if (!Number.isInteger(stock) || stock < 0) {
      errors.push({ field: 'stock', message: '재고는 0 이상의 정수여야 합니다.' });
    } else {
      value.stock = stock;
    }
  }

  // status
  if (required('status')) {
    const status = b.status as ProductStatus;
    if (!statusSet.has(status)) {
      errors.push({ field: 'status', message: '유효하지 않은 판매 상태입니다.' });
    } else {
      value.status = status;
    }
  }

  // description (선택)
  if (has('description')) {
    const description = String(b.description ?? '').trim();
    if (description.length > 500) {
      errors.push({ field: 'description', message: '설명은 500자 이하여야 합니다.' });
    } else {
      value.description = description;
    }
  } else if (mode === 'create') {
    value.description = '';
  }

  // imageUrl (선택)
  if (has('imageUrl')) {
    value.imageUrl = String(b.imageUrl ?? '').trim();
  } else if (mode === 'create') {
    value.imageUrl = '';
  }

  return { errors, value };
}
