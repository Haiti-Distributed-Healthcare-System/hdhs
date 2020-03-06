import pyodbc


"""
File Maker Pro Connection Object
"""


class FMP(object):
    __connection_string = "DSN=chifmp;UID=hjohnson;PWD=hjohnson"

    def __init__(self):
        self.fmp_table_names = [
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

        self.python_types_to_sql = {
            "str": "VARCHAR",
            "date": "TIMESTAMP",
            "float64": "FLOAT",
            "NoneType": "VARCHAR",
        }

        self.__connection = pyodbc.connect(FMP.__connection_string)

    def fmp_table_names(self):
        return self.fmp_table_names

    @property
    def connection(self):
        return self.__connection


class CHIFMPModel(object):
    def __init__(self):
        self.chifmp_table_names = [
            "patients",
            "visits",
            "clinics",
            "diagnoses",
            "diagnoses_made",
            "meds",
            "meds_dispensed",
            # "globals",
            # "settings",
        ]

    def get_chifmp_table_names(self):
        return self.chifmp_table_names

    def _get_connection_string(self):
        # import netrc

        ## Add secret information in the `~/.netrc file
        # machine chihaiti.fmp
        #    account  chihaiti   #<- the name of the DSN to connetct to
        #    login    fmp_database_name
        #    password fmp_database_password
        # netrcparser = netrc.netrc()
        # mylogin, myaccount, mypassword = netrcparser.authenticators("chihaiti.fmp")
        connection_string = "DSN=chifmp;UID=hjohnson;PWD=hjohnson"
        print("Starting Connection with {0}".format(connection_string))
        # del mylogin, myaccount, mypassword
        return connection_string

    def get_connnection(self):
        import pyodbc

        return pyodbc.connect(self._get_connection_string())


class QueryElements(object):
    """
    Class to hold components used to construct a query

    updates should be done like the following:

    template = "UPDATE patients SET first_name = ? WHERE pk_patient_id = ?"
    values = ('My"Name"', 12342)
    cursor.execute(template, values);

    """

    def __init__(self, query_template, query_values):
        self.query_template = query_template
        self.query_values = query_values

    def get_query_template(self):
        return self.query_template

    def get_query_values(self):
        return self.query_values

    def __str__(self):
        return str(self.query_template) + " " + str(self.query_values)
