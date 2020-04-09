# Database Management


generate backups:
```bash
docker exec hdhs_database_1 pg_dump -U postgres app_db | gzip > backups/20200408.tar.gz
```

Enter database container
```bash
docker-compose -f dev-docker-compose.yml run database bash                             
```

Enter DB inside container
```bash
psql --host=database --username=postgres --dbname=app_db
```