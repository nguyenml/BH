from hashlib import md5
hash = lambda x: md5(x).hexdigest()

from flask import Flask, render_template, request, redirect, make_response
from flask_sqlalchemy import SQLAlchemy

import os

from src import app
from models import SuggestedPrompt, find_user
from data import register_author

@app.route('/prompt')
def prompt():
    return render_template('prompt.html')

@app.route('/')
def hello(name=None):
    return render_template('landing.html', name=name)

@app.route('/tavern')
def tavern():
    return render_template('tavern.html')

@app.route('/reading')
def reading():
    first = request.cookies.get('first')
    last = request.cookies.get('last')
    return render_template('dashboard.html', firstname=first, lastname=last)

@app.route('/prompts')
def prompts():
    first = request.cookies.get('first')
    last = request.cookies.get('last')
    return render_template('storyPage.html', firstname=first, lastname=last)

@app.route('/user')
def user():
    first = request.cookies.get('first')
    last = request.cookies.get('last')
    return render_template('myWork.html', firstname=first, lastname=last)

@app.route('/writing')
def root():
    username = request.cookies.get('username')
    if(username):
        return render_template("main.html")
    else:
        return render_template("main.html")

@app.route('/signup', methods=["POST"])
def signup():
    # TODO: Complete this
    email = request.form["email"]
    password = request.form["password"]
    firstname = request.form["firstname"]
    lastname = request.form["lastname"]
    valid_signup = register_author(firstname, lastname, email, password)

    if(valid_signup):
        response = make_response(redirect('/reading'))
        response.set_cookie("email", email)
        response.set_cookie("first", firstname)
        response.set_cookie("last", lastname)
        return response
    else:
        return redirect('/')

@app.route('/login', methods=["POST"])
def login():
    email = request.form["email"]
    hashed_password = hash(request.form["password"])
    user_exists = find_user(email)
    valid_login = False
    print(user_exists)
    if(user_exists and hashed_password == user_exists.password_hash):
        valid_login = True
    if(valid_login):
        response = make_response(redirect('/reading'))
        response.set_cookie("email", user_exists.email)
        response.set_cookie("first", user_exists.first_name)
        response.set_cookie("last", user_exists.last_name)
        return response
    else:
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

@app.errorhandler(404)
def fourohfour(e):
    return render_template("404.html")

@app.errorhandler(500)
def fivehundred(e):
    return render_template("500.html")
