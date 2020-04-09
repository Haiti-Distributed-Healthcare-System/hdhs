import argparse
import os
import sys

import pandas as pd
from fmp import FMP
from sqlalchemy import Column, Integer, MetaData, String, Table, create_engine

engine = create_engine("postgres+psycopg2://user:password@0.0.0.0:5432/database")


def parse_args():
    parser = argparse.ArgumentParser()
    parser.add_argument("-d", "--dsn", help="dsn name")
    parser.add_argument("-u", "--username", help="username for dsn")
    parser.add_argument("-p", "--password", help="password for dsn")
    return parser.parse_args()


def main(argv):
    fmp = FMP(argv.dsn, argv.username, argv.password)

    # meta = MetaData()

    # students = Table(
    #     "students",
    #     meta,
    #     Column("id", Integer, primary_key=True),
    #     Column("name", String),
    #     Column("lastname", String),
    # )

    # meta.create_all(engine)
    query = "select * from clinics"
    df = pd.read_sql(query, fmp.connection)
    df.to_sql("clinics", engine)


if __name__ == "__main__":
    sys.exit(main(parse_args()))
