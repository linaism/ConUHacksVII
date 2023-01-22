import pandas as pd
import datetime
import json

file_AQD = "data/AequitasData.json"
file_ALPHD = "data/AlphaData.json"
file_TSX = "data/TSXData.json"

filepath = "data/top10.json"


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
def get_top_10_symbols_by_trade_success(data_frames: list) -> list:
    top10 = []
    for df in data_frames:
        filtered_df = df.query("MessageType == 'Trade'")
        counts = filtered_df["Symbol"].value_counts()
        for symbol, count in counts.items():
            top10.append((symbol, count))
    top10 = sorted(top10, key=lambda x: x[1], reverse=True)
    return top10[:10]


def get_top_10_symbols_by_cancelled(data_frames: list) -> list:
    top10 = []
    for df in data_frames:
        filtered_df = df.query("MessageType == 'Cancelled'")
        counts = filtered_df["Symbol"].value_counts()
        for symbol, count in counts.items():
            top10.append((symbol, count))
    top10 = sorted(top10, key=lambda x: x[1], reverse=True)
    return top10[:10]


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


def get_top_10_symbols_by_trade_per_second(data_frames: list) -> list:
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
    return top10


def get_total_trades_over_time(data_frames: list) -> list:
    # each index in the list is a second in the timestamp starting from 0. The value at each index is the total trades for that second and the ones before it
    trades_over_time = []
    sum_trades = 0
    for data_frame in data_frames:
        data_frame["TimeStamps"] = pd.to_datetime(data_frame["TimeStamp"])
        start_time = data_frame["TimeStamps"].min()
        end_time = data_frame["TimeStamps"].max()
        curr_time = start_time
        counter = 0
        while curr_time < end_time:
            next_time = curr_time + datetime.timedelta(seconds=1)
            filtered_df = data_frame.query(
                "MessageType == 'Trade' and TimeStamp >= @curr_time and TimeStamp < @next_time"
            )
            sum_trades += len(filtered_df)
            trades_over_time.append(sum_trades)
            curr_time = next_time
            counter = counter + 1
            if counter >= 240:
                break
    return trades_over_time


def get_total_cancelled_over_time(data_frames: list) -> list:
    # each index in the list is a second in the timestamp starting from 0. The value at each index is the total trades for that second and the ones before it
    trades_over_time = []
    sum_trades = 0
    for data_frame in data_frames:
        data_frame["TimeStamps"] = pd.to_datetime(data_frame["TimeStamp"])
        start_time = data_frame["TimeStamps"].min()
        end_time = data_frame["TimeStamps"].max()
        curr_time = start_time
        counter = 0
        while curr_time < end_time:
            next_time = curr_time + datetime.timedelta(seconds=1)
            filtered_df = data_frame.query(
                "MessageType == 'Cancelled' and TimeStamp >= @curr_time and TimeStamp < @next_time"
            )
            sum_trades += len(filtered_df)
            trades_over_time.append(sum_trades)
            curr_time = next_time
            counter = counter + 1
            if counter >= 240:
                break
    return trades_over_time


TSX_df = read_json_file(file_TSX)
Aequitas_df = read_json_file(file_AQD)
Alpha_df = read_json_file(file_ALPHD)
combined_df = pd.concat([TSX_df, Aequitas_df, Alpha_df])


# top10 = get_top_10_symbols_by_cancelled_per_second([Aequitas_df])
# print(top10)

# tot_trades = get_total_cancelled_over_time([combined_df])
# print(tot_trades)
# print(len(tot_trades))

# top10new = get_top_10_symbols_by_trade_success_per_one_second(
#     [TSX_df, Aequitas_df, Alpha_df]
# )
# print("TSX_df.head():")
# print(TSX_df.head())

# TSX_unique_symbols = get_unique_symbols(TSX_df)
# print("TSX_unique_symbols:")
# print(TSX_unique_symbols)

# TSX_stock_price = filter_by_symbol(TSX_df, "OA14Y")
# print("TSX_stock_price:")
# print(TSX_stock_price.to_json(orient="records"))

# unique_message_types = get_unique_messageTypes(TSX_df)
# print("TSX_df.messageTypes:")
# print(unique_message_types)
