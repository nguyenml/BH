import os

from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_login import LoginManager



app = Flask(__name__)
app.config.update(DEBUG=True)
app.config['SQLALCHEMY_DATABASE_URI'] = os.environ.get('DATABASE_URL', "postgresql://bardhop-dev:admin@localhost:5432/bardhop-dev")
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['PORT'] = 33507 # TODO: Check if production here
app.config['SECRET_KEY'] = os.environ.get('SECRET_KEY', 'longviet')
db = SQLAlchemy(app)

login_manager = LoginManager()
login_manager.init_app(app)
