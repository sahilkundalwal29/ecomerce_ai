import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Cart() {
  const [cartItems, setCartItems] = useState([]);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    fetchCart();
  }, []);

  const fetchCart = async () => {
    const token = localStorage.getItem('token');
    if (!token) return;
    try {
      const response = await axios.get('/api/cart', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setCartItems(response.data);
      const totalPrice = response.data.reduce((sum, item) => sum + (item.price * item.quantity), 0);
      setTotal(totalPrice);
    } catch (error) {
      console.error('Error fetching cart:', error);
    }
  };

  const removeFromCart = async (itemId) => {
    const token = localStorage.getItem('token');
    try {
      await axios.delete(`/api/cart/${itemId}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      fetchCart();
    } catch (error) {
      console.error('Error removing from cart:', error);
    }
  };

  const checkout = async () => {
    const token = localStorage.getItem('token');
    try {
      await axios.post('/api/orders', 
        { total_price: total },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      alert('Order placed successfully');
      setCartItems([]);
      setTotal(0);
    } catch (error) {
      console.error('Error creating order:', error);
    }
  };

  return (
    <div className="container">
      <h1>Shopping Cart</h1>
      {cartItems.length === 0 ? (
        <p>Your cart is empty</p>
      ) : (
        <>
          <div>
            {cartItems.map(item => (
              <div key={item.id} style={{ display: 'flex', justifyContent: 'space-between', padding: '1rem', borderBottom: '1px solid #ddd' }}>
                <div>
                  <h3>{item.name}</h3>
                  <p>Price: ${item.price} x {item.quantity}</p>
                </div>
                <button onClick={() => removeFromCart(item.id)}>Remove</button>
              </div>
            ))}
          </div>
          <h2>Total: ${total.toFixed(2)}</h2>
          <button onClick={checkout}>Checkout</button>
        </>
      )}
    </div>
  );
}

export default Cart;
