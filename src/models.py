import datetime

from hashlib import md5
hash = lambda x: md5(x).hexdigest()

from src import db

# Helper functions
def dbcommit(f):
    def inner(*a, **kw):
        f(*a, **kw)
        db.session.commit()
    return inner

def confirm(f):
    def inner(*a, **kw):
        check = raw_input("Are you absolutely sure? Y/N")
        if(check.lower() in ['y', 'yes']):
            f(*a, **kw)
    return inner

# Models
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

    def __init__(self, fn, ln, em, pw):
        self.first_name = fn
        self.last_name = ln
        self.email = em
        self.password_hash = hash(pw)
        self.last_login = datetime.datetime.now()
        self.is_logged_in = True

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

def init_db():
    try:
        db.create_all()
        db.session.commit()
    except:
        print("Database creation failed (probably because already exists)")

@dbcommit
def seed_db():
    print("Beginning data seed...")
    db.session.add(Author("firstname", "lastname", "firstlast@test.com", "12345"))
    db.session.add(Prompt("You're a chicken under the sea. Talk about it."))
    print("Seeding done.")

@confirm
@dbcommit
def reset_authors():
    check = raw_input("Are you absolutely sure? Y/N")
    if(check.lower() == 'y'):
        print(Author.query.delete())

@confirm
@dbcommit
def reset_writings():
    print(Writing.query.delete())

@confirm
@dbcommit
def reset_prompts():
    print(Prompt.query.delete())

@confirm
@dbcommit
def reset_suggested_prompts():
    print(SuggestedPrompt.query.delete())

def find_user(email_address):
    return Author.query.filter_by(email=email_address).first()
