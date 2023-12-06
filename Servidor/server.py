from flask import Flask, jsonify, request,abort
from pymongo import MongoClient
from flask_cors import CORS
app = Flask(__name__)
CORS(app)
client = MongoClient('mongodb://localhost:27017/')
db = client['WaveAlert']

@app.route("/")
def root():
    return 'Index'

@app.route("/login",methods=["POST"])
def login():

    users = db['User']
    data = request.get_json()
    mail = data['mail']
    password = data['pass']

    user = users.find_one({'mail':mail, 'pass':password})
    if user:
        users.find_one_and_update({'mail':mail, 'pass':password},{'$set':{'logged':True}})
        return jsonify({'email': user['mail'], 'pass': user['pass'], 'state': True})
    else:
        abort(404,{'error':'Usuario no encontrado'})

@app.route("/logout",methods=["POST"])
def logout():
    users = db['User']
    data = request.get_json()
    mail = data['mail']
    password = data['pass']

    user = users.find_one({'mail':mail})
    
    if user:
        users.find_one_and_update({'mail':mail},{'$set':{'logged':False}})
        return jsonify({'state': 'Success'})
    else:
        abort(404,{'error':'Usuario no encontrado'})

@app.route("/auth/user")
def authUser():
    users = db['User']
    user = users.find_one({'logged': True})
    if user: 
        return jsonify({'email': user['mail'], 'state': True})
    else:
        abort(404,{'error':'Usuario no encontrado'})

if __name__ == '__main__':
    app.run(debug=True)