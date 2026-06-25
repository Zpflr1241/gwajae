import { Router } from 'express';
import { CATEGORIES } from '../seed.js';
import { PRODUCT_STATUSES } from '../types.js';

export const metaRouter = Router();

// GET /api/categories — 셀렉트 박스 옵션용
metaRouter.get('/categories', (_req, res) => {
  res.json(CATEGORIES);
});

// GET /api/statuses — 상태 필터/셀렉트용 (라벨 포함)
metaRouter.get('/statuses', (_req, res) => {
  const labels: Record<string, string> = {
    ON_SALE: '판매중',
    SOLD_OUT: '품절',
    DISCONTINUED: '단종',
  };
  res.json(PRODUCT_STATUSES.map((id) => ({ id, name: labels[id] })));
});
