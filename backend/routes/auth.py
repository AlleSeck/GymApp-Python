@app.route('/api/register', methods=['POST'])
def register():
    data = request.get_json()
    email = data.get("email")
    password = data.get("password")

    if not email or not password:
        return jsonify({"error": "Email and password are required"}), 400

    # to check if the user exists
    if db.users.find_one({"email": email.lower()}):
        return jsonify({"error": "User already exists"}), 400

    # Hacher the password
    hashed_password = bcrypt.generate_password_hash(password).decode('utf-8')

    # to insert in MongoDB
    db.users.insert_one({
        "email": email.lower(),
        "password": hashed_password
    })

    return jsonify({"message": "User registered successfully"}), 201
