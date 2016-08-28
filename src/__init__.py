import os

from flask import Flask
from flask_sqlalchemy import SQLAlchemy

app = Flask(__name__)
app.config.update(DEBUG=True)
app.config['SQLALCHEMY_DATABASE_URI'] = os.environ['DATABASE_URL'] or "mysql://root:root@mysql/dev"
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['PORT'] = 33507 # TODO: Check if production here

db = SQLAlchemy(app)

