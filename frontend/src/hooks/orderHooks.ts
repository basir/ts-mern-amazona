import { useMutation, useQuery } from '@tanstack/react-query';
import {
  createOrder,
  getOrderDetails,
  getOrderHistory,
  getPaypalClientId,
  payOrder,
} from '../services/order';

export const useGetOrderDetailsQuery = (id: string) =>
  useQuery({
    queryKey: ['orders', id],
    queryFn: () => getOrderDetails(id),
  });

export const useGetPaypalClientIdQuery = () =>
  useQuery({
    queryKey: ['paypal-clientId'],
    queryFn: () => getPaypalClientId(),
  });

export const usePayOrderMutation = () =>
  useMutation({
    mutationFn: (details: { orderId: string }) => payOrder(details),
  });

export const useCreateOrderMutation = () =>
  useMutation({
    mutationFn: createOrder,
  });

export const useGetOrderHistoryQuery = () =>
  useQuery({
    queryKey: ['order-history'],
    queryFn: getOrderHistory,
  });
