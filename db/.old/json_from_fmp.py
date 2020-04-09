import argparse
import sys

from fmp import FMP

"""
Generate JSON from file maker pro

DESC: 
This file will take in a data source name (dsn), username, and password, and generate to the 
best of it's abilities a json file that represents the structure of the database
"""


def parse_args():
    parser = argparse.ArgumentParser()
    parser.add_argument("-d", "--dsn", help="dsn name")
    parser.add_argument("-u", "--username", help="username for dsn")
    parser.add_argument("-p", "--password", help="password for dsn")
    return parser.parse_args()


def main(argv):
    fmp = FMP(argv.dsn, argv.username, argv.password)
    model = fmp.parse_database()
    fmp.write_model(model)


if __name__ == "__main__":
    sys.exit(main(parse_args()))
