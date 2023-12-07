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


@app.route("/monitor")
def monitor():
    try: 
        locations = db['locations'].aggregate([
            {
                '$group': {
                    '_id': '$chatId',
                    'locations': {
                        '$addToSet':{
                            'latitude': '$latitude',
                            'longitude': '$longitude',
                            'nombre': '$nombre'
                        }
                    },
                    'name': {'$first': '$nombre'}
                },
            },
            {
                '$project':{
                    '_id': 0,
                    'chatId': '$_id',
                    'locations': 1
                }
            }
        ])

        result = list(locations)
        return jsonify(result)
    except Exception as e:
        return jsonify({'error': str(e)})

#----------------------------------------------------------------
@app.route('/register_area', methods=['POST'])
def register_delimited_area():
    try:
        data = request.get_json()
        coordinates_area = data['coordinates_area']
        risk_level = data['risk_level']
        area_name = data['area_name']

        # Crear un documento para la area
        area = {
            'area': {
                'type': 'Polygon',
                'coordinates': [coordinates_area]
            },
            'risk_level': risk_level,
            'area_name': area_name
        }

        # Insertar el documento en la colección de areas
        db['areas'].insert_one(area)

        return jsonify({'message': 'Zona registrada exitosamente'})
    except Exception as e:
        return jsonify({'error': str(e)})


@app.route('/get_areas', methods=['GET'])
def get_all_areas():
    try:
        # Obtener todas las áreas de la colección 'areas'
        areas_cursor = db['areas'].find()

        # Crear una lista para almacenar todas las áreas
        areas_list = []

        # Iterar sobre el cursor y agregar cada área a la lista
        for area in areas_cursor:
            # Convertir el ObjectId a cadena antes de agregarlo a la lista
            area['_id'] = str(area['_id'])
            areas_list.append(area)

        return jsonify({'areas': areas_list})
    except Exception as e:
        return jsonify({'error': str(e)})


@app.route('/get_dangerous_areas', methods=['GET'])
def get_dangerous_areas():
    try:
        # Obtener las áreas peligrosas de la colección 'areas'
        dangerous_areas_cursor = db['areas'].find({'risk_level': 'peligrosa'})

        # Crear una lista para almacenar las áreas peligrosas
        dangerous_areas_list = []

        # Iterar sobre el cursor y agregar cada área peligrosa a la lista
        for area in dangerous_areas_cursor:
            # Convertir el ObjectId a cadena antes de agregarlo a la lista
            area['_id'] = str(area['_id'])
            dangerous_areas_list.append(area)

        return jsonify({'dangerous_areas': dangerous_areas_list})
    except Exception as e:
        return jsonify({'error': str(e)})
    
    
@app.route('/check_dangerous_areas', methods=['GET'])
def check_dangerous_areas():
    try:
        # Obtener todas las ubicaciones para todos los usuarios
        all_locations = db['locations'].find()

        # Obtener todas las zonas peligrosas
        dangerous_areas = list(db['areas'].find({'risk_level': 'peligrosa'}))

        # Crear un diccionario para almacenar alertas por usuario
        user_alerts = {}

        # Iterar sobre todas las ubicaciones y verificar si están en una zona peligrosa
        for location in all_locations:
            user_chatId = location['chatId']
            user_point = Point(location['latitude'], location['longitude'])

            # Verificar si el usuario ya tiene una alerta en el diccionario
            if user_chatId not in user_alerts:
                user_alerts[user_chatId] = {'in_danger': False}

            # Verificar si el punto está dentro de alguna zona peligrosa
            for area in dangerous_areas:
                area_polygon = Polygon(area['area']['coordinates'])
                #print(user_chatId, area_polygon, user_point, area_polygon.contains(user_point), "\n")

                if area_polygon.contains(user_point):
                    user_alerts[user_chatId]['in_danger'] = True
                    break
                else:
                    user_alerts[user_chatId]['in_danger'] = False

        # Filtrar usuarios que están en peligro
        users_in_danger = [user for user, alert_status in user_alerts.items() if alert_status['in_danger']]

        if users_in_danger:
            return jsonify({'status': '1', 'users_in_danger': users_in_danger})
        else:
            return jsonify({'status': '0'})

    except Exception as e:
        return jsonify({'error': str(e)})

if __name__ == '__main__':
    app.run(debug=True)
