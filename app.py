from flask import Flask, render_template, request, jsonify
import pandas as pd
import pickle
import numpy as np
from xgboost import XGBClassifier

app = Flask(__name__)

# Load the trained models and preprocessing objects
with open('trained_models.pkl', 'rb') as f:
    models = pickle.load(f)

with open('preprocessing_objects.pkl', 'rb') as f:
    preprocessing = pickle.load(f)

@app.route('/')
def home():
    return render_template('index.html')

import numpy as np

@app.route('/predict', methods=['POST'])
def predict():
    # Get data from form
    data = request.form.to_dict()
    
    # Convert to DataFrame
    input_df = pd.DataFrame([data])
    
    # Preprocess the input
    for column, encoder in preprocessing['label_encoders'].items():
        if column in input_df.columns:
            input_df[column] = encoder.transform(input_df[column])
    
    # Scale features
    input_scaled = preprocessing['scaler'].transform(input_df)
    
    # Make predictions
    lr_prob = models['logistic_regression'].predict_proba(input_scaled)[0][1]
    rf_prob = models['random_forest'].predict_proba(input_scaled)[0][1]
    xgb_prob = models['xgboost'].predict_proba(input_scaled)[0][1]
    avg_prob = (lr_prob + rf_prob + xgb_prob) / 3
    
    # Identify key risk factors (top 3 features with highest importance)
    feature_importance = list(zip(input_df.columns, models['xgboost'].feature_importances_))
    feature_importance.sort(key=lambda x: x[1], reverse=True)
    key_risk_factors = [
        {"name": feature, "value": float(input_df[feature].values[0])}
        for feature, _ in feature_importance[:3]
    ]
    
    # Prepare response
    response = {
        'lr_probability': f"{float(lr_prob):.1%}",
        'rf_probability': f"{float(rf_prob):.1%}",
        'xgb_probability': f"{float(xgb_prob):.1%}",
        'avg_probability': f"{float(avg_prob):.1%}",
        'risk_level': 'Low' if avg_prob < 0.3 else 'Medium' if avg_prob < 0.7 else 'High',
        'key_risk_factors': key_risk_factors
    }
    
    return jsonify(response)

if __name__ == '__main__':
    app.run(debug=True)