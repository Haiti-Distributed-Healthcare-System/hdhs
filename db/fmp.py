import json
from datetime import datetime

import numpy as np
import pandas as pd
import pyodbc
from tqdm import tqdm

from db import DB
from utils import edit_distance


"""
File Maker Pro Connection Object

Desc:
This file contains the primary logic for interacting with the file maker pro database
"""


class FMP(DB):
    def __init__(self, dsn=None, username=None, password=None, connect=True):
        DB.__init__(self)
        if dsn is None:
            dsn = input("Enter the FMP DSN: ")
        if username is None:
            username = input("Enter your FMP username: ")
        if password is None:
            password = input("Enter your FMP password: ")

        self.__dsn = dsn
        self.__username = username
        self.__password = password

        self.__connection_string = "DSN={0};UID={1};PWD={2}".format(
            self.__dsn, self.__username, self.__password
        )

        # TODO: consider extracting this list to the DB class
        self._table_names = [
            "globals",
            "clinics",
            "patients",
            "visits",
            "diagnoses",
            "diagnoses_made",
            "meds",
            "meds_dispensed",
            "geonames",
            "settings",
        ]

        self._join_tables = [
            "diagnoses_made",
            "meds_dispensed"
        ]

        self.__python_types_to_sql = {
            "str": "VARCHAR",
            "date": "TIMESTAMP",
            "float64": "FLOAT",
            "NoneType": "VARCHAR",
        }

        self.__pyodbc_connection = None
        self.__cursor = None
        if connect:
            self.__connect()

    # METHODS FROM DB SUPER CLASS
    # ###########################

    def read_table(self, table_name) -> pd.DataFrame:
        query = "select * from {table}".format(table=table_name)
        df = pd.read_sql(query, self.connection)
        return df

    def write_table(self, data, table_name):
        # TODO: implement write_table in FMP class
        print("IMPLEMENT WRITE_TABLE IN FMP")

    # ###########################

    def __connect(self):
        if self.__pyodbc_connection is None:
            self.__pyodbc_connection = pyodbc.connect(self.__connection_string)
            self.__pyodbc_connection

    def execute_command(self, command_string):
        result = None
        try:
            result = pd.read_sql(command_string, self.connection)
        except Exception as e:
            print(f"Failure to execute: ['{command_string}']")
            raise (e)  # TODO: determine if crashing is appropriate
        return result

    @property
    def python_types_to_sql(self):
        return self.__python_types_to_sql

    @property
    def connection(self):
        if self.__pyodbc_connection is None:
            self.__connect()
        return self.__pyodbc_connection

    @property
    def cursor(self):
        if self.__cursor is None:
            self.__cursor = self.connection.cursor()
        return self.__cursor

    # ABSTRACT BASE CLASS MEHTODS
    def parse_database(self) -> dict():
        self._model = dict()

        for table_name in tqdm(self.table_names):
            df = self.read_table(table_name)

            self._model[table_name] = {}
            col_types = [
                df.iloc[0, index].__class__.__name__ for index in range(len(df.columns))
            ]

            smallest_pk_edit_distance = float("inf")
            previous_pk_field = None
            for field_name, field_type in zip(df.columns, col_types):
                self._model[table_name][field_name] = {}
                self._model[table_name][field_name]["type"] = field_type

                # extract primary keys
                if field_name[:3] == "pk_":
                    # possible primary key
                    distance = edit_distance(field_name[3:-3], table_name)
                    if distance < smallest_pk_edit_distance:
                        # closest primary key so far
                        if previous_pk_field is not None:
                            # remove previously assumed pk
                            self._model[table_name][previous_pk_field]["pk"] = False

                        # set current pk
                        self._model[table_name][field_name]["pk"] = True
                        previous_pk_field = field_name
                        smallest_pk_edit_distance = distance
                    else:
                        self._model[table_name][field_name]["pk"] = False
                else:
                    self._model[table_name][field_name]["pk"] = False

                # extract foreign keys
                if field_name[:3] == "fk_":
                    self._model[table_name][field_name]["fk"] = True
                    self._model[table_name][field_name][
                        "fk_table"
                    ] = self.get_tablename_from_fieldname(field_name)
                else:
                    self._model[table_name][field_name]["fk"] = False

        return self._model

    def write_model(self, model_object: dict = None):
        curr_time = datetime.now().strftime(self.datetime_format)
        with open("./models/{time}_model.json".format(time=curr_time), "w") as f:
            if model_object is not None:
                json.dump(model_object, f, indent=4)
            else:
                json.dump(self._model, f, indent=4)
