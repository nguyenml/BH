from datetime import datetime as dt

from passlib.hash import sha256_crypt as crypto

from src import db, login_manager
from helpers import confirm, dbcommit

# Models
class Author(db.Model):
    __tablename__ = 'author'
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    penname = db.Column(db.String(length=20))
    first = db.Column(db.String(length=255))
    last = db.Column(db.String(length=255))
    email = db.Column(db.String(length=255))
    password_hash = db.Column(db.String(length=255))
    last_login = db.Column(db.DateTime)
    is_logged_in = db.Column(db.Boolean)
    is_verified = db.Column(db.Boolean)
    is_active = db.Column(db.Boolean)

    pieces = db.relationship("Piece", backref='author', lazy='dynamic')
    suggested_prompts = db.relationship("SuggestedPrompt", backref='author', lazy='dynamic')

    def __init__(self, fn, ln, em, pw, pn="Author"):
        self.penname = pn
        self.first = fn
        self.last = ln
        self.email = em
        self.password_hash = crypto.encrypt(pw)
        self.last_login = dt.now()
        self.is_logged_in = True

    def is_authenticated(self):
        return True

    def is_active(self):
        return self.is_active

    def is_anonymous(self):
        return False

    def get_id(self):
        return self.id

    @classmethod
    def validate_email(cls, email):
        return cls.query.filter_by(email=email).first()

    def validate_password(self, password):
        return crypto.verify(password, self.password_hash)

class Piece(db.Model):
    __tablename__ = "pieces"
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    text = db.Column(db.Text())
    author_id = db.Column(db.Integer, db.ForeignKey('author.id'))
    is_published = db.Column(db.Boolean)
    date_started = db.Column(db.DateTime)

    def __init__(self, a_id, text):
        self.date_started = dt.now()
        self.is_published = False
        self.author_id = a_id
        self.text = text

    def __repr__(self):
        return "%s-%s:\n%s\n" % (self.id, self.author_id, self.text)

    @classmethod
    def get_author(cls, self):
        return cls.query.filter_by(id=self.author_id)

class Prompt(db.Model):
    __tablename__ = "prompts"
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    prompt = db.Column(db.Text())

    def __init__(self, prompt):
        self.prompt = prompt


class SuggestedPrompt(db.Model):
    __tablename__ = "suggested_prompts"
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    prompt = db.Column(db.Text())
    author_id = db.Column(db.Integer, db.ForeignKey('author.id'))

    def __init__(self, prompt):
        self.prompt = prompt


class Feedback(db.Model):
    __tablename__ = "feedback"
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    piece_id = db.Column(db.Integer, db.ForeignKey('pieces.id'))


class Groups(db.Model):
    __tablename__ = "groups"
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    date_started = db.Column(db.DateTime)
    group_name = db.Column(db.String)


class Groupings(db.Model):
    __tablename__ = "groupings"
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    group_id = db.Column(db.Integer, db.ForeignKey('groups.id'))
    author_id = db.Column(db.Integer, db.ForeignKey('author.id'))
    role = db.Column(db.Integer) # TODO: Higher is higher authority, etc.


@confirm
@dbcommit
def reset_writings():
    print(Piece.query.delete())

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
