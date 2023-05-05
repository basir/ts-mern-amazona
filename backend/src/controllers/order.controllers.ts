import { Request, Response } from 'express';
import asyncHandler from 'express-async-handler';
import { Order, OrderModel } from '../models/orderModel';
import { Product } from '../models/productModel';

export const getOrders = asyncHandler(async (req: Request, res: Response) => {
  const orders = await OrderModel.find({ user: req.user._id });
  res.json(orders);
});

export const getOrderById = asyncHandler(
  async (req: Request, res: Response) => {
    const order = await OrderModel.findById(req.params.id);
    if (order) {
      res.json(order);
    } else {
      res.status(404).json({ message: 'Order Not Found' });
    }
  }
);

export const createOrder = asyncHandler(async (req: Request, res: Response) => {
  if (req.body.orderItems.length === 0) {
    res.status(400).json({ message: 'Cart is empty' });
  } else {
    const createdOrder = await OrderModel.create({
      orderItems: req.body.orderItems.map((x: Product) => ({
        ...x,
        product: x._id,
      })),
      shippingAddress: req.body.shippingAddress,
      paymentMethod: req.body.paymentMethod,
      itemsPrice: req.body.itemsPrice,
      shippingPrice: req.body.shippingPrice,
      taxPrice: req.body.taxPrice,
      totalPrice: req.body.totalPrice,
      user: req.user._id,
    } as Order);
    res.status(201).json({ message: 'Order Created', order: createdOrder });
  }
});

export const updateOrderToPaid = asyncHandler(
  async (req: Request, res: Response) => {
    const order = await OrderModel.findById(req.params.id);

    if (order) {
      order.isPaid = true;
      order.paidAt = new Date(Date.now());
      order.paymentResult = {
        paymentId: req.body.id,
        status: req.body.status,
        update_time: req.body.update_time,
        email_address: req.body.email_address,
      };
      const updatedOrder = await order.save();

      res.send({ order: updatedOrder, message: 'Order Paid Successfully' });
    } else {
      res.status(404).json({ message: 'Order Not Found' });
    }
  }
);
