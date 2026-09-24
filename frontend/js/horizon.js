let horizonData = [];

async function loadHorizon() {
  horizonData =
    await apiRequest('/horizon');

  renderTable({
    tableBodyId: 'horizon-table',

    rows: horizonData,

    columns: [
      { key: 'ticker' },
      { key: 'name' },
      { key: 'assetClass' },
      { key: 'sector' },
      { key: 'currency' },
      { key: 'risk' },

      {
        render: row =>
          row.price.toFixed(2)
      },

      {
        render: row =>
          `${row.dailyChange.toFixed(2)}%`
      },

      {
        render: row =>
          `${row.oneYearReturn.toFixed(2)}%`
      },

      {
        render: row =>
          `${row.benchmark.toFixed(2)}%`
      },

      {
        render: row =>
          `${row.excessReturn.toFixed(2)}%`
      }
    ]
  });
}
function downloadCSV() { 
  const headers = [ 
    'Ticker', 'Security', 'Asset Class', 'Sector', 
    'Currency', 'Risk', 'Price', 'Daily Change %', 
    '1Y Return', 'Benchmark', 'Excess Return' 
  ]; 
  const csvRows = [ 
    headers.join(',') 
  ];
  
  horizonData.forEach(row => { 
    csvRows.push([ 
      row.ticker, row.name, row.assetClass, row.sector, 
      row.currency, row.risk, row.price.toFixed(2), 
      row.dailyChange.toFixed(2), row.oneYearReturn.toFixed(2), 
      row.benchmark.toFixed(2), row.excessReturn.toFixed(2)
     ].join(',')); 
    }); 

    const csv = csvRows.join('\n'); 
    const blob = new Blob([csv], { type: 'text/csv' }); 
    const url = URL.createObjectURL(blob); 
    const link = document.createElement('a'); 
    link.href = url; 
    link.download = 'horizon.csv'; 
    link.click(); 
    URL.revokeObjectURL(url); 
  } 
  document 
  .getElementById('download-csv') 
  .addEventListener('click', downloadCSV);
  
loadHorizon();