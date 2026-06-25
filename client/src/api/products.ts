// fetchProducts | fetchProduct(단일) | create | update | delete
// 컴포넌트가 직접 axios를 쓰지 않도록 한 겹 감싼다.
// 성공 시 response.data 만 반환하고, 실패 시 에러는 잡지 않고 그대로 전파한다.
import { api } from './client';
import type {
  Paginated,
  Product,
  ProductInput,
  ProductQuery,
} from '../types/product';

// 목록 + 검색 + 필터 + 정렬 + 페이지네이션
export async function fetchProducts(
  query: ProductQuery = {},
): Promise<Paginated<Product>> {
  const res = await api.get<Paginated<Product>>('/products', {
    // undefined/'' 값은 axios가 자동으로 빼고 보낸다.
    params: query,
  });
  return res.data;
}

// 단일 조회
export async function fetchProduct(id: string): Promise<Product> {
  const res = await api.get<Product>(`/products/${id}`);
  return res.data;
}

// 생성
export async function createProduct(input: ProductInput): Promise<Product> {
  const res = await api.post<Product>('/products', input);
  return res.data;
}

// 수정 (들어온 필드만 보낸다 → Partial)
export async function updateProduct(
  id: string,
  input: Partial<ProductInput>,
): Promise<Product> {
  const res = await api.patch<Product>(`/products/${id}`, input);
  return res.data;
}

// 삭제 (204 No Content → 반환값 없음)
export async function deleteProduct(id: string): Promise<void> {
  await api.delete(`/products/${id}`);
}
