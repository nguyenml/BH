import os
import json

from src.app import app
from src.models import seed_db, reset_authors, init_db

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

def start(host="0.0.0.0", port=5000):
    app.config['SQL_DATABASE'] = SQL_DATABASE
    app.config['SQL_USERNAME'] = SQL_USERNAME
    app.config['SQL_PASSWORD'] = SQL_PASSWORD
    app.run(host, port)

