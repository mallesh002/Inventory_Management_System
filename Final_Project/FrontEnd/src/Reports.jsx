import React, { useEffect, useState } from 'react';
import { Pie } from 'react-chartjs-2';
import 'chart.js/auto';

function Reports() {
  const [chartData, setChartData] = useState({});

  useEffect(() => {
    fetch('http://localhost:8081/product-counts')
      .then(res => res.json())
      .then(data => {
        const labels = data.map(item => item.productname);
        const quantities = data.map(item => item.quantity);

        setChartData({
          labels,
          datasets: [
            {
              label: 'Product Quantities',
              data: quantities,
              backgroundColor: [
                '#FF6384',
                '#36A2EB',
                '#FFCE56',
                '#4BC0C0',
                '#9966FF',
                '#FF9F40'
              ],
              hoverBackgroundColor: [
                '#FF6384',
                '#36A2EB',
                '#FFCE56',
                '#4BC0C0',
                '#9966FF',
                '#FF9F40'
              ]
            }
          ]
        });
      })
      .catch(err => console.log(err));
  }, []);

  return (
    <div>
      <h2>Product Quantities Report</h2>
      <div style={{ width: '50%', margin: '0 auto' }}>
        <Pie data={chartData} />
      </div>
    </div>
  );
}

export default Reports;
