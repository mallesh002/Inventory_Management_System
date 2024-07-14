import React, { useEffect, useState } from 'react';
import './Categories.css';

function Categories() {
  const [categories, setCategories] = useState([]);
  const [categoryName, setCategoryName] = useState('');
  const [removeCategoryId, setRemoveCategoryId] = useState('');
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = () => {
    fetch('http://localhost:8081/table-data/categories')
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          const sortedCategories = data.data.sort((a, b) => a.categoryid - b.categoryid);
          setCategories(sortedCategories);
        } else {
          setMessage('Error fetching categories');
        }
      })
      .catch(err => {
        console.log(err);
        setMessage('Error fetching categories');
      });
  };

  const handleAddCategory = (e) => {
    e.preventDefault();
    fetch('http://localhost:8081/add-category', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ categoryname: categoryName }),
    })
    .then(res => res.json())
    .then(data => {
      if (data.success) {
        setMessage('Category added successfully');
        setCategoryName('');
        fetchCategories();
      } else {
        setMessage(data.error);
      }
    })
    .catch(err => {
      console.log(err);
      setMessage('Error adding category');
    });
  };

  const handleRemoveCategory = (e) => {
    e.preventDefault();
    fetch('http://localhost:8081/remove-category', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ categoryid: removeCategoryId }),
    })
    .then(res => res.json())
    .then(data => {
      if (data.success) {
        setMessage('Category removed successfully');
        setRemoveCategoryId('');
        fetchCategories();
      } else {
        setMessage(data.message || 'Error removing category');
      }
    })
    .catch(err => {
      console.log(err);
      setMessage('Error removing category');
    });
  };

  return (
    <div className="categories-container">
      <h1>Categories</h1>
      {message && <p className="message">{message}</p>}
      <form onSubmit={handleAddCategory}>
        <label htmlFor="categoryName">Add Category:</label>
        <input
          type="text"
          id="categoryName"
          value={categoryName}
          onChange={(e) => setCategoryName(e.target.value)}
          required
        />
        <button type="submit">Add</button>
      </form>
      <form onSubmit={handleRemoveCategory}>
        <label htmlFor="removeCategoryId">Remove Category (ID):</label>
        <input
          type="text"
          id="removeCategoryId"
          value={removeCategoryId}
          onChange={(e) => setRemoveCategoryId(e.target.value)}
          required
        />
        <button type="submit">Remove</button>
      </form>
      {categories.length > 0 ? (
        <table>
          <thead>
            <tr>
              {Object.keys(categories[0]).map(column => (
                <th key={column}>{column}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {categories.map((category, index) => (
              <tr key={index}>
                {Object.values(category).map((value, i) => (
                  <td key={i}>{value}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No categories found.</p>
      )}
    </div>
  );
}

export default Categories;
