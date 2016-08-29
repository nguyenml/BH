import os

from flask import Flask
from flask_sqlalchemy import SQLAlchemy

app = Flask(__name__)
app.config.update(DEBUG=True)
app.config['SQLALCHEMY_DATABASE_URI'] = os.environ.get('DATABASE_URL', "postgresql://bard:hop@localhost:5001/bardhop-dev")
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['PORT'] = 33507 # TODO: Check if production here

db = SQLAlchemy(app)

