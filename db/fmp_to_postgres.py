import argparse
import os
import pickle
import sys

import pandas as pd
import numpy as np
from tqdm import tqdm

from fmp import FMP
from psql import PSQL
from utils import edit_distance


def parse_args():
    parser = argparse.ArgumentParser()
    parser.add_argument("-d", "--dsn", help="dsn name")
    parser.add_argument("-u", "--username", help="username for dsn")
    parser.add_argument("-p", "--password", help="password for dsn")
    return parser.parse_args()


def get_pk_and_fk_from_table(fmp: FMP, df: pd.DataFrame, table_name: str):
    pk = None
    fks = []
    smallest_pk_edit_distance = float("inf")
    for field_name in df.columns:
        # extract primary keys
        if field_name[:3] == "pk_" and field_name[-3:] == "_id":
            # possible primary key
            distance = edit_distance(field_name[3:-3], table_name)
            if distance < smallest_pk_edit_distance:
                pk = field_name
                smallest_pk_edit_distance = distance

        # extract foreign keys
        if field_name[:3] == "fk_" and field_name[-3:] == "_id":
            fks.append((field_name, fmp.get_tablename_from_fieldname(field_name)))

    return pk, fks


def save_keys(filename: str, all_data: dict):
    np.save(filename, all_data)


def load_dict(filename: str):
    np_load_old = np.load
    np.load = lambda *a, **k,: np_load_old(*a, allow_pickle=True, **k)
    np_data = np.load(filename)[()]

    # Restore np.load
    np.load = np_load_old

    return np_data

def main(argv):
    fmp = FMP(argv.dsn, argv.username, argv.password)
    # TODO: extract username, password, and database name from the database.env file
    # TODO: encrypt the database.env file using git-secret
    psql = PSQL("postgres+psycopg2://postgres:HaitiCHI@0.0.0.0:5432/app_db")

    all_data = dict()
    for table_name in tqdm(fmp.table_names):
        print(table_name)
        df = fmp.read_table(table_name)
        # drop all exact duplicates
        df.drop_duplicates(inplace=True)
        if table_name == "meds_dispensed":
            new_df = df[df["pk_meds_dispensed"].notna()]
            new_df = new_df[new_df["fk_visit_id"].notna()]
            new_df = new_df[new_df["fk_med_key"].notna()]
            new_df.drop_duplicates(subset=["pk_meds_dispensed","fk_visit_id", "fk_med_key"], inplace=True)
            print(f"Table ({table_name}) lost ({len(df) - len(new_df)}) entries")
            df = new_df
        elif table_name == "diagnoses_made":
            new_df = df[df["pk_diagnoses_made"].notna()]
            new_df = new_df[new_df["fk_visit_id"].notna()]
            new_df = new_df[new_df["fk_diagnosis_key"].notna()]
            new_df.drop_duplicates(subset=["pk_diagnoses_made", "fk_visit_id", "fk_diagnosis_key"], inplace=True)
            print(f"Table ({table_name}) lost ({len(df) - len(new_df)}) entries")
            df = new_df
        elif table_name == "settings":
            df['pk_settings_id'] = df.index 
        elif table_name == "patients": 
            df.drop(["face_photo"], axis=1, inplace=True)
            query = "SELECT GetAs(face_photo, 'JPEG') FROM patients"
            result = fmp.cursor.execute(query)
            data = result.fetchall()
            data = [item[0] for item in data]
            df["face_photo"] = data

            
        psql.write_table(df, table_name, if_exists="replace")

        pk_field, fk_fields = get_pk_and_fk_from_table(fmp, df, table_name)
        all_data[table_name] = (pk_field, fk_fields)
    
    filename = "table_data.npy"
    save_keys(filename, all_data)
    

    filename = "table_data.npy"
    all_data = load_dict(filename)

    for table_name in all_data.keys():
        if table_name not in fmp._join_tables:
            pk_field, _ = all_data[table_name]
            if pk_field is not None:
                psql.execute_command(f"ALTER TABLE {table_name} ALTER COLUMN {pk_field} TYPE numeric USING {pk_field}::numeric;")
                psql.execute_command(f"ALTER TABLE {table_name} ADD PRIMARY KEY ({pk_field});")
        else:
            if table_name == "meds_dispensed":
                for pk_field in ["pk_meds_dispensed", "fk_visit_id"]:
                    psql.execute_command(f"ALTER TABLE {table_name} ALTER COLUMN {pk_field} TYPE numeric USING {pk_field}::numeric;")
                psql.execute_command(f"ALTER TABLE {table_name} ADD PRIMARY KEY (pk_meds_dispensed, fk_visit_id, fk_med_key);")
            elif table_name == "diagnoses_made":
                for pk_field in ["pk_diagnoses_made", "fk_visit_id"]:
                    psql.execute_command(f"ALTER TABLE {table_name} ALTER COLUMN {pk_field} TYPE numeric USING {pk_field}::numeric;")
                psql.execute_command(f"ALTER TABLE {table_name} ADD PRIMARY KEY (pk_diagnoses_made, fk_visit_id, fk_diagnosis_key);")


    for table_name in all_data.keys():
        _, fk_fields = all_data[table_name]

        for fk_field, fk_table in fk_fields:
            pk_fk_table = all_data[fk_table][0]
            # ASSUMES WE ARE ALWAYS LINKING TO THE PK OF THE TABLE
            constraint_name = f"fk_{fk_table}_id"

            psql.execute_command(f"ALTER TABLE {table_name} ALTER COLUMN {fk_field} TYPE numeric USING {fk_field}::numeric;")

            '''
            psql.execute_command(
                f"ALTER TABLE {table_name} DROP CONSTRAINT IF EXISTS {constraint_name};"
            )
            '''

            try:
                psql.execute_command(
                    f"ALTER TABLE {table_name} ADD CONSTRAINT {constraint_name} FOREIGN KEY ({fk_field}) REFERENCES {fk_table}({pk_fk_table});"
                )
            except Exception as e:
                print(f"FAILURE TO IMPLEMENT CONSTRAINT ON ({table_name}.{fk_field}) to ({fk_table}.{pk_fk_table})")


if __name__ == "__main__":
    sys.exit(main(parse_args()))
