#!/usr/bin/env python
# Author: "hertz"
# Date: 20200310
# ####################
# DESC:
#   A script to execute a SQL script inside of postgres docker container
# ####################


# args:
# 1 -- name of container running postgres to execute the script inside of
# 2 -- path to .SQL script to be execute inside of the postgres container


import argparse
import pickle
import sys

from psql import PSQL
from sqlalchemy import create_engine

engine = create_engine("postgres+psycopg2://postgres:HaitiCHI@0.0.0.0:5432/app_db")


def parse_args():
    parser = argparse.ArgumentParser()
    parser.add_argument("command", help="SQL command to run in container")
    return parser.parse_args()


def main(argv):
    # TODO: extract this from database.env (ideally but it in the PSQL class)
    psql = PSQL("postgres+psycopg2://postgres:HaitiCHI@0.0.0.0:5432/app_db")
    result = psql.execute_command(argv.command)
    print(result)


if __name__ == "__main__":
    sys.exit(main(parse_args()))
