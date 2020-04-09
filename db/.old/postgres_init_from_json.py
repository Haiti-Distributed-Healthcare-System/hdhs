import argparse
import json
import os
import sys
from datetime import datetime

from fmp import FMP

db_json = dict()
fmp_model = FMP("", "", "", connect=False)


# 1st (sql file)
# 2nd (write to sql connection)
def write_command(string, out_file):
    with open(out_file, "w") as f:
        f.write(string)


def parse_args():
    parser = argparse.ArgumentParser()
    parser.add_argument("-m", "--model", required=True, help="JSON model file to seed")
    # parser.add_argument("-d", "--dsn", help="dsn name")
    # parser.add_argument("-u", "--username", help="username for dsn")
    # parser.add_argument("-p", "--password", help="password for dsn")
    args = parser.parse_args()
    print(args)
    if not os.path.isfile(os.path.abspath(args.model)):
        raise ValueError("File: {0} doesn't exist".format(args.model))
    return args


def main(argv):
    model_file = argv.model
    with open(model_file, "r") as f:
        data_model = json.load(f)

    date_time = "_".join(os.path.split(os.path.abspath(model_file))[-1].split("_")[:2])
    output_file = "./init/{date_time}_init_db.sql".format(date_time=date_time)

    schema = "chi_{date_time}".format(date_time=date_time)
    command = "create schema {schema};\n".format(schema=schema)
    for table_name in data_model.keys():
        command += "create table {schema}.{table_name} (\n".format(
            schema=schema, table_name=table_name
        )

        last_elem = list(data_model[table_name].keys())[-1]
        print(table_name)
        for field_name in data_model[table_name].keys():

            extra_param_string = ""
            print(field_name, data_model[table_name][field_name])
            if data_model[table_name][field_name]["pk"]:
                extra_param_string += "primary key"

            command += "\t{attr_name} {attr_type} {extra_params}".format(
                attr_name=field_name,
                attr_type=fmp_model.python_types_to_sql[
                    data_model[table_name][field_name]["type"]
                ],
                extra_params=extra_param_string,
            )
            if field_name != last_elem:
                command += ",\n"
            else:
                command += "\n"

        command += ");\n\n"

    write_command(command, output_file)


if __name__ == "__main__":
    sys.exit(main(parse_args()))
