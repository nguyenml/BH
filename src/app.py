import os

from flask import Flask, render_template, request, redirect, make_response
from flask_sqlalchemy import SQLAlchemy
from flask_login import login_user, login_required

from src import app, login_manager
from models import SuggestedPrompt, find_user
from data import register_author, Author

@app.route('/')
def landing(name=None):
    return render_template('landing.html', name=name)

@app.route('/tavern')
@login_required
def tavern():
    return render_template('tavern.html')

app.route('/dashboard')
def dashboard():
    first = request.cookies.get('first')
    last = request.cookies.get('last')
    return render_template('dashboard.html', firstname=first, lastname=last)

app.route('/reading')
def reading():
    first = request.cookies.get('first')
    last = request.cookies.get('last')
    return render_template('reading.html', firstname=first, lastname=last)

@app.route('/user')
@login_required
def userpage():
    first = request.cookies.get('first')
    last = request.cookies.get('last')
    return render_template('myWork.html', firstname=first, lastname=last)

@app.route('/writing')
@login_required
def writing():
    username = request.cookies.get('username')
    if(username):
        return render_template("writing.html")
    else:
        return render_template("writing.html")

###
# API
###

@app.route('/signup', methods=["POST"])
def signup():
    email = request.form["email"]
    password = request.form["password"]
    firstname = request.form["firstname"]
    lastname = request.form["lastname"]
    valid_signup = register_author(firstname, lastname, email, password)

    if(valid_signup):
        return response
    else:
        return redirect('/')

@app.route('/login', methods=["POST"])
def login():
    email = request.form["email"]
    author = Author.validate_email(email)
    if(author):
        if(author.validate_password(request.form["password"])):
            login_user(author)
            response = make_response(redirect('/reading'))
            response.set_cookie("email", author.email)
            response.set_cookie("first", author.first_name)
            response.set_cookie("last", author.last_name)
            return response
    else:
        return redirect('/')

@app.route('/prompt', defaults={'pid': None}, methods=["GET"])
@app.route('/prompt/<pid>', methods=["GET"])
@login_required
def get_prompt(pid):
    if(pid == None):
        return "Random prompt here"
    prompt = Prompt.query.filter_by(promptid=pid).first()
    if(not prompt):
        return "No prompt :-("
    return str(prompt.prompt)

@app.route('/addprompt/<prompt>', methods=['GET'])
@login_required
def add_prompt(prompt):
    #if(not request.cookies.get('username')):
    #    print("Rejected!")
    #    return "Please login to suggest a prompt."
    db.session.add(SuggestedPrompt(prompt))
    db.session.commit()
    return "Thank you for your submission! It will be put under consideration."

###
# Login Manager
###

@app.after_request
def add_header(response):
    """
    Add headers to both force latest IE rendering engine or Chrome Frame,
    and also to cache the rendered page for 10 minutes.
    """
    response.headers['X-UA-Compatible'] = 'IE=Edge,chrome=1'
    response.headers['Cache-Control'] = 'public, max-age=600'
    return response


###
# Errors
###

@app.errorhandler(404)
def fourohfour(e):
    return render_template("404.html")

@app.errorhandler(500)
def fivehundred(e):
    return render_template("500.html")

@login_manager.unauthorized_handler
def unauthorized():
    return render_template('401.html'), 401

@login_manager.user_loader
def load_user(user_id):
    return Author.query.get(int(user_id))


