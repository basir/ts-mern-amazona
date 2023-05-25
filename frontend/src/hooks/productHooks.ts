import { useQuery } from '@tanstack/react-query';
import {
  getProductCategories,
  getProductDetailsBySlug,
  getProducts,
} from '../services/product';

export const useGetProductsQuery = () =>
  useQuery({
    queryKey: ['products'],
    queryFn: getProducts,
  });

export const useGetProductDetailsBySlugQuery = (slug: string) =>
  useQuery({
    queryKey: ['products', slug],
    queryFn: () => getProductDetailsBySlug(slug),
  });

export const useGetProductCategoriesQuery = () =>
  useQuery({
    queryKey: ['categories'],
    queryFn: getProductCategories,
  });
