import express from 'express';
import { isAuth } from '../utils';
import {
  createOrder,
  getOrderById,
  getOrders,
  updateOrderToPaid,
} from '../controllers/order.controllers';

export const orderRouter = express.Router();

orderRouter.get('/mine', isAuth, getOrders);

orderRouter.get('/:id', isAuth, getOrderById);

orderRouter.post('/', isAuth, createOrder);

orderRouter.put('/:id/pay', isAuth, updateOrderToPaid);
