# Database Management

How to load a backup into your postgres docker container

First, decrypt the pg_dump files.
```
git secret reveal
```
Second, restore the pg_dump into the container.
```bash
gunzip -c ./backups/version.sql.gz | docker exec -i hdhs_database_1 psql -U postgres -d app_db 
```

## Running Notes

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