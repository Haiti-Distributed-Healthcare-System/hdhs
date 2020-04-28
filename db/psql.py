import pandas as pd
from sqlalchemy import create_engine

from db import DB


class PSQL(DB):
    def __init__(self, db_uri):
        self.__engine = create_engine(db_uri)

    # METHODS FROM DB SUPER CLASS
    # ###########################

    def read_table(self, table_name) -> pd.DataFrame:
        # TODO: implement read_table functionality in PSQL
        print("NEED TO IMPLEMENT THIS")

    def write_table(
        self, data_frame: pd.DataFrame, table_name: str, if_exists: str = "fail"
    ):
        data_frame.to_sql(
            con=self.__engine, name=table_name, if_exists=if_exists, index=False
        )

    # ###########################

    def open_connection(self):
        return self.__engine.connect()

    def execute_command(self, command_string):
        print(f"PSQL EXECUTING: [{command_string}]")
        result = None
        try:
            with self.open_connection() as connection:
                result = connection.execute(command_string)
        except Exception as e:
            print(f"Failure to execute: ['{command_string}']")
            raise (e)  # TODO: determine if crashing is appropriate

        return result
