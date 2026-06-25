// 서버(server/src/types.ts)와 "모양"을 맞춰 둔 도메인 타입.

export type ProductStatus = 'ON_SALE' | 'SOLD_OUT' | 'DISCONTINUED';

export interface Category {
  id: string;
  name: string;
}

// GET /api/statuses 응답 (id + 한글 라벨)
export interface Status {
  id: ProductStatus;
  name: string;
}

export interface Product {
  id: string;
  name: string;
  sku: string;
  category: string; // Category.id
  price: number;
  stock: number;
  status: ProductStatus;
  description: string;
  imageUrl: string;
  createdAt: string;
  updatedAt: string;
}

// 목록 응답 (페이지네이션)
export interface Paginated<T> {
  items: T[];
  total: number;
  page: number;
  pageSize: number;
}

// 생성/수정 시 폼이 보내는 입력값
export interface ProductInput {
  name: string;
  sku: string;
  category: string;
  price: number;
  stock: number;
  status: ProductStatus;
  description?: string;
  imageUrl?: string;
}

// 목록 조회 쿼리 파라미터
export interface ProductQuery {
  search?: string;
  category?: string;
  status?: ProductStatus | '';
  sort?: 'createdAt' | 'price' | 'stock' | 'name';
  order?: 'asc' | 'desc';
  page?: number;
  pageSize?: number;
}
