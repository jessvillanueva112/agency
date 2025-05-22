from flask import Flask, request, jsonify
import joblib
import os

app = Flask(__name__)
model = joblib.load('risk_model.pkl')  # Make sure this file is in the same directory

@app.route('/predict-risk', methods=['POST'])
def predict_risk():
    data = request.json  # Expecting: {"grade": 11, "riskLevel_num": 2}
    X = [[data['grade'], data['riskLevel_num']]]
    prediction = model.predict(X)[0]
    probability = model.predict_proba(X)[0][1]  # Probability of atRisk=True
    return jsonify({'atRisk': bool(prediction), 'probability': float(probability)})

if __name__ == "__main__":
    port = int(os.environ.get("PORT", 5001))
    app.run(host="0.0.0.0", port=port)  