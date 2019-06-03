import os

secret = os.getenv('SECRET', '[8(@vGU)F3_dabAH')
db_uri = os.getenv('DATABASE_URL', 'postgres://localhost:5432/upcycle-db')
