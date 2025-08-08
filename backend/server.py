from flask import Flask, jsonify
from flask_cors import CORS
import subprocess
import json

app = Flask(__name__)
CORS(app)  # Enable CORS so frontend can talk to backend

@app.route('/api/stocks/<symbol>')
def get_stock(symbol):
    try:
        # Run the fetch_stock.py script and capture its output
        result = subprocess.run(['python', 'fetch_stock.py', symbol], capture_output=True, text=True)

        # Debug print for development
        print("=== STDOUT ===")
        print(result.stdout)
        print("=== STDERR ===")
        print(result.stderr)

        # Try to parse the result
        data = json.loads(result.stdout)
        return jsonify(data)
    except Exception as e:
        # If something goes wrong, return the error as JSON
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True, port=5000)
