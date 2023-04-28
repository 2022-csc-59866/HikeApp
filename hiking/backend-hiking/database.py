import psycopg2
from decouple import config
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker 

USERNAME_PSQL = config('USERNAME_PSQL', default='')
PASSWORD_PSQL = config('PASSWORD_PSQL', default='')
DB_NAME_PSQL = config('DB_NAME_PSQL', default='')
DB_PORT_PSQL = config('DB_PORT_PSQL', default='')
DB_HOST_PSQL = config('DB_HOST_PSQL', default='')

engine = create_engine('postgresql+psycopg2://{}:{}@{}/{}'.format(USERNAME_PSQL, PASSWORD_PSQL, 
                                                                    DB_HOST_PSQL, DB_NAME_PSQL))
    
#start a session, to connect to Postgres db
Session = sessionmaker(bind=engine)
session = Session()