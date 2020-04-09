from abc import ABC, abstractmethod

import pandas as pd
from utils import edit_distance


"""
DESC:
    Abstract Base Class (ABC) for a Database Object
    Extracts shared logic from the FMP and PSQL classes
"""


class DB(ABC):
    def __init__(self):
        self._model = None
        self.datetime_format = "%Y%m%d_%H%M"
        self._table_names = []

    # TODO: Delete these methods once we remove our custom model code
    @abstractmethod
    def write_model(self):
        pass

    @abstractmethod
    def parse_database(self) -> dict():
        pass

    # ABSTRACT METHDOS TO BE IMPLEMENTED BY CHILD CLASSES
    # ###################################################

    @abstractmethod
    def read_table(self, table_name) -> pd.DataFrame:
        pass

    @abstractmethod
    def write_table(self, data: pd.DataFrame, table_name):
        pass

    # ###################################################

    @property
    def table_names(self) -> list:
        return self._table_names

    def get_tablename_from_fieldname(self, field_name: str):
        try:
            assert field_name[:3] == "pk_" or field_name[:3] == "fk_"
        except AssertionError as e:
            print(
                "Can only get meaningful table names from field names on primary or foreign keys"
            )
            raise (e)

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
                np.argmin(np.array(list(map(matcher, self.table_names))), axis=0)
            )
        except TypeError as e:
            print("FAILURE: two tables have equally close edit_distance")
            # TODO: potentially add a backup lookup table here
            # for now we will re-raise the error and crash the program
            raise (e)

        return self.table_names[index_of_match]

    # TODO: delete this once we adjust to the new dual connection functionality
    def init_from_json(self, json_model: dict()):
        self._model = json_model
