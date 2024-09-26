from flask import Flask, jsonify, request,abort
from pymongo import MongoClient
from flask_cors import CORS
from shapely.geometry import Polygon, Point
from itertools import combinations
from geopy.distance import geodesic
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
        areas_cursor = db['areas'].find({})

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


@app.route('/get_safe_areas', methods=['GET'])
def get_all_safe_areas():
    try:
        # Obtener todas las áreas de la colección 'areas'
        areas_cursor = db['areas'].find({'risk_level': 'Bajo'})

        # Crear una lista para almacenar todas las áreas
        areas_list = []

        # Iterar sobre el cursor y agregar cada área a la lista
        for area in areas_cursor:
            # Convertir el ObjectId a cadena antes de agregarlo a la lista
            area['_id'] = str(area['_id'])
            areas_list.append(area)

        return jsonify({'areas_safe': areas_list})
    except Exception as e:
        return jsonify({'error': str(e)})

@app.route('/get_dangerous_areas', methods=['GET'])
def get_dangerous_areas():
    try:
        # Obtener las áreas peligrosas de la colección 'areas'
        dangerous_areas_cursor = db['areas'].find({'risk_level': 'Alto'})

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
        dangerous_areas = list(db['areas'].find({'risk_level': 'Alto'}))
        
        # Crear un diccionario para almacenar alertas por usuario
        user_alerts = {}

        # Iterar sobre todas las ubicaciones y verificar si están en una zona peligrosa
        for location in all_locations:
            user_chatId = location['chatId']
            user_name = location['name']
            user_pos = [location['latitude'], location['longitude']]
            user_point = Point(location['latitude'], location['longitude'])
            # Verificar si el usuario ya tiene una alerta en el diccionario
            if user_chatId not in user_alerts:
                user_alerts[user_chatId] = {'user_name': user_name, 'in_danger': False, 'user_pos': user_pos}

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
        users_in_danger_chatId = [user for user, alert_status in user_alerts.items() if alert_status['in_danger']]
        users_in_danger_names = [alert_status['user_name'] for user, alert_status in user_alerts.items() if alert_status['in_danger']]
        users_in_danger_pos = [alert_status['user_pos'] for user, alert_status in user_alerts.items() if alert_status['in_danger']]

        if users_in_danger_chatId:
            return jsonify({'status': '1', 'users_in_danger_chatId': users_in_danger_chatId, 'user_in_danger_name': users_in_danger_names, 'user_in_danger_pos': users_in_danger_pos})
        else:
            return jsonify({'status': '0','users_in_danger_chatId': [], 'user_in_danger_name': []})

    except Exception as e:
        print("3")
        return jsonify({'error': str(e)})

#Alertas no atendidas
@app.route("/alerts", methods=['GET'])
def alerts():   
    # Proyección para excluir el campo "_id"
    projection = {"_id": 0}

    alertas = db['alerts'].find({"status": "No atendida"}, projection)
    alertas_list = [alerta for alerta in alertas]

    return jsonify(alertas_list)

@app.route("/atender",methods=['POST'])
def atender():
    datos = request.json
    print(datos['chatId'])
    user = db['alerts'].find_one({'chatId': datos['chatId']})
    db['alerts'].update_many({'chatId': user['chatId']}, {'$set': {'status': 'Atendida'}})

    return jsonify({'mensaje': 'Alerta atendida correctamente'})

@app.route("/send-alert", methods=['POST'])
def send_alert():
    datos = request.json

    db['peligros'].insert_one(datos)
    print(datos)
    return jsonify({'mensaje': 'Datos recibidos correctamente'})


@app.route('/generate_heatmap', methods=['GET'])
def generate_heatmap():
    try:
        # Obtener las últimas ubicaciones para todos los usuarios
        latest_locations = db['locations'].aggregate([
            {'$sort': {'_id': -1}},
            {'$group': {'_id': '$chatId', 'latest_location': {'$first': '$$ROOT'}}}
        ])

        # Convertir el cursor en una lista de diccionarios
        latest_locations = list(latest_locations)
        print(len(latest_locations), latest_locations)
        # Crear un diccionario para almacenar grupos de ubicaciones cercanas
        location_groups = {}

        # Combinar todas las ubicaciones para verificar distancias
        for loc1, loc2 in combinations(latest_locations, 2):
            coords1 = (loc1['latest_location']['latitude'], loc1['latest_location']['longitude'])
            coords2 = (loc2['latest_location']['latitude'], loc2['latest_location']['longitude'])

            # Calcular la distancia geodésica entre las coordenadas
            distance = geodesic(coords1, coords2).meters

            # Si la distancia es menor a un metro, agregar ambas ubicaciones al mismo grupo
            if distance < 200:
                if loc1['_id'] not in location_groups:
                    location_groups[loc1['_id']] = [loc1]

                if loc2['_id'] not in location_groups:
                    location_groups[loc2['_id']] = [loc2]

                # Unir ambos grupos si ya existen
                if loc1['_id'] in location_groups and loc2['_id'] in location_groups:
                    location_groups[loc1['_id']].extend(location_groups[loc2['_id']])
                    del location_groups[loc2['_id']]

        # Filtrar grupos con más de dos personas
        filtered_groups = [group for group in location_groups.values() if len(group) >= 2]

        # Crear un diccionario para almacenar la información de los centros de grupos
        heat_map_centers_dict = {}
        for group in filtered_groups:
            center_coords = (group[0]['latest_location']['latitude'], group[0]['latest_location']['longitude'])
            if center_coords not in heat_map_centers_dict or len(group) > len(heat_map_centers_dict[center_coords]):
                    heat_map_centers_dict[center_coords] = {'center': {'latitude': center_coords[0], 'longitude': center_coords[1]},
                                                            'intense': len(group) * 100}

        # Crear una lista a partir del diccionario
        heat_map_centers = list(heat_map_centers_dict.values())

        print(heat_map_centers)
        return jsonify({'heatmap_centers': heat_map_centers})

    except Exception as e:
        return jsonify({'error': str(e)})

@app.route('/lastposition', methods=['GET'])
def last_position():
    # Consultar las últimas posiciones para cada chatId
    pipeline = [
        {"$sort": {"_id": -1}},  # Ordenar por _id en orden descendente (últimos primero)
        {"$group": {"_id": "$chatId", "last_position": {"$first": "$$ROOT"}}},  # Agrupar por chatId y obtener el primer documento de cada grupo
        {"$replaceRoot": {"newRoot": "$last_position"}}  # Reemplazar el documento actual con el documento encontrado
    ]

    result = list(db['locations'].aggregate(pipeline))
    for item in result:
        item['_id'] = str(item['_id'])
    return jsonify(result)

if __name__ == '__main__':
    app.run(debug=True)
