@echo off
echo Checking for Python installation...
where python >nul 2>&1
if %ERRORLEVEL% NEQ 0 (
    echo Python is not found in your PATH. Please install Python and try again.
    echo You can download Python from https://www.python.org/downloads/
    exit /b 1
)

echo Checking for pipenv installation...
where pipenv >nul 2>&1
if %ERRORLEVEL% NEQ 0 (
    echo Installing pipenv...
    pip install pipenv
)

echo Setting up pipenv environment...
pipenv install

echo Creating virtual environment with venv as backup...
python -m venv venv

echo Activating virtual environment...
call venv\Scripts\activate.bat

echo Installing dependencies with pip as backup...
pip install -r requirements.txt

echo Creating .env file from template...
if not exist .env (
    copy .env.example .env
    echo .env file created from template.
) else (
    echo .env file already exists, skipping.
)

echo Creating necessary directories...
if not exist uploads mkdir uploads
if not exist generated_docs mkdir generated_docs

echo Setup complete!
echo To use pipenv, run: pipenv shell
echo To activate the venv environment, run: venv\Scripts\activate
echo To run the application, run: python app.py