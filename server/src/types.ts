// 상품 도메인 타입 정의.
// 프론트엔드(client/src/types/product.ts)와 "모양"을 맞춰 둔다.
// 실무에서는 이 타입을 OpenAPI/스키마로 공유하지만, 학습용이므로 양쪽에 손으로 둔다.

export type ProductStatus = 'ON_SALE' | 'SOLD_OUT' | 'DISCONTINUED';

export const PRODUCT_STATUSES: ProductStatus[] = [
  'ON_SALE',
  'SOLD_OUT',
  'DISCONTINUED',
];

export interface Category {
  id: string;
  name: string;
}

export interface Product {
  id: string;
  name: string;
  sku: string;
  category: string; // Category.id 를 가리킨다
  price: number; // 원 단위 정수
  stock: number; // 재고 수량
  status: ProductStatus;
  description: string;
  imageUrl: string;
  createdAt: string; // ISO 문자열
  updatedAt: string; // ISO 문자열
}

// 목록 응답 형태 (페이지네이션 포함)
export interface Paginated<T> {
  items: T[];
  total: number;
  page: number;
  pageSize: number;
}
