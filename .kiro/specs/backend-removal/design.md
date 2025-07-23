# Design Document

## Overview

This design outlines the conversion of the Flask-based procurement document generator into a pure frontend application. The current application already has most functionality implemented client-side using JavaScript, with the Flask backend serving primarily as a static file server. The conversion will eliminate the Python backend while preserving all existing functionality.

## Architecture

### Current Architecture
- **Backend**: Flask server (app.py) serving templates and static files
- **Frontend**: HTML form with JavaScript for PDF generation using jsPDF
- **Dependencies**: Python packages for Flask, document generation (unused), and testing
- **File Structure**: Templates directory with Jinja2 templating, static assets served via Flask

### Target Architecture
- **Frontend Only**: Static HTML, CSS, and JavaScript files
- **No Backend**: Direct file access without server routing
- **Dependencies**: None for runtime (development tools optional)
- **File Structure**: Flat structure with index.html at root, relative asset paths

## Components and Interfaces

### File Structure Changes

**Files to Remove:**
- `app.py` - Flask application server
- `templates/form.html` - Jinja2 template (replaced by index.html)
- `requirements.txt` - Python dependencies
- `Pipfile` - Pipenv configuration
- `setup.bat` - Python environment setup script
- `utils/` directory - Python utilities (Thai date conversion moved to JavaScript)
- `tests/` directory - Python tests (functionality moved to frontend)

**Files to Modify:**
- `index.html` - Remove Flask templating, update asset paths
- Static JavaScript files - Update any server-dependent functionality

**Files to Keep:**
- All files in `static/` directory
- All files in `public/` directory
- `doc_templates/` directory
- `.gitignore`, `README.md`, etc.

### Asset Path Updates

**Current Flask Templating:**
```html
href="{{ url_for('static', filename='style.css') if url_for is defined else '../static/style.css' }}"
```

**Target Static Paths:**
```html
href="static/style.css"
```

### JavaScript Functionality Migration

**Thai Date Conversion:**
- Move `utils/thai_utils.py` functionality to JavaScript
- Implement `convertToThaiDate()` function (already exists in current HTML)
- Ensure Buddhist Era conversion works client-side

**PDF Generation:**
- Keep existing jsPDF implementation
- Ensure all Thai fonts load correctly
- Maintain current PDF generation workflow

## Data Models

### Form Data Structure
The form data structure remains unchanged:
- Responsible person information
- Inspector information  
- Supply list with calculations
- Date formatting in Thai Buddhist Era

### PDF Document Structure
- Header with Thai title
- Form sections with proper Thai formatting
- Supply list table with calculations
- Footer with totals and signatures

## Error Handling

### File Access Errors
- **Static Assets**: Browser will show 404 for missing files
- **Fonts**: Fallback to system fonts if custom fonts fail to load
- **PDF Generation**: Error handling in JavaScript for jsPDF failures

### Form Validation
- **Client-side Only**: Existing JavaScript validation remains
- **Required Fields**: Current validation logic preserved
- **Data Format**: Number formatting and Thai text validation

### Browser Compatibility
- **Modern Browsers**: Target ES6+ for better functionality
- **Fallbacks**: Provide graceful degradation for older browsers
- **Mobile Support**: Ensure responsive design works without server

## Testing Strategy

### Manual Testing Approach
Since we're removing the Python test infrastructure, testing will be manual:

1. **Form Functionality Testing**
   - Fill out all form fields
   - Test add/remove supply list items
   - Verify calculations work correctly
   - Test form validation

2. **PDF Generation Testing**
   - Generate PDF with various data combinations
   - Verify Thai text renders correctly
   - Test PDF download functionality
   - Check formatting and layout

3. **Asset Loading Testing**
   - Verify all CSS loads correctly
   - Check JavaScript files load in proper order
   - Test font loading for Thai characters
   - Verify images and other assets load

4. **Cross-browser Testing**
   - Test in Chrome, Firefox, Safari, Edge
   - Verify mobile responsiveness
   - Check for JavaScript errors in console

### File Access Testing
- **Direct File Opening**: Test opening index.html directly in browser
- **Local Server**: Test with simple HTTP server (python -m http.server)
- **Relative Paths**: Ensure all asset paths work in both scenarios

## Implementation Considerations

### Asset Path Strategy
Use relative paths that work both when:
- Opening index.html directly in browser
- Serving from a simple HTTP server
- Deploying to static hosting (GitHub Pages, Netlify, etc.)

### Thai Language Support
- Ensure all Thai text rendering works without server-side processing
- Maintain Buddhist Era date conversion in JavaScript
- Preserve Thai number formatting functionality

### PDF Generation Reliability
- Keep existing jsPDF implementation
- Ensure Thai fonts are properly embedded
- Maintain current PDF structure and formatting

### Deployment Flexibility
The resulting application should work in multiple scenarios:
- Direct file access (file:// protocol)
- Simple HTTP server
- Static hosting services
- CDN deployment

## Migration Path

### Phase 1: Prepare Static Version
- Update index.html to remove Flask templating
- Fix all asset paths to use relative references
- Test functionality without Flask server

### Phase 2: Remove Backend Dependencies
- Delete Flask-related files
- Remove Python dependencies
- Clean up project structure

### Phase 3: Validation and Testing
- Comprehensive testing of all functionality
- Cross-browser compatibility verification
- Documentation updates