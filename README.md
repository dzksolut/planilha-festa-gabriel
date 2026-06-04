# 📊 Google Sheets Data Viewer - Festa Gabriel

A beautiful React app to consume and display data from Google Sheets in a clean, interactive table format.

## Features

✨ **Key Capabilities:**
- 📥 Load data directly from Google Sheets CSV export
- 🔍 Search functionality to filter data in real-time
- 📈 Sort columns by clicking on headers (ascending/descending)
- 📱 Fully responsive design for mobile and desktop
- 🎨 Beautiful UI with gradient backgrounds and smooth animations
- ⚡ Fast and lightweight performance

## Getting Started

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/dzksolut/planilha-festa-gabriel.git
cd planilha-festa-gabriel
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm start
```

The app will open at `http://localhost:3000`

## Usage

### Step 1: Get Your Google Sheets ID
1. Open your Google Sheet
2. Copy the ID from the URL:
   - URL: `https://docs.google.com/spreadsheets/d/1BxiMVs0XRA5nFMXX01sDPCLjA6K5k.../edit`
   - ID: `1BxiMVs0XRA5nFMXX01sDPCLjA6K5k...`

### Step 2: Make Your Sheet Public
1. Click "Share" button in Google Sheets
2. Change access to "Anyone with the link" (or make it public)
3. Copy the share link

### Step 3: Load Data
1. Paste the Google Sheets ID into the form
2. (Optional) Specify a range (e.g., `A:Z`, `Sheet1!A1:D10`)
3. Click "Load Data"

### Step 4: Interact with Data
- **Search**: Use the search box to filter rows by any content
- **Sort**: Click on column headers to sort ascending/descending
- **View**: All data is displayed in an interactive table

## How It Works

The app uses Google Sheets' export functionality to convert sheets to CSV format:
```
https://docs.google.com/spreadsheets/d/{SHEET_ID}/export?format=csv&range={RANGE}
```

This allows public sheets to be accessed without authentication!

## Technology Stack

- **React 18**: Modern UI library
- **CSS3**: Beautiful styling with gradients and animations
- **JavaScript ES6+**: Modern JavaScript

## Project Structure

```
src/
├── components/
│   ├── DataTable.js           # Main table component
│   ├── DataTable.css
│   ├── GoogleSheetsForm.js    # Input form component
│   ├── GoogleSheetsForm.css
│   ├── LoadingSpinner.js      # Loading state component
│   ├── LoadingSpinner.css
│   ├── ErrorMessage.js        # Error display component
│   └── ErrorMessage.css
├── App.js                      # Main app component
├── App.css
├── index.js                    # Entry point
└── index.css                   # Global styles
public/
├── index.html                  # HTML template
package.json                    # Dependencies and scripts
```

## Available Scripts

### `npm start`
Runs the app in development mode at `http://localhost:3000`

### `npm run build`
Builds the app for production to the `build` folder

### `npm test`
Runs the test suite (if configured)

## Limitations & Notes

⚠️ **Important:**
- The Google Sheet must be public or shared with link access
- The data is fetched directly from the CSV export
- Large sheets may take time to load
- CORS restrictions may apply in some environments
- No authentication required (works with public sheets)

## Security Note

Since this app only reads public data from Google Sheets, there are no security concerns with credentials or API keys. Make sure you're only sharing sheets with data you're comfortable making publicly accessible.

## Example Usage

### Event Planning Sheet
```
Name       | Item          | Quantity | Status
-----------|---------------|----------|--------
John       | Drinks        | 12       | Done
Maria      | Decorations   | 5        | In Progress
Carlos     | Food          | 20       | Pending
```

## Future Enhancements

- 🔐 OAuth authentication for private sheets
- 📊 Chart generation from data
- 💾 Export data to CSV/Excel
- 🎨 Theme customization
- 📋 Multiple sheet support
- 🔗 URL parameters for direct sheet loading

## License

This project is open source and available under the MIT License.

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## Support

If you encounter any issues or have questions:
1. Check the [GitHub Issues](https://github.com/dzksolut/planilha-festa-gabriel/issues)
2. Create a new issue with details about the problem
3. Include screenshots if possible

---

Made with ❤️ for Festa Gabriel
