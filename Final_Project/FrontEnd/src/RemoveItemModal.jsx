import React, { useState } from 'react';
import './RemoveItemModal.css';

function RemoveItemModal({ isOpen, onClose, onRemoveProduct }) {
  const [productId, setProductId] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!productId) {
      setErrorMessage('Please enter a product ID');
      return;
    }

    if (isNaN(productId)) {
      setErrorMessage('Product ID must be a number');
      return;
    }

    onRemoveProduct(Number(productId), setErrorMessage);
    setProductId('');
    setErrorMessage('');
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>Remove Product</h2>
        {errorMessage && <p className="error-message">{errorMessage}</p>}
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Product ID:</label>
            <input
              type="text"
              value={productId}
              onChange={(e) => setProductId(e.target.value)}
              required
            />
          </div>
          <button type="submit">Remove Product</button>
          <button type="button" onClick={onClose}>Close</button>
        </form>
      </div>
    </div>
  );
}

export default RemoveItemModal;
