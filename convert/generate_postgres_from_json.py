import argparse
import json
import os
import sys
from datetime import datetime

from fmp import FMP

db_json = dict()
fmp_model = FMP()
CURR_DAY = datetime.now().strftime("%Y%m%d_%H%M")


# 1st (sql file)
# 2nd (write to sql connection)
def write_command(string):
    with open("./init/{curr_day}_init_db.sql".format(curr_day=CURR_DAY), "w") as f:
        f.write(string)


def parse_args():
    parser = argparse.ArgumentParser()
    parser.add_argument("-m", "--model", required=True, help="JSON model file to seed")
    args = parser.parse_args()
    print(args)
    if not os.path.isfile(os.path.abspath(args.model)):
        raise ValueError("File: {0} doesn't exist".format(args.model))
    return args


def main(argv):
    model_file = argv.model
    with open(model_file, "r") as f:
        data_model = json.load(f)

    schema = "chi_{day}".format(day=CURR_DAY)
    command = "create schema {schema};\n".format(schema=schema)
    for table_name, attribute_dict in data_model.items():
        command += "create table {schema}.{table_name} (\n".format(
            schema=schema, table_name=table_name
        )
        features = list(attribute_dict.keys())
        last_elem = features[-1]
        for feature in features:

            extra_param_string = ""

            if attribute_dict[feature]["pk"]:
                extra_param_string += "primary key"

            # elif attribute_dict[feature]["fk"]:
            #     extra_param_string += "foreign key"

            command += "\t{attr_name} {attr_type} {extra_params}".format(
                attr_name=feature,
                attr_type=fmp_model.python_types_to_sql[
                    attribute_dict[feature]["type"]
                ],
                extra_params=extra_param_string,
            )
            if feature != last_elem:
                command += ",\n"
            else:
                command += "\n"

        command += ");\n\n"

    write_command(command)


if __name__ == "__main__":
    sys.exit(main(parse_args()))
