import React, { useState } from 'react';
import './App.css';
import GoogleSheetsForm from './components/GoogleSheetsForm';
import DataTable from './components/DataTable';
import LoadingSpinner from './components/LoadingSpinner';
import ErrorMessage from './components/ErrorMessage';

function App() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [sheetTitle, setSheetTitle] = useState('');

  const handleLoadData = async (spreadsheetId, range) => {
    setLoading(true);
    setError(null);
    setData(null);

    try {
      const response = await fetch(
        `https://docs.google.com/spreadsheets/d/${spreadsheetId}/export?format=csv&range=${range}`
      );

      if (!response.ok) {
        throw new Error('Failed to fetch data from Google Sheets');
      }

      const csv = await response.text();
      const rows = csv.split('\n').filter(row => row.trim() !== '');
      
      if (rows.length === 0) {
        throw new Error('No data found in the specified range');
      }

      const headers = rows[0].split(',').map(h => h.trim());
      const dataRows = rows.slice(1).map(row => {
        const values = row.split(',').map(v => v.trim());
        const obj = {};
        headers.forEach((header, index) => {
          obj[header] = values[index] || '';
        });
        return obj;
      });

      setData(dataRows);
      setSheetTitle(`Sheet Data (${dataRows.length} rows)`);
    } catch (err) {
      setError(err.message || 'An error occurred while fetching the data');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="App">
      <header className="app-header">
        <h1>📊 Google Sheets Viewer</h1>
        <p>Festa Gabriel - Planilha de Dados</p>
      </header>

      <main className="app-main">
        <GoogleSheetsForm onLoadData={handleLoadData} isLoading={loading} />
        
        {error && <ErrorMessage message={error} />}
        
        {loading && <LoadingSpinner />}
        
        {data && !loading && <DataTable data={data} title={sheetTitle} />}

        {!data && !loading && !error && (
          <div className="empty-state">
            <p>📌 Enter a Google Sheets ID and range to load data</p>
          </div>
        )}
      </main>
    </div>
  );
}

export default App;
