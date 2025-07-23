# Implementation Plan

- [x] 1. Update index.html to remove Flask templating and fix asset paths


  - Remove all Jinja2 templating syntax ({{ url_for() }} statements)
  - Update CSS and JavaScript src/href attributes to use relative paths
  - Ensure all asset references work for static file access
  - _Requirements: 3.4, 2.2_

- [x] 2. Implement Thai date conversion functionality in JavaScript









  - Move Buddhist Era date conversion from Python utils to JavaScript
  - Enhance existing convertToThaiDate() function with full Thai utilities
  - Add number-to-Thai-text conversion function for PDF generation
  - Test date formatting matches previous Python implementation
  - _Requirements: 2.3, 2.1_

- [ ] 3. Update PDF generation to work without backend dependencies
  - Verify jsPDF functionality works with static file access
  - Ensure Thai font loading works with relative paths
  - Test PDF generation with all form data scenarios
  - Update any server-dependent PDF generation code
  - _Requirements: 2.1, 2.2_

- [ ] 4. Update asset references in JavaScript files
  - Check static/supply-list.js for any server dependencies
  - Update static/pdf-generator.js if needed for static operation
  - Ensure all JavaScript modules load correctly with relative paths
  - _Requirements: 3.4, 2.2_

- [ ] 5. Remove Flask backend files and dependencies
  - Delete app.py Flask application file
  - Remove templates/form.html (replaced by updated index.html)
  - Delete requirements.txt and Pipfile Python dependency files
  - Remove setup.bat Python environment setup script
  - _Requirements: 1.1, 1.2, 3.1_

- [ ] 6. Remove Python utility files and tests
  - Delete utils/ directory containing Python utilities
  - Remove tests/ directory with Python test files
  - Clean up any remaining Python-specific files
  - _Requirements: 1.2, 1.3, 3.2_

- [ ] 7. Test complete application functionality
  - Test form validation works correctly
  - Verify supply list add/remove functionality
  - Test calculations and totals update properly
  - Confirm PDF generation works with all features
  - _Requirements: 2.1, 2.2, 2.3_

- [ ] 8. Test static file access scenarios
  - Test opening index.html directly in browser (file:// protocol)
  - Test with simple HTTP server (python -m http.server or similar)
  - Verify all assets load correctly in both scenarios
  - Test example document PDF access
  - _Requirements: 1.4, 3.4_

- [ ] 9. Verify cross-browser compatibility
  - Test application in Chrome, Firefox, Safari, Edge
  - Check JavaScript console for errors
  - Verify Thai text rendering across browsers
  - Test PDF generation in different browsers
  - _Requirements: 2.1, 2.2_

- [ ] 10. Update project documentation
  - Update README.md to reflect static application setup
  - Remove Python setup instructions
  - Add instructions for running as static application
  - Document deployment options for static hosting
  - _Requirements: 3.3_