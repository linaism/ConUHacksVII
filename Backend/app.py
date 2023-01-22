from pymongo import MongoClient
from flask import Flask, jsonify, make_response
from bson.json_util import dumps
import json

app = Flask(__name__)
if __name__ == "__main__":
    app.run()


# DB Connection String
CONNECTION_STRING = "mongodb+srv://hackathon_user:hackathon_user@cluster0.9tm85nf.mongodb.net/test"
client = MongoClient(CONNECTION_STRING)
# DB definitiion
db = client.Hackathon
# DB Collections
alpha_collection = db.Alpha
aequitas_collection = db.Aequitas
tsx_collection = db.TSX

# cursor on Alpha
cursorAlpha = alpha_collection.find()
cursorAequitas = aequitas_collection.find()
cursorTSX = tsx_collection.find()

# list on cursors
list_cur_alpha = list(cursorAlpha)
list_cur_aequitas = list(cursorAequitas)
list_cur_tsx = list(cursorTSX)

json_data_alpha = dumps(list_cur_alpha, indent = 2) 
json_data_aequitas = dumps(list_cur_aequitas, indent = 2)
json_data_tsx = dumps(list_cur_tsx, indent = 2)


@app.route('/sample')
def sample():
    data = {
        "name": "John Smith",
        "age": 30,
        "city": "New York"
    }
    res = make_response(dumps(data))
    res.headers.add("Access-Control-Allow-Origin", "*")
    return res

@app.route("/api/aequitas_all")
def aequitas():
    return json_data_aequitas

@app.route("/api/alpha_all")
def alpha():
    return json_data_alpha

@app.route("/api/tsx_all")
def tsx():
    return json_data_tsx

