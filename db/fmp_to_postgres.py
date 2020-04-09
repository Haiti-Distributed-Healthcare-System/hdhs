import argparse
import os
import pandas as pd
import sys
from tqdm import tqdm

from sqlalchemy import Column, Integer, MetaData, String, Table, create_engine

from fmp import FMP
from utils import edit_distance

engine = create_engine("postgres+psycopg2://postgres:HaitiCHI@0.0.0.0:5432/app_db")


def parse_args():
    parser = argparse.ArgumentParser()
    parser.add_argument("-d", "--dsn", help="dsn name")
    parser.add_argument("-u", "--username", help="username for dsn")
    parser.add_argument("-p", "--password", help="password for dsn")
    return parser.parse_args()


def get_pk_and_fk_from_table(fmp: FMP, df: pd.DataFrame, table_name: str):
    pk = None 
    fks = []
    smallest_pk_edit_distance = 1234567
    for field_name in df.columns:
        # extract primary keys
        if field_name[:3] == "pk_":
            # possible primary key
            distance = edit_distance(field_name[3:-3], table_name)
            if distance < smallest_pk_edit_distance:
                pk = field_name
                smallest_pk_edit_distance = distance

        # extract foreign keys
        if field_name[:3] == "fk_":
            fks.append((field_name, fmp.get_tablename_from_fieldname(field_name)))

    return pk, fks


def main(argv):
    fmp = FMP(argv.dsn, argv.username, argv.password)

    all_data = dict()
    for table_name in tqdm(fmp.fmp_table_names):
        query = "select * from {table_name}".format(table_name=table_name)
        df = pd.read_sql(query, fmp.connection)
        df.to_sql(con=engine, name=table_name, if_exists="replace", index=False)

        pk_field, fk_fields = get_pk_and_fk_from_table(fmp, df, table_name)
        all_data[table_name] = (pk_field, fk_fields)

    for table_name in all_data.keys():
        pk_field, fk_fields = all_data[table_name]

        with engine.connect() as con:
            con.execute(
                f"ALTER TABLE {table_name} ADD PRIMARY KEY ({pk_field});"
            )
            # for fk_field, fk_table in fk_fields:
            #     pk_fk_table = all_data[fk_table][0]   
            #     # POTENTIALLY SUS: ASSUMES WE ARE ALWAYS LINKING TO THE PK OF THE TABLE             
            #     constraint_name = f"fk_{fk_table}_id"
            #     con.execute(
            #         f"ALTER TABLE {table_name} ADD CONSTRAINT {constraint_name} FOREIGN KEY ({fk_field}) REFERENCES {fk_table}({pk_fk_table});"
            #     )

if __name__ == "__main__":
    sys.exit(main(parse_args()))
