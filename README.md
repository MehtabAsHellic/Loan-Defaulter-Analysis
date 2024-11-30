# Loan Default Prediction Project

## Overview

This project is a machine learning application that predicts the likelihood of a loan default based on various factors. It uses three different algorithms - Logistic Regression, Random Forest, and XGBoost - to make predictions and provides a user-friendly web interface for interaction.

## Table of Contents

1. [Prerequisites](#prerequisites)
2. [Installation](#installation)
3. [Project Structure](#project-structure)
4. [Usage](#usage)
5. [How It Works](#how-it-works)
6. [Customization](#customization)
7. [Troubleshooting](#troubleshooting)
8. [Contributing](#contributing)
9. [License](#license)
10. [Summary](#Summary)

## Prerequisites

Before you begin, ensure you have met the following requirements:

- Python 3.8 or higher
- pip (Python package manager)
- Git (for cloning the repository)

- Windows:
pip install ipywidgets
pip install pandas
pip install numpy
pip install pickle-mixin
pip install xgboost
pip install scikit-learn
pip install flask

- Mac:
pip3 install ipywidgets
pip3 install pandas
pip3 install numpy
pip3 install pickle-mixin
pip3 install xgboost
pip3 install scikit-learn
pip3 install flask

## Installation

        Follow these steps to get your development environment set up:

        1. Clone the repository
        2. Create a virtual environment
                python -m venv venv
        3. Activate the virtual environment
        - On Windows:
                venv\Scripts\activate
        - On macOS and Linux:
                source venv/bin/activate

## Project Structure
loan-default-prediction/
│
├── data/
│   └── loan_default.csv
├── models/
│   ├── logistic_regression_model.joblib
│   ├── random_forest_model.joblib
│   └── xgboost_model.joblib
├── static/
│   ├── style.css
│   └── script.js
├── templates/
│   └── index.html
├── app.py
├── train_models.py
├── requirements.txt
└── README.md

## Usage

1. Train the models (if not already trained):
python loan_defualter_project.py

2. Run the Flask application:
python app.py

3. Open a web browser and go to `http://localhost:5000`

4. Fill in the loan details in the form and click "Predict Default Risk" to see the results.

## How It Works

1. **Data Preprocessing**: The raw loan data is preprocessed, including encoding categorical variables and scaling numerical features.

2. **Model Training**: Three models (Logistic Regression, Random Forest, and XGBoost) are trained on the preprocessed data.

3. **Web Interface**: A Flask web application provides a user-friendly interface for inputting loan details.

4. **Prediction**: When a user submits the form, the application processes the input, runs it through all three models, and returns the prediction results.

5. **Results Display**: The web interface displays the default probability for each model, an average probability, a risk assessment, and key risk factors.

## Customization

- To use your own dataset, replace the `loan_default.csv` file in the `data/` directory and update the `train_models.py` script accordingly.
- Modify the `app.py` file to change the prediction logic or add new features.
- Update the HTML, CSS, and JavaScript files in the `templates/` and `static/` directories to customize the user interface.

## Troubleshooting

If you encounter any issues:

1. Ensure all prerequisites are installed correctly.
2. Check that you're using the correct Python version.
3. Verify that all required packages are installed (`pip list`).
4. Make sure the virtual environment is activated when running the application.

For specific errors, please check the console output or Flask error messages for more details.

## Contributing

Contributions to this project are welcome. Please fork the repository and submit a pull request with your changes.

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Summary

1. **Install Required Libraries**:  
   Install the necessary libraries based on your operating system:
   - **Windows**:
     ```bash
     pip install ipywidgets pandas numpy pickle-mixin xgboost scikit-learn flask
     ```
   - **macOS/Linux**:
     ```bash
     pip3 install ipywidgets pandas numpy pickle-mixin xgboost scikit-learn flask
     ```

2. **Set Up Development Environment**:
   - Create and activate a virtual environment:
     ```bash
     python -m venv venv
     ```
     - **Windows**:
       ```bash
       venv\Scripts\activate
       ```
     - **macOS/Linux**:
       ```bash
       source venv/bin/activate
       ```

3. **Train the Models** (if not already trained):
   python train_models.py

4. **Run the Flask Application**
   python app.py
   
5. **Access the Web Application**
        Open your browser and go to http://127.0.0.1:5000 to interact with the Loan Default Prediction tool.