import os
import json
from subprocess import call

from passlib.hash import sha256_crypt as crypto

from src import db
from src.app import app
from src.models import db, Author, Prompt, Piece

SQL_DATABASE = "mysql"
SQL_USERNAME = "root"
SQL_PASSWORD = "root"

DEFAULTS = {"db_database": SQL_DATABASE,
        "db_username": SQL_USERNAME,
        "db_password": SQL_PASSWORD}

REQUIRED = ["db_database",
        "db_username",
        "db_password"]

SEED_PROMPTS = ["Eye Contact: Write about two people seeing each other for the first time.",
        "You are a childs imaginary friend. You are fading away as the child grows older. You have one last talk with the child the day before their 18th birthday.",
        "Arianna, a thing of cruelty and knowledge.",
        "In the early fall, that starship navigator was growing up.",
        "It will be the season of wisdom, the season of perversion.",
        "That lady, that person of complete justice.",
        "Then came the rogue AIs, but the truth isn't quite what some think.",
        "Oh cruelty . . . time to break.",
        "Break education as long as you are crying.",
        "This is a story that concerns education, getting old, and a drought - and it's a story worth repeating."]
SEED_PIECES = ["ip","sum","es","pot","leo","osc","ter","byt","mot","ret"]

def start():
    call(['heroku', 'local'])
    exit()

def safestart(host="0.0.0.0", port=5000):
    app.config['SQL_DATABASE'] = SQL_DATABASE
    app.config['SQL_USERNAME'] = SQL_USERNAME
    app.config['SQL_PASSWORD'] = SQL_PASSWORD
    app.run(host, port, threaded=True)

def init_db():
    try:
        db.create_all()
        db.session.commit()
    except Exception as e:
        print("Database creation failed (probably because already exists)")
        print(e)

def reset_db():
    if(raw_input("Are you positive? (Y)") == 'Y'):
        try:
            db.reflect()
            db.drop_all()
            db.session.commit()
        except Exception as e:
            print("Database reset failed")
            print(e)
    else:
        print("Reset database aborted")

def run_tests():
    call(["nosetests", "--nocapture", "test/"])

def seed_db():
    add_prompt = lambda x: db.session.add(Prompt(x))
    add_piece = lambda x: db.session.add(Piece(1,x[1],x[0]+1))
    try:
        print("Beginning data seed...")
        db.session.add(Author("test@test.com", "1234", "Tester"))
        db.session.add(Author("a@a.com", "a", "A"))
        map(add_prompt, SEED_PROMPTS)
        for i in range(1, len(SEED_PROMPTS)):
            Piece.add_new_piece(1, "This is Tester's writing for prompt %s" % i, i, is_published=True)
            Piece.add_new_piece(2, "This is A's writing for prompt %s" % i, i, is_published=True)
        db.session.commit()
        map(add_piece, enumerate(SEED_PIECES))
        print("Seeding done.")
    except Exception as e:
        print(e)

def reset_authors():
    print(Author.query.delete())
    db.session.commit()

def new_db():
    try:
        db.reflect()
        db.drop_all()
        db.create_all()
        db.session.commit()
        seed_db()
    except Exception as e:
        print(e)
