import json
from datetime import datetime

import pandas as pd
import numpy as np
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

        self.__fmp_table_names = [
            "clinics",
            "patients",
            "visits",
            "diagnoses",
            "diagnoses_made",
            "meds",
            "meds_dispensed",
            "geonames",
            "settings"
            # "settings",
            # "globals",
        ]

        self.__python_types_to_sql = {
            "str": "VARCHAR",
            "date": "TIMESTAMP",
            "float64": "FLOAT",
            "NoneType": "VARCHAR",
        }

        self.__pyodbc_connection = None
        if connect:
            self.__connect()

    def __connect(self):
        if self.__pyodbc_connection is None:
            self.__pyodbc_connection = pyodbc.connect(self.__connection_string)

    @property
    def python_types_to_sql(self):
        return self.__python_types_to_sql

    @property
    def fmp_table_names(self) -> list:
        return self.__fmp_table_names

    @property
    def connection(self):
        if self.__pyodbc_connection is None:
            self.__connect()
        return self.__pyodbc_connection

    # ABSTRACT BASE CLASS MEHTODS
    def parse_database(self) -> dict():
        self._model = dict()

        for tbl in tqdm(self.fmp_table_names):
            query = "select * from {tbl}".format(tbl=tbl)
            df = pd.read_sql(query, self.connection)

            self._model[tbl] = {}
            col_types = [
                df.iloc[0, index].__class__.__name__ for index in range(len(df.columns))
            ]

            smallest_pk_edit_distance = 123456789
            previous_pk_field = None
            for field_name, field_type in zip(df.columns, col_types):
                self._model[tbl][field_name] = {}
                self._model[tbl][field_name]["type"] = field_type

                # extract primary keys
                if field_name[:3] == "pk_":
                    # possible primary key
                    distance = edit_distance(field_name[3:-3], tbl)
                    if distance < smallest_pk_edit_distance:
                        # closest primary key so far
                        if previous_pk_field is not None:
                            # remove previously assumed pk
                            self._model[tbl][previous_pk_field]["pk"] = False

                        # set current pk
                        self._model[tbl][field_name]["pk"] = True
                        previous_pk_field = field_name
                        smallest_pk_edit_distance = distance
                    else:
                        self._model[tbl][field_name]["pk"] = False
                else:
                    self._model[tbl][field_name]["pk"] = False

                # extract foreign keys
                if field_name[:3] == "fk_":
                    self._model[tbl][field_name]["fk"] = True
                    self._model[tbl][field_name][
                        "fk_table"
                    ] = self.get_tablename_from_fieldname(field_name)
                else:
                    self._model[tbl][field_name]["fk"] = False

        return self._model

    def get_tablename_from_fieldname(self, field_name: str):
        # remove "pk_" or "fk_" --> we only enter this function if this has already matched
        extracted_field_to_match = field_name[3:]
        # not all fields that start with "pk_" or "fk_" end in "_id"
        if field_name[-3:] == "_id":
            extracted_field_to_match = extracted_field_to_match[:-3]
        else:
            print(f"consider fixing fieldname: {field_name}")

        # function that returns the edit distance of the table to the extracted field name
        matcher = lambda table_name: edit_distance(table_name, extracted_field_to_match)

        try:
            # map lambda over list of table `names & extract min edit distance
            index_of_match = int(
                np.argmin(np.array(list(map(matcher, self.fmp_table_names))), axis=0)
            )
        except TypeError as e:
            print("FAILURE: to tables have equally close edit_distance")
            # TODO: potentially add a backup lookup table here
            # for now we will re-raise the error and crash the program
            raise (e)

        return self.__fmp_table_names[index_of_match]

    def write_model(self, model_object: dict = None):
        curr_time = datetime.now().strftime(self.datetime_format)
        with open("./models/{time}_model.json".format(time=curr_time), "w") as f:
            if model_object is not None:
                json.dump(model_object, f, indent=4)
            else:
                json.dump(self._model, f, indent=4)
