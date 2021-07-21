import { MunrosData } from '@/components/Munro';

export const BASE_URL = `http://localhost:3000/api`;

export const queryMunros = async (queryParams: Record<string, string>) => {
  const url = `${BASE_URL}/munros?${new URLSearchParams(queryParams)}`;
  const response = await fetch(url);
  const data: MunrosData = await response.json();
  return data;
};
