import os
import src

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

def start(host="0.0.0.0", port=5000):
    from src.app import app
    app.run(host, port)
