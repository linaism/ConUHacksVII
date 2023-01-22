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


def get_top_10_symbols_by_trade_success_per_one_second(data_frames: list) -> list:
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


TSX_df = read_json_file(file_TSX)
Aequitas_df = read_json_file(file_AQD)
Alpha_df = read_json_file(file_ALPHD)
top10 = get_top_10_symbols_by_trade_success([TSX_df, Aequitas_df, Alpha_df])
print(top10)

top10new = get_top_10_symbols_by_trade_success_per_one_second(
    [TSX_df, Aequitas_df, Alpha_df]
)
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
