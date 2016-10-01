import os
import random

from flask import Flask, render_template, request, redirect, flash, url_for, jsonify
from flask_sqlalchemy import SQLAlchemy
from flask_login import login_user, login_required, current_user

from src import app, login_manager
from models import Author, SuggestedPrompt, Prompt, Piece

@app.route('/')
def landing():
    return render_template('landing.html')

@app.route('/dashboard')
@login_required
def dashboard():
    return render_template('dashboard.html')

@app.route('/writing')
@app.route('/writing/<pid>')
@login_required
def writing(pid=None):
    if not pid:
        return render_template("writing.html")
    else:
        if(current_user.has_piece_for_pid(pid)):
            return render_template("writing.html")
            #TODO: Somehow pass in pid/authorid for ajax save
        else:
            new_piece = Piece(current_user.id, "", pid)
            return render_template("writing.html")

@app.route('/tavern')
@login_required
def tavern():
    return render_template('tavern.html')

@app.route('/reading')
@login_required
def reading():
    return render_template('reading.html')

@app.route('/user')
@login_required
def userpage():
    return render_template('myWork.html')

###
# API
###

@app.route("/save", methods=["POST"])
@login_required
def save():
    try:
        p_id = request.form['prompt_id']
        text = request.form['text']
        piece = Piece.get_piece(author_id=current_user.id, prompt_id=p_id)
        if(piece):
            piece.update(text)
            return "SUCCESS"
        else:
            Piece.add_new_piece(current_user.id, text, p_id)
            return "SUCCESS"
    except Exception as e:
        print(e)
        return "FAILURE"

@app.route("/loadrandom", methods=["POST"])
@login_required
def load_random():
    p_id = request.form['prompt_id']
    pieces = Piece.query.filter_by(prompt_id=p_id).all()
    pieces = filter(lambda x: x.is_published, pieces)
    pieces = filter(lambda x: x.author_id != current_user.id)
    piece = random.choice(pieces)

    if(piece):
        return piece.text
    else:
        return ""

@app.route("/load", methods=["POST"])
@login_required
def load():
    p_id = request.form['prompt_id']
    piece = Piece.get_piece(author_id=current_user.id, prompt_id=p_id)
    if(piece):
        return piece.text
    else:
        return ""

@app.route("/publish", methods=["POST"])
@login_required
def publish():
    p_id = request.form['prompt_id']
    print(p_id)
    piece = Piece.get_piece(author_id=current_user.id, prompt_id=p_id)
    print(piece)
    if(piece and piece.text):
        piece.is_published = True
        return "SUCCESS"
    else:
        print("publish failed")
        return "Publish Unsuccessful"



@app.route('/getprompts', methods=["POST"])
def getprompts():
    return jsonify(map(lambda x: dict(text= x.prompt, pid = x.id),Prompt.get_dailies()))

@app.route('/signup', methods=["POST"])
def signup():
    email = request.form["email"]
    password = request.form["password"]
    confirm = request.form["confirmpassword"]
    penname = request.form["penname"]

    is_valid = Author.validate_form(request.form)
    if(is_valid):
        author = Author.add_new_author(email, password, penname)
        login_user(author)
        return redirect('/dashboard')
    else:
        flash("Signup failed")
        return redirect('/')

@app.route('/login', methods=["POST"])
def login():
    email = request.form["email"]
    password = request.form["password"]
    if(Author.validate_login(email, password)):
        login_user(author)
        return redirect(url_for("dashboard"))
    else:
        flash('Login failed')
        return redirect(url_for('landing'))

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
