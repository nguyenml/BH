import os

from flask import Flask, render_template, request, redirect, make_response
from flask_sqlalchemy import SQLAlchemy

app = Flask(__name__)
app.config.update(DEBUG=True)
app.config['SQLALCHEMY_DATABASE_URI'] = "mysql://root:pass@localhost/dev"

db = SQLAlchemy(app)

