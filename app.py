from flask import Flask, request, jsonify
from flask_cors import CORS
from flask_pymongo import PyMongo

app = Flask(__name__)
app.config["MONGO_URI"] = "mongodb://localhost:27017/BakerDB"
mongo = PyMongo(app)
CORS(app)

@app.route('/save_data', methods=['POST'])
def save_data():
    data = request.json
    employee_data = data.get('employeeData')
    tips_data = data.get('tipsData')
    
    if employee_data and tips_data:
        # Save to the database
        mongo.db.employeeData.insert_many(employee_data)
        mongo.db.tipsData.insert_one(tips_data)
        return jsonify({"message": "Data saved successfully"}), 201
    else:
        return jsonify({"error": "Invalid data"}), 400

if __name__ == '__main__':
    app.run(debug=True)