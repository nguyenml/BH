import os
import json
from subprocess import call

from passlib.hash import sha256_crypt as crypto

from src import db
from src.app import app
from src.helpers import dbcommit, confirm

SQL_DATABASE = "mysql"
SQL_USERNAME = "root"
SQL_PASSWORD = "root"

DEFAULTS = {"db_database": SQL_DATABASE,
            "db_username": SQL_USERNAME,
            "db_password": SQL_PASSWORD}

REQUIRED = ["db_database",
            "db_username",
            "db_password"]

def get_config():
    config = {}
    for elem in REQUIRED:
        env_var = os.getenv(elem)
        if(env_var):
            config[elem] = env_var
        else:
            config[elem] = DEFAULTS[elem]
    return config

def write_config(dict_config):
    with open("tmp/config.cfg", "wr") as fp:
        json.dump(dict_config, fp)

def gen_config():
    write_config(get_config())

def start():
    call(['heroku', 'local'])
    exit()

def safestart(host="0.0.0.0", port=5000):
    app.config['SQL_DATABASE'] = SQL_DATABASE
    app.config['SQL_USERNAME'] = SQL_USERNAME
    app.config['SQL_PASSWORD'] = SQL_PASSWORD
    app.run(host, port)

def init_db():
    from src.models import *
    try:
        db.create_all()
        db.session.commit()
    except Exception as e:
        print("Database creation failed (probably because already exists)")
        print(e)

def reset_db():
    from src.models import *
    if(raw_input("Are you positive? (Y)") == 'Y'):
        try:
            db.reflect()
            db.drop_all()
            db.session.commit()
        except Exception as e:
            print("Database reset failed")
            print(e)
    else:
        print("Reset database aborted")

def run_tests():
    call(["nosetests", "--nocapture", "test"])

@dbcommit
def seed_db():
    from src.models import Author, Prompt

    try:
        print("Beginning data seed...")
        db.session.add(Author("firstname", "lastname", "firstlast@test.com", "12345", "The Test Dummy"))
        db.session.add(Prompt("You're a chicken under the sea. Talk about it."))
        print("Seeding done.")
    except Exception as e:
        print(e)

@confirm
@dbcommit
def reset_authors():
    check = raw_input("Are you absolutely sure? Y/N")
    if(check.lower() == 'y'):
        print(Author.query.delete())
