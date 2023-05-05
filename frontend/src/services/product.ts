import apiClient from '../apiClient';
import { Product } from '../types/Product';

export const getProducts = async () => {
  return await apiClient
    .get<Product[]>(`api/products`)
    .then((response) => response.data);
};

export const getProductDetailsBySlug = async (slug: string) => {
  return await apiClient
    .get<Product>(`api/products/slug/${slug}`)
    .then((response) => response.data);
};

export const getProductCategories = async () => {
  return await apiClient
    .get<[]>(`/api/products/categories`)
    .then((response) => response.data);
};
