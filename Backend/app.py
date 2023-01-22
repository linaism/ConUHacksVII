from pymongo import MongoClient
from flask import Flask, jsonify, Response, make_response
import json
import pandas as pd
import datetime


app = Flask(__name__)
if __name__ == "__main__":
    app.run()

file_AQD = "data/AequitasData.json"
file_ALPHD = "data/AlphaData.json"
file_TSX = "data/TSXData.json"
filepath = "data/top10.json"

# DB Connection String
CONNECTION_STRING = (
    "mongodb+srv://hackathon_user:hackathon_user@cluster0.9tm85nf.mongodb.net/test"
)
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
list_cur_alpha = cursorAlpha
list_cur_aequitas = cursorAequitas
list_cur_tsx = cursorTSX

json_data_alpha = json.dumps(list_cur_alpha, indent=2)
json_data_aequitas = json.dumps(list_cur_aequitas, indent=2)
json_data_tsx = json.dumps(list_cur_tsx, indent=2)


def read_json_file(file_name: str) -> pd.DataFrame:
    df = pd.read_json(file_name)
    df["TimeStamp"] = pd.to_datetime(df["TimeStamp"])
    return df


def get_unique_symbols(data_frame: pd.DataFrame) -> list:
    symbols_list = []
    symbols = data_frame["Symbol"].unique()
    symbols_list.append(symbols)

    return symbols_list


def filter_by_symbol(data_frame: pd.DataFrame, symbol: str) -> pd.DataFrame:
    filtered_df = data_frame.query("Symbol == @symbol")[["TimeStamp", "OrderPrice"]]
    # if there is no OrderPrice, then set to null
    filtered_df["OrderPrice"] = filtered_df["OrderPrice"].fillna(0)
    return filtered_df


def get_unique_messageTypes(data_frame: pd.DataFrame) -> list:
    messageTypes_list = []
    messageTypes = data_frame["MessageType"].unique()
    messageTypes_list.append(messageTypes)

    return messageTypes_list


# takes a list of dataframes. Each dataframe is a stock exchange.
# returns a list of the top 10 symbols by  "MessageType == Trade and total count" sorted from largest to smallest
def get_top_10_symbols_by_trade_success(data_frames: list) -> dict:
    top10 = []
    for df in data_frames:
        filtered_df = df.query("MessageType == 'Trade'")
        counts = filtered_df["Symbol"].value_counts()
        for symbol, count in counts.items():
            top10.append((symbol, count))
    top10 = sorted(top10, key=lambda x: x[1], reverse=True)
    top10_toppest = top10[:10]
    top10_dict = {"Top 10": top10_toppest}
    return top10_dict


def get_top_10_symbols_by_cancelled(data_frames: list) -> dict:
    top10 = []
    for df in data_frames:
        filtered_df = df.query("MessageType == 'Cancelled'")
        counts = filtered_df["Symbol"].value_counts()
        for symbol, count in counts.items():
            top10.append((symbol, count))
    top10 = sorted(top10, key=lambda x: x[1], reverse=True)
    top10_toppest = top10[:10]
    top10_dict = {"Top 10": top10_toppest}
    return top10_dict


# use this function get_top_10_symbols_by_cancelled to get the top 10 symbols by cancelled Message type per second
def get_top_10_symbols_by_cancelled_per_second(data_frames: list) -> list:
    # returns a list that contains a sublist of tuples (symbol, count) where each sublist is a second in the timestamp
    top10 = []
    for df in data_frames:
        df["TimeStamps"] = pd.to_datetime(df["TimeStamp"])
        start_time = df["TimeStamps"].min()
        end_time = df["TimeStamps"].max()
        current_time = start_time
        while current_time < end_time:
            next_time = current_time + datetime.timedelta(seconds=1)
            filtered_df = df.query(
                "MessageType == 'Cancelled' and TimeStamp >= @current_time and TimeStamp < @next_time"
            )
            counts = filtered_df["Symbol"].value_counts()
            symbol_count = []
            for symbol, count in counts.items():
                symbol_count.append((symbol, count))
            symbols_count = sorted(symbol_count, key=lambda x: x[1], reverse=True)[:10]
            top10.append(symbols_count)
            current_time = next_time
    return top10


def get_top_10_symbols_by_trade_per_second(data_frames: list) -> dict:
    # returns a list that contains a sublist of tuples (symbol, count) where each sublist is a second in the timestamp
    top10 = []
    for df in data_frames:
        df["TimeStamps"] = pd.to_datetime(df["TimeStamp"])
        start_time = df["TimeStamps"].min()
        end_time = df["TimeStamps"].max()
        current_time = start_time
        while current_time < end_time:
            next_time = current_time + datetime.timedelta(seconds=1)
            filtered_df = df.query(
                "MessageType == 'Trade' and TimeStamp >= @current_time and TimeStamp < @next_time"
            )
            counts = filtered_df["Symbol"].value_counts()
            symbol_count = []
            for symbol, count in counts.items():
                symbol_count.append((symbol, count))
            symbols_count = sorted(symbol_count, key=lambda x: x[1], reverse=True)[:10]
            top10.append(symbols_count)
            current_time = next_time
    symbol_dict = {"Top 10": top10}
    return symbol_dict


def get_top_10_symbols_by_trade_success_per_one_second(data_frames: list) -> dict:
    top10 = []
    for df in data_frames:
        df["TimeStamps"] = pd.to_datetime(df["TimeStamp"])
        start_time = df["TimeStamps"].min()
        end_time = df["TimeStamps"].max()
        current_time = start_time
        while current_time < end_time:
            next = current_time + datetime.timedelta(seconds=1)
            filtered_df = df.query("TimeStamps >= @current_time and TimeStamps < @next")
            count = filtered_df["Symbol"].value_counts()
            symbols_count = []
            for symbol, count in count.items():
                symbols_count.append((symbol, count))
            symbols_count = sorted(symbols_count, key=lambda x: x[1], reverse=True)[:10]
            top10.append(symbols_count)
            current_time = next
    symbol_dict = {"symbols by time": top10}
    # sort by count
    # top10 = sorted(top10, key=lambda x: x[1], reverse=True)
    return symbol_dict


# Routes


@app.route("/sample")
def sample():
    data = {"name": "John Smith", "age": 30, "city": "New York"}
    res = make_response(json.dumps(data))
    res.headers.add("Access-Control-Allow-Origin", "*")
    return res


# route to return top 10 success per second from all collections
@app.route("/api/top10")
def getTopTen():
    TSX_df = read_json_file(json_data_tsx)
    Aequitas_df = read_json_file(json_data_aequitas)
    Alpha_df = read_json_file(json_data_alpha)

    top10 = get_top_10_symbols_by_trade_success([TSX_df, Aequitas_df, Alpha_df])
    print(top10)

    top10new = get_top_10_symbols_by_trade_success_per_one_second(
        [TSX_df, Aequitas_df, Alpha_df]
    )
    filepath = "data/top10.json"
    print("toppest")
    print(top10new, filepath)
    res = make_response(top10new)
    res.headers.add("Access-Control-Allow-Origin", "*")
    return res


# route to return top 10 success overall
@app.route("/api/top10All")
def getTopAll():
    TSX_df = read_json_file(json_data_tsx)
    Aequitas_df = read_json_file(json_data_aequitas)
    Alpha_df = read_json_file(json_data_alpha)

    top10 = get_top_10_symbols_by_trade_success([TSX_df, Aequitas_df, Alpha_df])
    res = make_response(top10)
    res.headers.add("Access-Control-Allow-Origin", "*")
    return res


# route to return top 10 success per second from certain collection
@app.route("/api/TopTenSuccessSeconds/<collection>")
def getTopTenSuccessSeconds(collection):
    df = ""
    if collection == "aequitas":
        df = read_json_file(json_data_aequitas)
    if collection == "tsx":
        df = read_json_file(json_data_tsx)
    if collection == "alpha":
        df = read_json_file(json_data_alpha)
    top10new = get_top_10_symbols_by_trade_success_per_one_second([df])
    res = make_response(top10new)
    res.headers.add("Access-Control-Allow-Origin", "*")
    return res


# all data from any collection
@app.route("/api/alldata/<collection>")
def getall(collection):
    # default to aequitas
    df = json_data_aequitas
    if(collection == "aequitas"):
        df = json_data_aequitas
    if(collection == "tsx"):
        df = json_data_tsx
    if(collection == "alpha"):
        df = json_data_alpha

    res = make_response(df)
    res.headers.add("Access-Control-Allow-Origin", "*")
    return res


@app.route("/")
def root():
    return "Welcome to the root page"
