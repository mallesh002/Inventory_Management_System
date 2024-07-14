import React, { useEffect, useState } from 'react';
import './Inventory.css';
import MessageModal from './MessageModal';

function Inventory() {
  const [tables, setTables] = useState([]);
  const [selectedTable, setSelectedTable] = useState('');
  const [tableData, setTableData] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');
  const [modalMessage, setModalMessage] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    fetch('http://localhost:8081/tables')
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          if (data.tables.length === 0) {
            setModalMessage('No tables found');
            setIsModalOpen(true);
          } else {
            setTables(data.tables);
          }
        } else {
          setErrorMessage(data.error);
        }
      })
      .catch(err => {
        setErrorMessage('Error fetching table names');
      });
  }, []);

  const handleTableSelection = (e) => {
    e.preventDefault();

    if (!selectedTable) {
      setModalMessage('Please enter a table name');
      setIsModalOpen(true);
      return;
    }

    fetch(`http://localhost:8081/table-data/${selectedTable}`)
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          if (data.data.length === 0) {
            setModalMessage('Table is Empty');
            setIsModalOpen(true);
          } else {
            setTableData(data.data);
          }
        } else {
          setModalMessage(data.error);
          setIsModalOpen(true);
        }
      })
      .catch(err => {
        setModalMessage('Error fetching table data');
        setIsModalOpen(true);
      });
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setModalMessage('');
  };

  return (
    <div className="inventory-container">
      <h1>Inventory</h1>
      {errorMessage && <p className="error-message">{errorMessage}</p>}
      <div className="tables-list">
        <h2>Tables in Database</h2>
        <ul>
          {tables.map(table => (
            <li key={table}>{table}</li>
          ))}
        </ul>
      </div>
      <div className="table-query">
        <form onSubmit={handleTableSelection}>
          <label htmlFor="tableName">Enter Table Name:</label>
          <input
            type="text"
            id="tableName"
            value={selectedTable}
            onChange={(e) => setSelectedTable(e.target.value)}
            required
          />
          <button type="submit">See Data</button>
        </form>
      </div>
      {tableData.length > 0 && (
        <div className="table-data">
          <h2>Data in {selectedTable}</h2>
          <table>
            <thead>
              <tr>
                {Object.keys(tableData[0]).map(column => (
                  <th key={column}>{column}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {tableData.map((row, index) => (
                <tr key={index}>
                  {Object.values(row).map((value, i) => (
                    <td key={i}>{value}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      <MessageModal isOpen={isModalOpen} message={modalMessage} onClose={closeModal} />
    </div>
  );
}

export default Inventory;
