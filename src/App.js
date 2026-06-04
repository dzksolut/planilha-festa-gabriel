import React, { useState } from 'react';
import './App.css';
import DataTable from './components/DataTable';
import LoadingSpinner from './components/LoadingSpinner';
import ErrorMessage from './components/ErrorMessage';

const PUBLIC_CSV_URL =
  'https://docs.google.com/spreadsheets/d/e/2PACX-1vSzK0YDxArBfo3SjpL5_t8bPjVFSfOobmZs_G858mx5793JlASr468cEKTJc548TmMrwrW4r1UA4zB9/pub?output=csv';

function App() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [sheetTitle, setSheetTitle] = useState('');
  const [summary, setSummary] = useState('');

  const parseCsvLine = (line) => {
    const cells = [];
    let current = '';
    let inQuotes = false;

    for (let i = 0; i < line.length; i += 1) {
      const char = line[i];
      const next = line[i + 1];

      if (char === '"') {
        if (inQuotes && next === '"') {
          current += '"';
          i += 1;
        } else {
          inQuotes = !inQuotes;
        }
      } else if (char === ',' && !inQuotes) {
        cells.push(current);
        current = '';
      } else {
        current += char;
      }
    }

    cells.push(current);
    return cells;
  };

  const normalizeHeader = (header) => header.trim().toLowerCase().replace(/[^a-z0-9]/g, '');

  const mapRow = (headers, values) => {
    const normalized = { nome: '', contato: '', dataConfirmacao: '' };

    headers.forEach((header, index) => {
      const key = normalizeHeader(header);
      const value = (values[index] || '').trim();

      if (key === 'nome') normalized.nome = value;
      if (key === 'contato') normalized.contato = value;
      if (key === 'dataconfirmacao' || key === 'dataconfirmacao') normalized.dataConfirmacao = value;
    });

    return normalized;
  };

  const removeDuplicatesByContact = (rows) => {
    const uniqueMap = new Map();
    const duplicates = [];

    rows.forEach((row, index) => {
      const contact = (row.contato || '').trim();
      const key = contact || `__empty__${index}`;

      if (!uniqueMap.has(key)) {
        uniqueMap.set(key, row);
      } else {
        duplicates.push(row);
      }
    });

    return {
      uniqueRows: Array.from(uniqueMap.values()),
      duplicateCount: duplicates.length,
    };
  };

  const handleLoadData = async () => {
    setLoading(true);
    setError(null);
    setData(null);
    setSummary('');
    setSheetTitle('');

    try {
      const response = await fetch(PUBLIC_CSV_URL);

      if (!response.ok) {
        throw new Error('Falha ao carregar o CSV público. Verifique a URL e o acesso.');
      }

      const csv = await response.text();
      const rawRows = csv.split(/\r?\n/).filter((row) => row.trim() !== '');

      if (rawRows.length < 2) {
        throw new Error('A planilha precisa conter pelo menos uma linha de cabeçalho e uma linha de dados.');
      }

      const headers = parseCsvLine(rawRows[0]);
      const parsedRows = rawRows.slice(1).map((row) => {
        const values = parseCsvLine(row);
        return mapRow(headers, values);
      });

      const { uniqueRows, duplicateCount } = removeDuplicatesByContact(parsedRows);
      if (uniqueRows.length === 0) {
        throw new Error('Nenhum registro válido encontrado na planilha.');
      }

      setData(uniqueRows);
      setSheetTitle(`Confirmações (${uniqueRows.length})`);
      setSummary(
        duplicateCount > 0
          ? `${duplicateCount} registro(s) duplicado(s) pelo contato foram removidos.`
          : 'Nenhum registro duplicado encontrado.'
      );
    } catch (err) {
      setError(err.message || 'Ocorreu um erro ao buscar os dados.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="App">
      <header className="app-header">
        <h1>📊 Confirmações festa Gabriel</h1>
      </header>

      <main className="app-main">
        {error && <ErrorMessage message={error} />}
        {summary && !loading && !error && <div className="summary-message">{summary}</div>}
        {loading && <LoadingSpinner />}
          {data && !loading && !error && <DataTable data={data} title={sheetTitle} />}

        {!data && !loading && !error && (
          <div className="empty-state">
            <p>📌 Clique no botão abaixo para carregar os dados.</p>
            <button className="load-button" type="button" onClick={handleLoadData}>
              Carregar
            </button>
          </div>
        )}
      </main>
    </div>
  );
}

export default App;
