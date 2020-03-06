import json
from datetime import datetime

import pandas as pd
import pyodbc

from fmp import FMP

db_json = dict()
fmp_model = FMP()

for tbl in fmp_model.fmp_table_names:
    query = "select * from {tbl}".format(tbl=tbl)
    df = pd.read_sql(query, fmp_model.connection)

    print(tbl)
    col_types = [
        df.iloc[1, index].__class__.__name__ for index in range(len(df.columns))
    ]
    for elem in zip(df.columns, col_types):
        print(elem)
    print()

    db_json[tbl] = {}
    col_types = [
        df.iloc[1, index].__class__.__name__ for index in range(len(df.columns))
    ]
    for elem in zip(df.columns, col_types):
        db_json[tbl][elem[0]] = {}
        db_json[tbl][elem[0]]["type"] = elem[1]
        db_json[tbl][elem[0]]["pk"] = "pk" == elem[0][:2]
        db_json[tbl][elem[0]]["fk"] = "fk" == elem[0][:2]


curr_time = datetime.now().strftime("%Y%m%d_%H%M")

with open("./models/{time}_model.json".format(time=curr_time), "w") as f:
    json.dump(db_json, f, indent=4)
