
# This script will go through and validate that all patients listed as pregnent are female

### pseudocode
# for each visit in the visits table
#     if visit indicates pregnancy
#         assert the corresponding patient is female
#

from psql import PSQL
import logging
import sys
from datetime import datetime


logging.basicConfig(filename=f"./validation/{datetime.now().strftime('%Y%m%d_%H%M%S')}_sanity_pregnant_implies_female.log", level=logging.INFO)
logging.info('Starting log to validate pregnant patients are female')



def main():
    psql = PSQL("postgres+psycopg2://postgres:HaitiCHI@0.0.0.0:5432/app_db")
 
    visits = psql.table('visits')
    patients = psql.table('patients')
 
    pregnant_visits_query = psql.db.select([visits]).where(visits.columns.ob_pregnant == 'Y')
 
    with psql.open_connection() as connection:
        pregnant_visits = connection.execute(pregnant_visits_query).fetchall()
    
        for visit in pregnant_visits:
            select_patient_query = psql.db.select([patients.columns.gender]).where(patients.columns.pk_patient_id == visit.fk_patient_id)

            patient_record = connection.execute(select_patient_query).fetchall()

            try:
                assert patient_record[0][0] == 'F' # attempt to assert the patient is female
            except AssertionError as assertion_error:
                logging.info(f"patient ({visit.fk_patient_id}) w/ gender ({patient_record[0][0]}) is listed as pregnant on visit ({visit.pk_visit_id})")
            except IndexError as index_error:
                logging.warning(f"patient ({visit.fk_patient_id}) was not found in the patients table")



if __name__ == "__main__":
    sys.exit(main())


