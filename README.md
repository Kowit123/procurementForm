# Procurement Document Generator

A web-based system that allows users to input procurement data through a form interface and automatically generates standardized government procurement documents in .docx or .pdf format.

## Project Setup

### Prerequisites
- Python 3.8 or higher
- pip (Python package installer)

### Installation

1. Clone the repository:
```
git clone <repository-url>
cd procurement-document-generator
```

2. Create a virtual environment:
```
python -m venv venv
```

3. Activate the virtual environment:

On Windows:
```
venv\Scripts\activate
```

On macOS/Linux:
```
source venv/bin/activate
```

4. Install dependencies:
```
pip install -r requirements.txt
```

5. Create a .env file from the example:
```
cp .env.example .env
```
Then edit the .env file to set your environment variables.

### Running the Application

1. Activate the virtual environment (if not already activated)
2. Run the Flask application:
```
python app.py
```
3. Open a web browser and navigate to `http://127.0.0.1:5000/`

## Project Structure

- `app.py`: Main Flask application
- `requirements.txt`: Python dependencies
- `templates/`: HTML templates
  - `form.html`: Main form for data input
- `static/`: Static files (CSS, JavaScript)
  - `style.css`: Main stylesheet
- `utils/`: Utility functions
  - `thai_utils.py`: Thai language utilities (date conversion, number to text)
  - `doc_generator.py`: Document generation utilities
- `doc_templates/`: Document templates
  - `purchase_template.docx`: Template for purchase documents
- `tests/`: Test files
  - `test_thai_utils.py`: Tests for Thai language utilities

## Features

- Web form for procurement data input
- Thai language support (Buddhist Era dates, Thai Baht text)
- Document generation in .docx and .pdf formats
- Stateless operation (no database required)