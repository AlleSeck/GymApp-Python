@app.route('/api/auth', methods=['POST'])
def login():
    data = request.get_json()
    email = data.get("email")
    password = data.get("password")

    if not email or not password:
        return jsonify({"error": "Email and password are required"}), 400

    # to search user in the database
    user = db.users.find_one({"email": email.lower()})
    if not user or not bcrypt.check_password_hash(user["password"], password):
        return jsonify({"error": "Incorrect email or password"}), 401

    # genere a JWT token 
    token = create_access_token(identity={"email": email})
    return jsonify({"token": token}), 200
