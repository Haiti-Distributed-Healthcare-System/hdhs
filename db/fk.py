query = "SELECT tc.table_schema, tc.constraint_name, tc.table_name, kcu.column_name, ccu.table_schema AS foreign_table_schema, ccu.table_name AS foreign_table_name, ccu.column_name AS foreign_column_name FROM information_schema.table_constraints AS tc JOIN information_schema.key_column_usage AS kcu ON tc.constraint_name = kcu.constraint_name AND tc.table_schema = kcu.table_schema JOIN information_schema.constraint_column_usage AS ccu ON ccu.constraint_name = tc.constraint_name AND ccu.table_schema = tc.table_schema WHERE tc.constraint_type = 'FOREIGN KEY' AND tc.table_name='patients'"
query = "SELECT * FROM INFORMATION_SCHEMA.REFERENTIAL_CONSTRAINTS WHERE CONSTRAINT_NAME='XYZ'"
query = "SELECT owner, table_name FROM all_tables"
query = "SELECT * FROM FileMaker_Fields"
# query = "EXEC sp_fkeys FileMaker_Fields"
# query = "SELECT * FROM FileMaker_Tables"

from fmp import FMP
import pandas as pd

fmp_model = FMP("chifmp", "hjohnson", "hjohnson")

df = pd.read_sql(query, fmp_model.connection)
print(df)
df.to_csv("fields.csv")
