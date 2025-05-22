from flask import Flask, request, jsonify

app = Flask(__name__)

@app.route('/predict-note-type', methods=['POST'])
def predict_note_type():
    data = request.json
    # Always return a fake note type for demo
    return jsonify({"noteType": "general"})

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5002)