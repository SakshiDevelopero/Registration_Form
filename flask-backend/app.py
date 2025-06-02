from flask import Flask, request, jsonify
from flask_cors import CORS  # Import CORS
import mysql.connector

app = Flask(__name__)
CORS(app)  # Enable CORS

# MySQL Connection
db = mysql.connector.connect(
    host="localhost",
    user="root",
    password="",
    database="loginform"
)
cursor = db.cursor()

# CREATE: Register User
@app.route('/register', methods=['POST'])
def register():
    data = request.json
    cursor.execute("SELECT * FROM users WHERE email = %s", (data['email'],))
    existing_user = cursor.fetchone()
    if existing_user:
        return jsonify({'message': 'Email already exists'}), 400

    query = """
        INSERT INTO users (first_name, last_name, email, birthdate, gender, phone, course) 
        VALUES (%s, %s, %s, %s, %s, %s, %s)
    """
    cursor.execute(query, (data['first_name'], data['last_name'], data['email'], data['birthdate'], data['gender'], data['phone'], data['course']))
    db.commit()
    return jsonify({'message': 'User registered successfully'})


# READ: Get All Users
@app.route('/users', methods=['GET'])
def get_users():
    cursor.execute("SELECT id, first_name, last_name, email, birthdate, gender, phone, course FROM users")
    users = cursor.fetchall()
    return jsonify([{
        'id': u[0], 'first_name': u[1], 'last_name': u[2], 'email': u[3],
        'birthdate': u[4], 'gender': u[5], 'phone': u[6], 'course': u[7]
    } for u in users])

# READ: Get a Single User for Editing
@app.route('/get_user/<int:user_id>', methods=['GET'])
def get_user(user_id):
    cursor.execute("SELECT * FROM users WHERE id = %s", (user_id,))
    user = cursor.fetchone()
    if user:
        return jsonify({
            'id': user[0],
            'first_name': user[1],
            'last_name': user[2],
            'email': user[3],
            'birthdate': user[4],
            'gender': user[5],
            'phone': user[6],
            'course': user[7]
        }), 200
    else:
        return jsonify({'message': 'User not found'}), 404

# UPDATE: Update User
@app.route('/update/<int:user_id>', methods=['PUT'])
def update_user(user_id):
    data = request.json

    # Check if the email already exists for another user
    cursor.execute("SELECT * FROM users WHERE email = %s AND id != %s", (data['email'], user_id))
    existing_user = cursor.fetchone()
    if existing_user:
        return jsonify({'message': 'Email already exists'}), 400

    # Update user data excluding birthdate
    query = """
        UPDATE users 
        SET first_name = %s, last_name = %s, email = %s, gender = %s, 
            phone = %s, course = %s
        WHERE id = %s
    """
    cursor.execute(query, (data['first_name'], data['last_name'], data['email'], data['gender'],
                           data['phone'], data['course'], user_id))
    db.commit()  # Commit the transaction

    # Fetch updated user data
    cursor.execute("SELECT * FROM users WHERE id = %s", (user_id,))
    updated_user = cursor.fetchone()
    
    if updated_user:
        return jsonify({
            'id': updated_user[0],
            'first_name': updated_user[1],
            'last_name': updated_user[2],
            'email': updated_user[3],
            'gender': updated_user[4],
            'phone': updated_user[5],
            'course': updated_user[6]
        }), 200
    else:
        return jsonify({'message': 'User update failed'}), 500




# DELETE: Delete User
@app.route('/delete/<int:user_id>', methods=['DELETE'])
def delete_user(user_id):
    cursor.execute("DELETE FROM users WHERE id = %s", (user_id,))
    db.commit()
    return jsonify({'message': 'User deleted successfully'})


if __name__ == "__main__":
    app.run(debug=True, port=5000)
