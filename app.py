from flask import Flask, render_template, jsonify, send_from_directory
import os

app = Flask(__name__)

@app.route('/')
def index():
    """Render the main form page."""
    return render_template('form.html')

@app.route('/generate', methods=['POST'])
def generate_document():
    """
    Handle form submission and document generation.
    This will be implemented in a future task.
    """
    # This will be implemented in task 5.3
    return jsonify({"status": "Not implemented yet"})

@app.route('/download/<format>')
def download_document(format):
    """
    Handle document download.
    This will be implemented in a future task.
    """
    # This will be implemented in task 5.4
    return jsonify({"status": "Not implemented yet"})

@app.route('/utils/<filename>')
def serve_utils_file(filename):
    """Serve files from the utils directory."""
    return send_from_directory('utils', filename)

@app.route('/public/<filename>')
def serve_public_file(filename):
    """Serve files from the public directory."""
    return send_from_directory('public', filename)

@app.route('/static/font/<filename>')
def load_font(filename):
    """Serve font files from the static/font directory."""
    return send_from_directory('static/font', filename)

@app.route('/static/img/<filename>')
def load_img(filename):
    """Serve img files from the static/img directory."""
    return send_from_directory('static/img', filename)

@app.route('/static/element-of-pdf/<filename>')
def load_element_of_pdf(filename):
    """Serve element-of-pdf files from the static/element-of-pdf directory."""
    return send_from_directory('static/element-of-pdf', filename)

if __name__ == '__main__':
    app.run(debug=True)