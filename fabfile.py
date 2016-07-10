import os
import json

from src.app import app

SQL_HOSTNAME = "devdb"
SQL_USERNAME = "root"
SQL_PASSWORD = "root"

DEFAULTS = {"db_hostname": SQL_HOSTNAME,
            "db_username": SQL_USERNAME,
            "db_password": SQL_PASSWORD}

REQUIRED = ["db_hostname",
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
    if(os.path.isfile('tmp/config.cfg')):
        pass
    else:
        cfg = get_config()
        write_config(cfg)
    app.run(host, port)
