/**
 * Order Routes
 * API endpoints for order management
 */

const express = require('express');
const router = express.Router();
const OrderController = require('./orderController');

/**
 * POST /api/orders
 * Create a new order
 */
router.post('/', (req, res) => {
  try {
    const { userId, items, shippingAddress, paymentMethod } = req.body;
    
    const order = OrderController.createOrder({
      userId,
      items,
      shippingAddress,
      paymentMethod
    });

    res.status(201).json({
      success: true,
      message: 'Order created successfully',
      data: order
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
});

/**
 * GET /api/orders/:orderId
 * Get order by ID
 */
router.get('/:orderId', (req, res) => {
  try {
    const { orderId } = req.params;
    const order = OrderController.getOrderById(orderId);

    res.status(200).json({
      success: true,
      data: order
    });
  } catch (error) {
    res.status(404).json({
      success: false,
      message: error.message
    });
  }
});

/**
 * PUT /api/orders/:orderId/status
 * Update order status
 */
router.put('/:orderId/status', (req, res) => {
  try {
    const { orderId } = req.params;
    const { status } = req.body;

    if (!status) {
      return res.status(400).json({
        success: false,
        message: 'Status is required'
      });
    }

    const updatedOrder = OrderController.updateOrderStatus(orderId, status);

    res.status(200).json({
      success: true,
      message: 'Order status updated successfully',
      data: updatedOrder
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
});

/**
 * DELETE /api/orders/:orderId
 * Cancel an order
 */
router.delete('/:orderId', (req, res) => {
  try {
    const { orderId } = req.params;
    const cancelledOrder = OrderController.updateOrderStatus(orderId, 'cancelled');

    res.status(200).json({
      success: true,
      message: 'Order cancelled successfully',
      data: cancelledOrder
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
});

module.exports = router;
