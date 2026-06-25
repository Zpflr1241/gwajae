export type ProductStatus = 'ON_SALE' | 'SOLD_OUT' | 'DISCONTINUED'; // 그냥 타입

export interface Category { // 객체에 타입 지정, 객체에게만
    id: string;
    name: string;
}

export interface StatusOption {
    id: ProductStatus;
    name: string;
}

export interface Product {
    id: string;
    name: string;
    sku: string;
    category: string;
    price: number;
    stock: number;
    status: ProductStatus;
    description: string;
    imageUrl: string;
    createdAt: string;
    updatedAt: string;
}

export interface Paginated<T> {
    items: T[];
    total: number;
    page: number;
    pageSize: number;
}

export interface ProductInput {
    name: string;
    sku: string; // 서버가 채우는 값, 예제라 넣음
    category: string;
    price: number;
    stock: number;
    status: ProductStatus;
    description: string;
    imageUrl: string;
} // 받는 객체는 보통 input을 붙임

export interface productQuery {
    search?: string; // 옵션
    category?: string;
    status?: ProductStatus | '';
    sort?: "createdAt" | 'price' | 'stock' | 'name';
    order?: 'asc' | 'desc';
    page?: number;
    pageSize?: number;
}

export interface FieldError {
    field: string;
    message: string;
}

export interface ApiError {
    message: string;
    error?: FieldError[];
}


// export interface Product {
//   id: string;
//   name: string;
//   sku: string;
//   category: string; // Category.id 를 가리킨다
//   price: number; // 원 단위 정수
//   stock: number; // 재고 수량
//   status: ProductStatus;
//   description: string;
//   imageUrl: string;
//   createdAt: string; // ISO 문자열
//   updatedAt: string; // ISO 문자열
// }