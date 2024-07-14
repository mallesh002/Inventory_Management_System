import React, { useEffect, useState } from 'react';
import './Dashboard.css';

function Dashboard({ refreshTrigger }) {
  const [products, setProducts] = useState([]);
  const [sortedProducts, setSortedProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortKey, setSortKey] = useState('productname'); // default sort by product name
  const [sortOrder, setSortOrder] = useState('asc'); // default sort order ascending
  const [errorMessage, setErrorMessage] = useState(''); // State to store error messages

  useEffect(() => {
    fetch('http://localhost:8081/inventory')
      .then(res => res.json())
      .then(data => {
        console.log('Fetched inventory data:', data); // Log fetched data
        setProducts(data);
        setSortedProducts(data);
      })
      .catch(err => {
        console.log(err);
        setErrorMessage('Error fetching inventory data');
      });
  }, [refreshTrigger]);

  useEffect(() => {
    handleSort(sortKey, sortOrder);
  }, [products, sortKey, sortOrder]);

  const handleSearch = (query) => {
    setSearchQuery(query);
    if (!query) {
      setSortedProducts(products);
      return;
    }
    const lowerCaseQuery = query.toLowerCase();
    const filteredProducts = products.filter(product =>
      product.productname.toLowerCase().includes(lowerCaseQuery) ||
      product.productid.toString().includes(lowerCaseQuery)
    );
    setSortedProducts(filteredProducts);
  };

  const handleSort = (key, order) => {
    const sorted = [...products].sort((a, b) => {
      if (a[key] < b[key]) return order === 'asc' ? -1 : 1;
      if (a[key] > b[key]) return order === 'asc' ? 1 : -1;
      return 0;
    });
    setSortedProducts(sorted);
  };

  const handleAddProduct = (productData) => {
    fetch('http://localhost:8081/add-product', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(productData),
    })
    .then(res => res.json())
    .then(data => {
      if (data.success) {
        setErrorMessage('');
        setProducts([...products, data.product]);
      } else {
        setErrorMessage(data.error);
      }
    })
    .catch(err => {
      console.error('Error adding product:', err);
      setErrorMessage('Error adding product');
    });
  };

  const handleUpdateProduct = (productId, updatedData) => {
    fetch('http://localhost:8081/update-product', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ productId, ...updatedData }),
    })
    .then(res => res.json())
    .then(data => {
      if (data.success) {
        setErrorMessage('');
        setProducts(products.map(product => product.productid === productId ? { ...product, ...updatedData } : product));
      } else {
        setErrorMessage(data.error);
      }
    })
    .catch(err => {
      console.error('Error updating product:', err);
      setErrorMessage('Error updating product');
    });
  };

  const handleRemoveProduct = (productId) => {
    fetch('http://localhost:8081/remove-product', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ productId }),
    })
    .then(res => res.json())
    .then(data => {
      if (data.success) {
        setErrorMessage('');
        setProducts(products.filter(product => product.productid !== productId));
      } else {
        setErrorMessage(data.error);
      }
    })
    .catch(err => {
      console.error('Error removing product:', err);
      setErrorMessage('Error removing product');
    });
  };

  return (
    <div className="dashboard-container">
      <h1>Admin Dashboard</h1>
      <p>Welcome, Admin!</p>
      <h2>Inventory Information</h2>

      {errorMessage && <p className="error-message">{errorMessage}</p>}

      <div className="controls">
        <input
          type="text"
          placeholder="Search by Product Name or ID"
          value={searchQuery}
          onChange={(e) => handleSearch(e.target.value)}
        />
        <div className="sort-buttons">
          <button onClick={() => setSortKey('productid')}>Reset</button>
          <button onClick={() => setSortKey('productname')}>Sort by Name</button>
          <button onClick={() => setSortKey('quantity')}>Sort by Quantity</button>
          <button onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}>
            {sortOrder === 'asc' ? 'Sort Ascending' : 'Sort Descending'}
          </button>
        </div>
      </div>

      <table>
        <thead>
          <tr>
            <th>Product ID</th>
            <th>Product Name</th>
            <th>Price</th>
            <th>Quantity</th>
          </tr>
        </thead>
        <tbody>
          {sortedProducts.map(product => (
            <tr key={product.productid}>
              <td>{product.productid}</td>
              <td>{product.productname}</td>
              <td>{product.price}</td>  
              <td>{product.quantity}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Dashboard;
