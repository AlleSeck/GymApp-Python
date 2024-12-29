from flask import Flask, request, jsonify
from pymongo import MongoClient
from flask_bcrypt import Bcrypt
from flask_jwt_extended import JWTManager, create_access_token, jwt_required
from dotenv import load_dotenv
import os

# Charger les variables d'environnement
load_dotenv()

app = Flask(__name__)

# Configuration MongoDB
client = MongoClient("mongodb://localhost:27017/")
db = client["gym_app"]

# Configuration JWT avec clé secrète depuis le fichier .env
app.config["JWT_PRIVATE_KEY"] = os.getenv("JWT_PRIVATE_KEY")
jwt = JWTManager(app)

# Bcrypt pour le hachage des mots de passe
bcrypt = Bcrypt(app)
