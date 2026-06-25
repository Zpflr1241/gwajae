import { readFileSync, writeFileSync, existsSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';
import type { Product } from './types.js';
import { buildSeedProducts } from './seed.js';

// data.json 위치: server/data.json (src 기준 한 단계 위)
const __dirname = dirname(fileURLToPath(import.meta.url));
const DATA_FILE = join(__dirname, '..', 'data.json');

// 아주 단순한 "파일 기반 저장소".
// 실무라면 DB(PostgreSQL 등)를 쓰지만, 학습용이라 JSON 파일 하나로 영속화한다.
// 메모리에 올려 두고, 변경이 생길 때마다 파일에 통째로 다시 쓴다.

let products: Product[] = load();

function load(): Product[] {
  if (existsSync(DATA_FILE)) {
    try {
      const raw = readFileSync(DATA_FILE, 'utf-8');
      return JSON.parse(raw) as Product[];
    } catch {
      // 파일이 깨졌으면 시드로 복구
      console.warn('[store] data.json 파싱 실패 — 시드로 재생성합니다.');
    }
  }
  const seeded = buildSeedProducts();
  persist(seeded);
  return seeded;
}

function persist(next: Product[]): void {
  writeFileSync(DATA_FILE, JSON.stringify(next, null, 2), 'utf-8');
}

export function getAll(): Product[] {
  return products;
}

export function getById(id: string): Product | undefined {
  return products.find((p) => p.id === id);
}

export function insert(product: Product): Product {
  products = [product, ...products];
  persist(products);
  return product;
}

export function update(id: string, patch: Partial<Product>): Product | undefined {
  const idx = products.findIndex((p) => p.id === id);
  if (idx === -1) return undefined;
  const updated: Product = {
    ...products[idx],
    ...patch,
    id, // id 는 절대 바뀌지 않게 고정
    updatedAt: new Date().toISOString(),
  };
  products = products.map((p, i) => (i === idx ? updated : p));
  persist(products);
  return updated;
}

export function remove(id: string): boolean {
  const exists = products.some((p) => p.id === id);
  if (!exists) return false;
  products = products.filter((p) => p.id !== id);
  persist(products);
  return true;
}

export function existsBySku(sku: string, exceptId?: string): boolean {
  return products.some((p) => p.sku === sku && p.id !== exceptId);
}
