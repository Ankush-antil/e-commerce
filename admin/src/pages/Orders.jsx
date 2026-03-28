import React, { useEffect, useState } from 'react'
import { backendUrl, currency } from '../App'
import { toast } from 'react-toastify'
import { assets } from '../assets/assets'
import '../style/Orders.css'
import axios from 'axios'

const Orders = ({ token }) => {
  const [orders, setOrders] = useState([])

  const fetchAllOrders = async () => {
    if (!token) return

    try { 
      const response = await axios.post(
        `${backendUrl}/all-orders`,
        {},
        {
          headers: {
            Authorization: token
          }
        }
)
      const result =  response.data

      if (response.status===200) {
        setOrders(result.data || [])
        console.log('Orders:', result.data)
      } else {
        toast.error(result.message || 'Failed to fetch orders')
      }
    } catch (error) {
      toast.error(error.message)
    }
  }

  const statusHandler = async (orderId, status) => {
    try {  
      const response = await axios.put(`${backendUrl}/update-order-status`,
      { 
      orderId: orderId,
      status: status
        },

       {
          headers: {
            Authorization: token
          }
        })

      
      const result = response.data

      if (response.status===200) {
        const updatedOrders = orders.map((order) =>
          order._id === orderId ? { ...order, status } : order
        )
        setOrders(updatedOrders)
        toast.success('Order status updated successfully')
      } else {
        toast.error(result.message || 'Failed to update order status')
      }
    } catch (error) {
      toast.error(error.message)
    }
  }

  useEffect(() => {
    fetchAllOrders()
  }, [])

  return (
    <div className="orders">

      {orders.length === 0 && <p>No orders found</p>}

      <div className="orders-container">
        {orders.map((order, index) => (
          <div className="order-card" key={order._id || index}>
            <img
              className="order-icon"
             src={order.items?.[0]?.product?.images?.[0]?.url || order.items?.[0]?.product?.images?.[0]}
              alt="parcel"
            />

            <div className="order-details">
              <div className="items">
                {order.items.map((item, i) => (
                  <p className="item-line" key={i}>
                    {item.product?.name} - {item.size} x {item.quantity}
                  </p>
                ))}
              </div>
              <p>{order.address}</p>
            </div>

            <div className="order-meta">
              <p>Items : {order.items.length}</p>
              <p>Method : {order.paymentMethod}</p>
              <p>Payment : {order.payment ? 'Done' : 'Pending'}</p>
              <p>
                Date :{' '}
                {order.date
                  ? new Date(order.date).toLocaleDateString()
                  : 'N/A'}
              </p>
            </div>
            <p className="amount">
              {currency}
              {order.amount}
            </p>
            <select
              className="status-select"
              value={order.status}
              onChange={(e) => statusHandler(order._id, e.target.value)}
            >
              <option value="Order Placed">Order Placed</option>
              <option value="Packing">Packing</option>
              <option value="Shipped">Shipped</option>
              <option value="Out for delivery">Out for delivery</option>
              <option value="Delivered">Delivered</option>
            </select>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Orders