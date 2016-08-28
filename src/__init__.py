import os

from flask import Flask
from flask_sqlalchemy import SQLAlchemy

app = Flask(__name__)
app.config.update(DEBUG=True)
app.config['SQLALCHEMY_DATABASE_URI'] = "mysql://root:pass@localhost/dev"
app.config['PORT'] = 33507

db = SQLAlchemy(app)

