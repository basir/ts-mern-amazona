import apiClient from '../apiClient';
import { CartItem, ShippingAddress } from '../types/Cart';
import { Order } from '../types/Order';

export const getOrderDetails = async (id: string) => {
  const response = await apiClient.get<Order>(`api/orders/${id}`);
  return response.data;
};

export const getPaypalClientId = async () => {
  const response = await apiClient.get<{ clientId: string }>(
    `/api/keys/paypal`
  );
  return response.data;
};

export const payOrder = async (details: { orderId: string }) => {
  const response = await apiClient.put<{ message: string; order: Order }>(
    `api/orders/${details.orderId}/pay`,
    details
  );
  return response.data;
};

export const createOrder = async (order: {
  orderItems: CartItem[];
  shippingAddress: ShippingAddress;
  paymentMethod: string;
  itemsPrice: number;
  shippingPrice: number;
  taxPrice: number;
  totalPrice: number;
}) => {
  const response = await apiClient.post<{ message: string; order: Order }>(
    'api/orders',
    order
  );
  return response.data;
};

export const getOrderHistory = async () => {
  const response = await apiClient.get<Order[]>('/api/orders/mine');
  return response.data;
};
