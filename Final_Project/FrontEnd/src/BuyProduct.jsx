import React, { useState } from 'react';

function BuyProduct() {
  const [productId, setProductId] = useState('');
  const [quantity, setQuantity] = useState('');
  const [message, setMessage] = useState('');
  const [totalPrice, setTotalPrice] = useState(null);
  const userId = 1; // Replace with the actual user ID from the context or props

  const handleCheckProduct = (e) => {
    e.preventDefault();

    fetch('http://localhost:8081/buy-product', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ userId, productId, quantity }),
    })
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          setTotalPrice(data.totalPrice);
          setMessage('Purchase successful!');
        } else {
          setMessage(data);
        }
      })
      .catch(err => setMessage('Error occurred. Please try again.'));
  };

  return (
    <div>
      <h1>Buy Product</h1>
      <form onSubmit={handleCheckProduct}>
        <div>
          <label>Product ID:</label>
          <input
            type="text"
            value={productId}
            onChange={(e) => setProductId(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Quantity:</label>
          <input
            type="number"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            required
          />
        </div>
        <button type="submit">Buy</button>
      </form>
      {message && <p>{message}</p>}
      {totalPrice !== null && <p>Total Price: ${totalPrice}</p>}
    </div>
  );
}

export default BuyProduct;
