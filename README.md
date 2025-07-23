# Procurement Document Generator

A static web application that allows users to input procurement data through a form interface and automatically generates standardized government procurement documents in PDF format directly in the browser.

## Project Setup

### Prerequisites
- A modern web browser (Chrome, Firefox, Edge, or Safari)

### Installation

1. Clone the repository:
```
git clone <repository-url>
cd procurement-document-generator
```

### Running the Application

There are several ways to use this application:

1. Open the index.html file directly in your browser:
```
# Simply double-click on index.html in your file explorer
```

2. Use a simple HTTP server (optional, for development):
```
# Using Python's built-in server
python -m http.server

# Or using Node.js
npx serve
```

3. Deploy to any static web hosting service (GitHub Pages, Netlify, etc.)

## Project Structure

- `index.html`: Main application entry point
- `static/`: Static files (CSS, JavaScript)
  - `style.css`: Main stylesheet
  - `pdf-generator.js`: PDF generation functionality
  - `supply-list.js`: Supply list management
  - `thai-utils.js`: Thai language utilities (date conversion, number to text)
  - `jspdf.min.js`: PDF generation library
  - `jspdf.plugin.autotable.min.js`: Table plugin for jsPDF
- `doc_templates/`: Document templates
  - `purchase_template.docx`: Template for purchase documents
- `public/`: Public assets
  - `example-document.pdf`: Example document

## Features

- Web form for procurement data input
- Thai language support (Buddhist Era dates, Thai Baht text)
- Client-side PDF document generation
- Completely static operation (no server required)
- Works offline after initial load