import React, { useContext, useEffect, useState } from 'react';
import { ShopContext } from '../context/ShopContext';
import Title from '../components/Title';
 import axios from 'axios';
import '../style/Orders.css';
import { toast } from 'react-toastify';

const Orders = () => {
  const { backendUrl, token, currency,cartItems } = useContext(ShopContext);
  const [orderData, setOrderData] = useState([]);
 console.log(orderData)

  const loadOrderData = async () => {
    try {
      if (!token) return;

      const response = await axios.post(`${backendUrl}/User-orders`,
        {
         userId: localStorage.getItem("userId") },
          { headers: { Authorization: token } }
         
      
      );

      if (response.status===200) {
        let allOrdersItem = [];

        response.data.data.forEach(order => {
         
          order.items.forEach(item => {
            allOrdersItem.push({
              ...item,
              orderId: order._id,
              status: order.status,
              payment: order.payment,
              paymentMethod: order.paymentMethod,
              date: order.date
            });
          });
        });

        setOrderData(allOrdersItem.reverse());
      }
    } catch (error) {
      console.log(error);
    }
  };
  const removeOrderData = async (orderId) => {
  try {
    if (!token) return;

    const response = await axios.delete(`${backendUrl}/delet-order`, {
      data: { orderId },
      headers: { Authorization: token }
    });

    if (response.status === 200) {
      toast.success(response.data.message);

   
     setOrderData((e) => e.filter((item) => item.orderId !== orderId));
    }

  } catch (error) {
    console.log(error);
    toast.error("Failed to cancel order");
  }
};

  useEffect(() => { 
    loadOrderData();
  
  }, [token]);

  return (
    <div className="orders-container">
      <div className="orders-title">
        <Title text1="MY" text2="ORDERS" />
      </div>

      <div>
        {orderData?.map((item, index) => (
          <div className="order-card" key={index}>
            <div className="order-left">
              <img
                src={item?.product?.images?.[0]?.url}
                alt=""
                className="order-image"
              />

              <div>
                <p className="order-name">{item.name}</p>

                <div className="order-meta">
                  <p>{currency}{item.product.price}</p>
                  <p>Quantity: {item.quantity}</p>
                  <p>Size: {item.size}</p>
                </div>

                <p className="order-text">
                  Date:
                  <span>{new Date(item.date).toDateString()}</span>
                </p>

                <p className="order-text">
                  Payment:
                  <span>{item.paymentMethod}</span>
                </p>
              </div>
            </div>

            <div className="order-right">
              <div className="order-status">
                <span className="status-dot"></span>
                <p>{item.status}</p>
              </div>

              <button className="track-btn" onClick={() => removeOrderData(item.orderId)}>
                Cancel order 
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Orders;