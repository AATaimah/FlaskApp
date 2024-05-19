from flask import Flask, request, jsonify, send_from_directory
from pymongo import MongoClient
from datetime import datetime

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
    
    if employee_data:
        db['employeeData'].insert_many(employee_data)
    if tips_data:
        db['tipsData'].insert_one(tips_data)
    
    return 'Data saved successfully', 200

if __name__ == '__main__':
    app.run(debug=True)
