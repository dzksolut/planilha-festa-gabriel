import React, { useState } from 'react';
import './GoogleSheetsForm.css';

function GoogleSheetsForm({ onLoadData, isLoading }) {
  const [csvUrl, setCsvUrl] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!csvUrl.trim()) {
      return;
    }
    onLoadData(csvUrl.trim());
  };

  return (
    <form className="sheet-form" onSubmit={handleSubmit}>
      <div className="form-grid">
        <label>
          URL do CSV público
          <input
            type="text"
            value={csvUrl}
            onChange={(event) => setCsvUrl(event.target.value)}
            placeholder="Cole o link do CSV público"
            disabled={isLoading}
          />
        </label>
      </div>

      <button className="load-button" type="submit" disabled={isLoading || !csvUrl.trim()}>
        {isLoading ? 'Carregando...' : 'Carregar CSV'}
      </button>
    </form>
  );
}

export default GoogleSheetsForm;
