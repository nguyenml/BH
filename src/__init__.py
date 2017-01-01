import os

import redis
from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_login import LoginManager

from src.models import db

app = Flask(__name__)
app.config.update(DEBUG=True)
app.config['SQLALCHEMY_DATABASE_URI'] = os.environ.get('DATABASE_URL', "postgresql://bardhop-dev:admin@localhost:5432/bardhop-dev")
app.config['REDIS_URL'] = os.environ.get("REDIS_URL", "redis://127.0.0.1:6379/0")
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['PORT'] = 33507 # TODO: Check if production here
app.config['SECRET_KEY'] = os.environ.get('SECRET_KEY', 'longviet')

db.init_app(app)
app.app_context().push()

login_manager = LoginManager()
login_manager.init_app(app)

r = redis.from_url(app.config['REDIS_URL'])
