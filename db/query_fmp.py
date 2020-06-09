import argparse
import os
import pickle
import sys
import pyodbc

import pandas as pd
from tqdm import tqdm

from fmp import FMP
from psql import PSQL
from utils import edit_distance
from PIL import Image
import io


def parse_args():
    parser = argparse.ArgumentParser()
    parser.add_argument("-d", "--dsn", help="dsn name")
    parser.add_argument("-u", "--username", help="username for dsn")
    parser.add_argument("-p", "--password", help="password for dsn")
    return parser.parse_args()


def main(argv):
    fmp = FMP(argv.dsn, argv.username, argv.password)
    # query = "SELECT GetAs(face_photo, 'JPEG') FROM patients WHERE pk_patient_id=31883 OR pk_patient_id=1"
    # result = fmp.cursor.execute(query)
    # data = result.fetchall()
    # data = [item[0] for item in data]
    # print(data, len(data))
    # images = [Image.open(io.BytesIO(d)) for d in data]
    # [image.show() for image in images]


    # table_name = "diagnoses_made"
    # print(table_name)
    # res_1 = fmp.read_table(table_name)
    # print(res_1)

    table_name = "globals"
    print(table_name)
    res_2 = fmp.read_table(table_name)
    print(res_2.columns)
    print(res_2)
    # print(res_1 == res_2)

    # table_name = "clinics"
    # print(table_name)
    # res_3 = fmp.read_table(table_name)
    # print(res_3)

    # print(type(fmp.execute_command("SELECT face_photo FROM patients WHERE pk_patient_id=31883")["face_photo"][0]))
    # print(fmp.execute_command("SELECT face_photo FROM patients WHERE pk_patient_id=31883")["face_photo"][0])


if __name__ == "__main__":
    sys.exit(main(parse_args()))
