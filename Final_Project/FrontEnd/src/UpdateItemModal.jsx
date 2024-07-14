import React, { useState } from 'react';
import './UpdateItemModal.css';

function UpdateItemModal({ isOpen, onClose, onUpdateProduct }) {
  const [productId, setProductId] = useState('');
  const [productData, setProductData] = useState(null);
  const [quantity, setQuantity] = useState('');
  const [price, setPrice] = useState('');

  const handleCheckProduct = (e) => {
    e.preventDefault();

    fetch('http://localhost:8081/check-product', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ productId }),
    })
    .then(res => res.json())
    .then(data => {
      if (data.success) {
        setProductData(data.product);
        setQuantity(data.product.quantity);
        setPrice(data.product.price);
      } else {
        alert('No such item found');
        setProductData(null);
      }
    })
    .catch(err => console.log(err));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onUpdateProduct({ productId, quantity, price });
    setProductId('');
    setProductData(null);
    setQuantity('');
    setPrice('');
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>Update Product</h2>
        {!productData ? (
          <form onSubmit={handleCheckProduct}>
            <div className="form-group">
              <label>Product ID:</label>
              <input
                type="number"
                value={productId}
                onChange={(e) => setProductId(e.target.value)}
                required
              />
            </div>
            <button type="submit">Check Product</button>
            <button type="button" onClick={onClose}>Close</button>
          </form>
        ) : (
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Product Name:</label>
              <input type="text" value={productData.productname} disabled />
            </div>
            <div className="form-group">
              <label>Quantity:</label>
              <input
                type="number"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label>Price:</label>
              <input
                type="number"
                step="0.01"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                required
              />
            </div>
            <button type="submit">Update Product</button>
            <button type="button" onClick={onClose}>Close</button>
          </form>
        )}
      </div>
    </div>
  );
}

export default UpdateItemModal;
