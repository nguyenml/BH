from flask import Flask, render_template, request, redirect
from flask_sqlalchemy import SQLAlchemy

import os

app = Flask(__name__)
app.config.update(DEBUG=True)
app.config['SQLALCHEMY_DATABASE_URI'] = "mysql://root:root@localhost/mysql"
db = SQLAlchemy(app)

@app.route('/')
def hello_world():
    return render_template("main.html")
    return render_template("landing.html")

@app.route('/login', methods=["POST"])
def login():
    return redirect('/')

@app.route('/prompt', defaults={'pid': None}, methods=["GET"])
@app.route('/prompt/<pid>', methods=["GET"])
def get_prompt(pid):
    if(pid == None):
        return "Random prompt here"
    prompt = Prompt.query.filter_by(promptid=pid).first()
    if(not prompt):
        return "No prompt :-("
    return str(prompt.prompt)

@app.route('/addprompt/<prompt>', methods=['GET'])
def add_prompt(prompt):
    db.session.add(Prompt(prompt))
    db.session.commit()
    return "Thank you for your submission! It will be put under consideration."

@app.route('/signup', methods=['POST'])
def signup_user():
    pass

class User(db.Model):
    __tablename__ = 'users'
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    first_name = db.Column(db.String(length=255))
    last_name = db.Column(db.String(length=255))
    email = db.Column(db.String(length=255))
    password_hash = db.Column(db.String(length=255))
    last_login = db.Column(db.DateTime)
    is_logged_in = db.Column(db.Boolean)

class Prompt(db.Model):
    __tablename__ = "prompts"
    promptid = db.Column(db.Integer, primary_key=True, autoincrement=True)
    prompt = db.Column(db.Text(length=5))

    def __init__(self, prompt):
        self.prompt = prompt

db.create_all()
