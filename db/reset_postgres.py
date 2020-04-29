from psql import PSQL

psql = PSQL("postgres+psycopg2://postgres:HaitiCHI@0.0.0.0:5432/app_db")

psql.execute_command("DROP SCHEMA public CASCADE")
psql.execute_command("CREATE SCHEMA public")
psql.execute_command("GRANT ALL ON SCHEMA public TO postgres")
psql.execute_command("GRANT ALL ON SCHEMA public TO public")
