import type { Category, Product, ProductStatus } from './types.js';

export const CATEGORIES: Category[] = [
  { id: 'electronics', name: '전자기기' },
  { id: 'fashion', name: '패션의류' },
  { id: 'food', name: '식품' },
  { id: 'book', name: '도서' },
  { id: 'beauty', name: '뷰티' },
  { id: 'sports', name: '스포츠' },
];

// 시드용 상품 30개. data.json 이 없을 때 한 번 생성된다.
const rawProducts: Array<
  Pick<Product, 'name' | 'sku' | 'category' | 'price' | 'stock' | 'status' | 'description'>
> = [
  { name: '무선 블루투스 이어폰', sku: 'EL-1001', category: 'electronics', price: 89000, stock: 120, status: 'ON_SALE', description: '노이즈 캔슬링을 지원하는 무선 이어폰.' },
  { name: '기계식 키보드 (적축)', sku: 'EL-1002', category: 'electronics', price: 119000, stock: 45, status: 'ON_SALE', description: '핫스왑이 가능한 텐키리스 기계식 키보드.' },
  { name: '27인치 4K 모니터', sku: 'EL-1003', category: 'electronics', price: 329000, stock: 0, status: 'SOLD_OUT', description: 'USB-C 65W 충전을 지원하는 4K 모니터.' },
  { name: '휴대용 보조배터리 20000mAh', sku: 'EL-1004', category: 'electronics', price: 39000, stock: 230, status: 'ON_SALE', description: '고속 충전을 지원하는 대용량 보조배터리.' },
  { name: '스마트워치 5세대', sku: 'EL-1005', category: 'electronics', price: 259000, stock: 12, status: 'ON_SALE', description: '심박/수면 측정 기능을 갖춘 스마트워치.' },
  { name: '구형 USB 허브', sku: 'EL-1006', category: 'electronics', price: 15000, stock: 0, status: 'DISCONTINUED', description: '단종된 USB 2.0 허브.' },
  { name: '코튼 오버핏 티셔츠', sku: 'FA-2001', category: 'fashion', price: 24900, stock: 300, status: 'ON_SALE', description: '사계절 입기 좋은 기본 코튼 티셔츠.' },
  { name: '데님 와이드 팬츠', sku: 'FA-2002', category: 'fashion', price: 49000, stock: 80, status: 'ON_SALE', description: '편안한 핏의 데님 와이드 팬츠.' },
  { name: '경량 패딩 점퍼', sku: 'FA-2003', category: 'fashion', price: 89000, stock: 5, status: 'ON_SALE', description: '가볍고 따뜻한 경량 패딩.' },
  { name: '울 머플러', sku: 'FA-2004', category: 'fashion', price: 32000, stock: 0, status: 'SOLD_OUT', description: '부드러운 울 소재 머플러.' },
  { name: '캔버스 스니커즈', sku: 'FA-2005', category: 'fashion', price: 59000, stock: 60, status: 'ON_SALE', description: '데일리로 신기 좋은 캔버스 스니커즈.' },
  { name: '유기농 원두 1kg', sku: 'FO-3001', category: 'food', price: 28000, stock: 150, status: 'ON_SALE', description: '미디엄 로스팅 유기농 커피 원두.' },
  { name: '제주 감귤 5kg', sku: 'FO-3002', category: 'food', price: 19900, stock: 40, status: 'ON_SALE', description: '제철 제주 감귤 박스.' },
  { name: '수제 그래놀라 500g', sku: 'FO-3003', category: 'food', price: 12900, stock: 0, status: 'SOLD_OUT', description: '견과류가 듬뿍 들어간 수제 그래놀라.' },
  { name: '국산 벌꿀 1.2kg', sku: 'FO-3004', category: 'food', price: 35000, stock: 25, status: 'ON_SALE', description: '아카시아 벌꿀.' },
  { name: '클린 코드', sku: 'BO-4001', category: 'book', price: 33000, stock: 90, status: 'ON_SALE', description: '소프트웨어 장인 정신에 관한 고전.' },
  { name: '모던 자바스크립트 입문', sku: 'BO-4002', category: 'book', price: 36000, stock: 70, status: 'ON_SALE', description: 'ES2015 이후의 자바스크립트를 다룬 입문서.' },
  { name: '리팩터링 2판', sku: 'BO-4003', category: 'book', price: 45000, stock: 0, status: 'SOLD_OUT', description: '코드를 개선하는 기법을 정리한 책.' },
  { name: '오브젝트', sku: 'BO-4004', category: 'book', price: 36000, stock: 33, status: 'ON_SALE', description: '객체지향 설계의 원리.' },
  { name: '절판된 알고리즘 교재', sku: 'BO-4005', category: 'book', price: 28000, stock: 0, status: 'DISCONTINUED', description: '더 이상 인쇄되지 않는 교재.' },
  { name: '수분 진정 토너 300ml', sku: 'BE-5001', category: 'beauty', price: 22000, stock: 200, status: 'ON_SALE', description: '민감성 피부용 진정 토너.' },
  { name: '비타민 C 세럼 30ml', sku: 'BE-5002', category: 'beauty', price: 31000, stock: 18, status: 'ON_SALE', description: '브라이트닝 비타민 C 세럼.' },
  { name: '선크림 SPF50+ 50ml', sku: 'BE-5003', category: 'beauty', price: 18000, stock: 0, status: 'SOLD_OUT', description: '끈적임 없는 데일리 선크림.' },
  { name: '립밤 세트', sku: 'BE-5004', category: 'beauty', price: 14000, stock: 75, status: 'ON_SALE', description: '3종 컬러 립밤 세트.' },
  { name: '요가 매트 6mm', sku: 'SP-6001', category: 'sports', price: 27000, stock: 110, status: 'ON_SALE', description: '미끄럼 방지 처리된 요가 매트.' },
  { name: '러닝화 280mm', sku: 'SP-6002', category: 'sports', price: 99000, stock: 8, status: 'ON_SALE', description: '쿠셔닝이 좋은 경량 러닝화.' },
  { name: '아령 5kg 세트', sku: 'SP-6003', category: 'sports', price: 42000, stock: 0, status: 'SOLD_OUT', description: '코팅 처리된 아령 한 쌍.' },
  { name: '등산 스틱', sku: 'SP-6004', category: 'sports', price: 38000, stock: 50, status: 'ON_SALE', description: '접이식 경량 등산 스틱.' },
  { name: '농구공 7호', sku: 'SP-6005', category: 'sports', price: 35000, stock: 22, status: 'ON_SALE', description: '실내외 겸용 농구공.' },
  { name: '단종된 스마트밴드', sku: 'EL-1007', category: 'electronics', price: 29000, stock: 0, status: 'DISCONTINUED', description: '서비스가 종료된 구형 스마트밴드.' },
];

// 시드 데이터에 id/이미지/타임스탬프를 채워서 완전한 Product 배열로 만든다.
export function buildSeedProducts(): Product[] {
  const base = new Date('2025-01-01T00:00:00.000Z').getTime();
  return rawProducts.map((p, i) => {
    // 생성 시각을 조금씩 다르게 흩뿌려 정렬 학습에 쓰기 좋게 한다.
    const createdAt = new Date(base + i * 36e5 * 7).toISOString();
    return {
      id: `prd_${String(i + 1).padStart(4, '0')}`,
      ...p,
      imageUrl: `https://picsum.photos/seed/${p.sku}/200/200`,
      createdAt,
      updatedAt: createdAt,
    } satisfies Product;
  });
}

// 새 상품의 기본 상태값 — 폼에서 status 미입력 시 사용
export const DEFAULT_STATUS: ProductStatus = 'ON_SALE';
