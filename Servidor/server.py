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
    
    
""" # Cruce
def get_dangerous_areas():
    try:
        dangerous_areas = db['areas'].objects(risk_level__iexact='peligrosa')
        return dangerous_areas
    except Exception as e:
        return {'error': str(e)} """
    

""" def alert_if_in_dangerous_area():
    try:
        # Obtener la última ubicación registrada en locations NO PUEDO HASTA ACLARAR LOCATIONS
        #latest_location = db['locations'].objects.order_by('_id').first()

        if latest_location:
            # Obtener todas las áreas peligrosas
            dangerous_areas = get_dangerous_areas()

            # Crear un punto a partir de las coordenadas de la última ubicación
            point = Point(latest_location.coordinates['coordinates'])

            # Verificar si el punto está dentro de alguna área peligrosa
            for area in dangerous_areas:
                area_polygon = Polygon(area.area['coordinates']['coordinates'][0])
                if area_polygon.contains(point):
                    # Enviar alerta o tomar alguna acción
                    print('¡Alerta! La última ubicación está dentro de un área peligrosa.')
                    return
    except Exception as e:
        print(f'Error: {e}') """

if __name__ == '__main__':
    app.run(debug=True)
