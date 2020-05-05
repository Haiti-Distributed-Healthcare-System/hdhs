import pandas as pd
import sqlalchemy as database

from db import DB


class PSQL(DB):
    def __init__(self, db_uri):
        self.__engine = database.create_engine(db_uri)
        self.__table_cache = {}
        self.__metadata = database.MetaData()

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

    @property
    def db(self,):
        return database

    def table(self, table_name):
        if table_name not in self.__table_cache.keys():
            self.__table_cache[table_name] = self.db.Table(table_name, self.__metadata, autoload=True, autoload_with=self.__engine) 
        
        return self.__table_cache[table_name]

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
