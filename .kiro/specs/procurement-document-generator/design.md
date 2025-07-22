# Design Document: Procurement Document Generator

## Overview

The Procurement Document Generator is a web-based system that allows users to input procurement data through a form interface and automatically generates standardized government procurement documents in .docx or .pdf format. The system is designed to be stateless, requiring no database, with all processing done in-memory and documents provided for immediate download.

## Architecture

The system will follow a simple Model-View-Controller (MVC) architecture pattern:

1. **Model**: Handles data processing, validation, and document generation
2. **View**: Provides the user interface for data input and document download
3. **Controller**: Manages the flow between the user interface and the document generation process

The system will be built using:
- **Flask**: A lightweight Python web framework for handling HTTP requests and responses
- **Python-docx**: A Python library for creating and updating Microsoft Word (.docx) files
- **WeasyPrint** or **docx2pdf**: For converting .docx files to PDF format when requested
- **JavaScript**: For client-side form validation and dynamic form elements
- **HTML/CSS**: For the user interface

### System Architecture Diagram

```mermaid
graph TD
    A[User] -->|Accesses| B[Web Interface]
    B -->|Submits Form| C[Flask Controller]
    C -->|Validates Data| D[Form Processor]
    D -->|Passes Valid Data| E[Document Generator]
    E -->|Uses| F[Document Template]
    E -->|Creates| G[Generated Document]
    G -->|Provided as| H[Download]
    H -->|Downloaded by| A
```

## Components and Interfaces

### 1. Web Interface (View)

The web interface consists of:

- **Form Page**: HTML form with fields for all required procurement information
- **Result Page**: Page displaying download links for generated documents

#### Form Components:
- Input fields for procurement details (text inputs)
- Dynamic form sections for adding multiple procurement items
- Client-side validation using JavaScript
- Form submission button
- Preview and Generate Document buttons

### 2. Controller

The controller is implemented in Flask and handles:

- Routing HTTP requests
- Processing form submissions
- Validating input data
- Initiating document generation
- Serving generated documents for download
- Serving static files from the public directory

### 3. Document Generator (Model)

The document generator will:

- Accept validated form data
- Load the appropriate document template
- Fill template placeholders with form data
- Format dates and numbers according to Thai government standards
- Generate the final document in the requested format
- Provide the document for download

## Data Models

Since the system is stateless with no database, we define data structures that will be used in-memory during processing:

### ProcurementData

```python
class ProcurementData:
    """Data structure to hold procurement form data."""
    
    def __init__(self):
        # Requester information
        self.responsible_person = ""  # Main requester/committee chair
        self.responsible_committee_member1 = ""  # Optional committee member
        self.responsible_committee_member2 = ""  # Optional committee member
        self.requesting_for = ""  # Purpose of procurement
        
        # Inspector information
        self.inspector = ""  # Main inspector/committee chair
        self.inspector_committee_member1 = ""  # Optional committee member
        self.inspector_committee_member2 = ""  # Optional committee member
        
        # Supply items
        self.items = []  # List of ProcurementItem objects
        
        # Totals
        self.total_items = 0  # Total number of items
        self.grand_total = 0.0  # Total cost
        self.grand_total_text_thai = ""  # Thai text representation of total cost
```

### ProcurementItem

```python
class ProcurementItem:
    """Data structure to hold information about each procurement item."""
    
    def __init__(self):
        self.name = ""  # Item name/description
        self.amount = 0  # Quantity
        self.price_per_unit = 0.0  # Unit price
        self.total_price = 0.0  # Total price (amount * price_per_unit)
        self.is_domestic = True  # Whether the item is produced domestically
```

## Error Handling

The system implements the following error handling strategies:

1. **Client-side Validation**:
   - Real-time validation of form fields
   - Prevention of form submission with invalid data
   - Clear error messages displayed next to problematic fields
   - Visual feedback with red borders for invalid fields

2. **Server-side Validation**:
   - Secondary validation of all form data
   - Appropriate HTTP status codes for different error types
   - Descriptive error messages returned to the client

3. **Document Generation Errors**:
   - Exception handling for template processing errors
   - Fallback mechanisms for document generation failures
   - User-friendly error messages for technical issues

## Testing Strategy

The testing strategy includes:

1. **Unit Testing**:
   - Test individual components (form validation, data processing, document generation)
   - Verify correct handling of valid and invalid inputs
   - Ensure proper formatting of dates and numbers

2. **Integration Testing**:
   - Test the interaction between components
   - Verify end-to-end document generation process
   - Test different document formats (DOCX, PDF)

3. **User Interface Testing**:
   - Test form functionality and validation
   - Verify dynamic form elements (adding/removing items)
   - Test responsiveness and browser compatibility

## Technical Considerations

### Document Template Structure

The document template uses the following placeholder format for easy replacement:

- Text placeholders: `{{placeholder_name}}`
- Table row placeholders: Special markers for row repetition
- Date placeholders: `{{date}}` (will be formatted according to Thai standards)
- Number placeholders: `{{cost_number}}` (will be formatted according to Thai standards)
- Text cost placeholders: `{{cost_text_thai}}` (Thai text representation of the cost)

### Thai Language and Buddhist Era Support

- The system supports Thai language input and output
- Date conversion between Gregorian and Buddhist Era calendars
- Proper formatting of Thai numbers and currency
- Thai text representation of numerical values

### Security Considerations

- Input sanitization to prevent injection attacks
- CSRF protection for form submissions
- No persistent storage of sensitive data
- Temporary files cleaned up after document generation

## User Experience Design

### Form Layout

The form is organized into logical sections:

1. **Requester Information**:
   - Main requester/committee chair (required)
   - Committee members (optional)
   - Purpose of procurement (required)

2. **Inspector Information**:
   - Main inspector/committee chair (required)
   - Committee members (optional)

3. **Supply Items**:
   - Dynamic table for adding multiple items
   - Each item includes name, quantity, unit price, total price, and origin (domestic/foreign)
   - Buttons to add and remove items
   - Automatic calculation of totals

4. **Form Actions**:
   - User manual button
   - Preview button for PDF preview
   - Generate Document button for final document generation

### User Flow

```mermaid
graph TD
    A[User Accesses System] --> B[View Form]
    B --> C[Fill Form]
    C --> D{Valid?}
    D -->|No| E[Show Validation Errors]
    E --> C
    D -->|Yes| F[Preview or Generate]
    F -->|Preview| G[View PDF Preview]
    G --> C
    F -->|Generate| H[Generate Document]
    H --> I[Download Document]
```

## Thai Baht Text Conversion

A special utility is implemented to convert numerical values to Thai text representation for official documents:

```python
def num_to_thai_text(number):
    """
    Convert a number to Thai text representation.
    For example: 1,234.56 -> หนึ่งพันสองร้อยสามสิบสี่บาทห้าสิบหกสตางค์
    """
    # Implementation will handle:
    # - Whole numbers to Thai text
    # - Decimal parts as satang
    # - Zero handling
    # - Large number handling
    pass
```

## Buddhist Era Date Conversion

The system includes a utility to convert Gregorian calendar dates to Buddhist Era dates:

```python
def gregorian_to_buddhist_era(date):
    """
    Convert a Gregorian calendar date to Buddhist Era date.
    Buddhist Era = Gregorian year + 543
    """
    # Implementation will handle:
    # - Year conversion (add 543)
    # - Proper Thai date formatting
    # - Thai month names
    pass
```

## Number Formatting

The system includes utilities for formatting numbers with commas and validating numeric inputs:

```javascript
function formatNumberWithCommas(num) {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

function validateNumberInput(input) {
    // Validate numeric input based on min, max, and step attributes
    // Format with commas for display
    // Show error messages for invalid inputs
}
```