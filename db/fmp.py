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
    def __init__(self, dsn=None, username=None, password=None):
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
            # "settings",
            # "globals",
        ]

        self.__python_types_to_sql = {
            "str": "VARCHAR",
            "date": "TIMESTAMP",
            "float64": "FLOAT",
            "NoneType": "VARCHAR",
        }

        self.__pyodbc_connection = pyodbc.connect(self.__connection_string)

    @property
    def python_types_to_sql(self):
        return self.__python_types_to_sql

    @property
    def fmp_table_names(self) -> list:
        return self.__fmp_table_names

    @property
    def connection(self):
        return self.__pyodbc_connection

    # ABSTRACT BASE CLASS MEHTODS
    def init_from_json(model_object):
        self._model = model_object

    def parse_database(self) -> dict():
        self._model = dict()

        for tbl in tqdm(self.fmp_table_names):
            query = "select * from {tbl}".format(tbl=tbl)
            df = pd.read_sql(query, self.connection)

            self._model[tbl] = {}
            col_types = [
                df.iloc[1, index].__class__.__name__ for index in range(len(df.columns))
            ]

            for elem in zip(df.columns, col_types):
                self._model[tbl][elem[0]] = {}
                self._model[tbl][elem[0]]["type"] = elem[1]
                # get table
                # convert to singular
                #
                # check_str = f"pk_{}_id"
                # self._model[tbl][elem[0]]["pk"] = "pk" == elem[0][:2]
                # self._model[tbl][elem[0]]["fk"] = "fk" == elem[0][:2]
                # foreign key true --> what it points to

            primary_key_field_name = ""
            for field_name in self._model[tbl].keys():
                self._model[tbl][field_name]["fk"] = "fk" == field_name[:2]

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
                np.argmin(np.array(list(map(matcher, self.__fmp_table_names))), axis=0)
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
