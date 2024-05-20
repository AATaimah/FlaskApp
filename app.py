from flask import Flask, render_template, request, send_from_directory, jsonify
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

    # Check if both employee data and tips data are present
    if employee_data and tips_data:
        db['employeeData'].insert_one(employee_data)
        db['tipsData'].insert_one(tips_data)

        return 'Data saved successfully', 200
    else:
        return 'Missing data', 400
    

@app.route('/api/employeeData')
def api_employee_data():
    # Fetch all documents from the employeeData collection
    employee_data_cursor = db['employeeData'].find({})
    employee_data = []
    for emp in employee_data_cursor:
        emp['_id'] = str(emp['_id'])
        emp['name'] = emp.pop('name', 'Unknown')
        employee_data.append(emp)

    return jsonify(employee_data)

@app.route('/api/tipsData')
def api_tips_data():
    # Fetch all documents from the tipsData collection
    tips_data_cursor = db['tipsData'].find({})
    tips_data = []
    for tip in tips_data_cursor:
        tip['_id'] = str(tip['_id'])
        tips_data.append(tip)

    return jsonify(tips_data)

@app.route('/displayData')
def display_data():
    return render_template('viewPrevious.html')

if __name__ == '__main__':
    app.run(debug=True)
