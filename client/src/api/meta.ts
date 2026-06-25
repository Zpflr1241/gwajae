// 카테고리/상태 목록 불러오기
import { api } from './client';
import type { Category, Status } from '../types/product';

export async function fetchCategories(): Promise<Category[]> {
  const res = await api.get<Category[]>('/categories');
  return res.data;
}

export async function fetchStatuses(): Promise<Status[]> {
  const res = await api.get<Status[]>('/statuses');
  return res.data;
}
