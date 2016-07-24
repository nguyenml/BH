from flask import Flask, render_template, request, redirect
from flask_sqlalchemy import SQLAlchemy

import os

app = Flask(__name__)
app.config.update(DEBUG=True)
app.config['SQLALCHEMY_DATABASE_URI'] = "mysql://root:root@localhost/dev"
db = SQLAlchemy(app)

@app.route('/')
def root():
    username = request.cookies.get('username')
    print(username)
    return render_template("main.html")

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
    #if(not request.cookies.get('username')):
    #    print("Rejected!")
    #    return "Please login to suggest a prompt."
    db.session.add(SuggestedPrompt(prompt))
    db.session.commit()
    return "Thank you for your submission! It will be put under consideration."

@app.route('/signup', methods=['POST'])
def signup_user():
    print(request)

class Author(db.Model):
    __tablename__ = 'author'
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    first_name = db.Column(db.String(length=255))
    last_name = db.Column(db.String(length=255))
    email = db.Column(db.String(length=255))
    password_hash = db.Column(db.String(length=255))
    last_login = db.Column(db.DateTime)
    is_logged_in = db.Column(db.Boolean)

    writings = db.relationship("Writing", backref='author', lazy='dynamic')
    suggested_prompts = db.relationship("SuggestedPrompt", backref='author', lazy='dynamic')

class Writing(db.Model):
    __tablename__ = "writings"
    writing_id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    text = db.Column(db.Text(length=5))
    author_id = db.Column(db.Integer, db.ForeignKey('author.id'))

class Prompt(db.Model):
    __tablename__ = "prompts"
    prompt_id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    prompt = db.Column(db.Text(length=5))

    def __init__(self, prompt):
        self.prompt = prompt

class SuggestedPrompt(db.Model):
    __tablename__ = "suggested_prompts"
    suggestion_prompt_id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    prompt = db.Column(db.Text(length=5))
    author_id = db.Column(db.Integer, db.ForeignKey('author.id'))

    def __init__(self, prompt):
        self.prompt = prompt
try:
    db.create_all()
except:
    print("Database creation failed (probably because already exists)")
