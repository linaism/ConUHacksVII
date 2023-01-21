import pandas as pd

file_AQD = "data/AequitasData.json"
file_ALPHD = "data/AlphaData.json"
file_TSX = "data/TSXData.json"


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


TSX_df = read_json_file(file_TSX)
print("TSX_df.head():")
print(TSX_df.head())

TSX_unique_symbols = get_unique_symbols(TSX_df)
# print("TSX_unique_symbols:")
# print(TSX_unique_symbols)

TSX_stock_price = filter_by_symbol(TSX_df, "OA14Y")
print("TSX_stock_price:")
print(TSX_stock_price.to_json(orient="records"))
