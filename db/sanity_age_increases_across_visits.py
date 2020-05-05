
# This script will go through and validate that patient ages increase across visits (where visits are ordered chronologically)

### pseudocode
# get unique patient_ids
# for each unique patient_id
#     get all visits from patient (ordered by visit date)
#     get all visits from patient (ordered by visit age, then by date within the same age)
#     assert that these visit orderings are equal
#

from psql import PSQL
import logging
import sys
import pandas as pd
from datetime import datetime


logging.basicConfig(filename=f"./validation/{datetime.now().strftime('%Y%m%d_%H%M%S')}_sanity_age_increases_across_visits.log", level=logging.INFO)
logging.info('Starting log to validate that age increases across chronological visits')


def main():
    psql = PSQL("postgres+psycopg2://postgres:HaitiCHI@0.0.0.0:5432/app_db")
 
    visits = psql.table('visits')

    ids_dates_ages_query = psql.db.select([visits.columns.pk_visit_id, visits.columns.fk_patient_id, visits.columns.visit_date, visits.columns.visit_age])

    with psql.open_connection() as connection:
        ids_dates_ages = connection.execute(ids_dates_ages_query).fetchall()
        
        df = pd.DataFrame(ids_dates_ages, columns=['pk_visit_id', 'fk_patient_id', 'visit_date', 'visit_age'])
        df['visit_date'] = pd.to_datetime(df['visit_date'])
        patient_ids = df['fk_patient_id'].unique()

        for patient_id in patient_ids:
            visit_dates_and_ages = df.loc[df['fk_patient_id'] == patient_id]

            # Check for and log null age entries
            check_null_ages = visit_dates_and_ages.query('visit_age != visit_age')
            if len(check_null_ages.index) > 0:
                logging.info(f"patient ({patient_id}) does not have a visit age on visit(s) ({check_null_ages['pk_visit_id'].values.tolist()})")

            # Check for and log null date entries
            check_null_dates = visit_dates_and_ages.query('visit_date != visit_date')
            if len(check_null_dates.index) > 0:
                logging.info(f"patient ({patient_id}) does not have a visit date on visit(s) ({check_null_dates['pk_visit_id'].values.tolist()})")

            visit_dates_and_ages = visit_dates_and_ages.dropna()
            visits_by_age = visit_dates_and_ages.sort_values(by=['visit_age', 'visit_date'])
            visits_by_date = visit_dates_and_ages.sort_values(by=['visit_date'])

            try:
                pd.testing.assert_frame_equal(visits_by_age, visits_by_date)
            except AssertionError:
                logging.info(f"patient ({patient_id}) has their age go down across visits ({visits_by_date['pk_visit_id'].values.tolist()})")



if __name__ == "__main__":
    sys.exit(main())


