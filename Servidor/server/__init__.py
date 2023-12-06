from flask import Flask, jsonify, request
from pymongo import MongoClient
from flask_cors import CORS

client = MongoClient('mongodb://localhost:27017/')
db = client['WaveAlert']

def create_app():
    app = Flask(__name__)
    CORS(app)

    from .auth import auth as auth_blueprint
    app.register_blueprint(auth_blueprint)

    from .main import main as main_blueprint
    app.register_blueprint(main_blueprint)

    return app

app = create_app()