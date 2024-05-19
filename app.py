from flask import Flask, request, send_from_directory, jsonify
from pymongo import MongoClient

app = Flask(__name__, static_url_path='', static_folder='public')

# Connect to MongoDB
client = MongoClient('mongodb://localhost:27017/')
db = client['BakerDB']

@app.route('/')
def serve_index():
    return send_from_directory(app.static_folder, 'index.html')

@app.route('/saveData', methods=['POST'])
def save_data():
    data = request.json

    employee_data = data.get('employeeData')
    tips_data = data.get('tipsData')

    # Check if both employee data and tips data are present
    if employee_data and tips_data:
        db['employeeData'].insert_one(employee_data)
        db['tipsData'].insert_one(tips_data)

        return 'Data saved successfully', 200
    else:
        return 'Missing data', 400

if __name__ == '__main__':
    app.run(debug=True)
