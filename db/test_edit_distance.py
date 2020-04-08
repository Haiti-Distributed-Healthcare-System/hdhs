from fmp import FMP
import pandas as pd

fmp_model = FMP("20200303_chihaiti", "hjohnson", "hjohnson")

pk_visit_id = "pk_visit_id"
fk_clinic_id = "fk_clinic_id"

print(fmp_model.get_tablename_from_fieldname(pk_visit_id))  # expect this to be "visits"
print(
    fmp_model.get_tablename_from_fieldname(fk_clinic_id)
)  # expect this to be "clinics"
