from datetime import date, timedelta
from datetime import datetime as dt

from passlib.hash import sha256_crypt as crypto
from flask_sqlalchemy import SQLAlchemy


db = SQLAlchemy()

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

    def __init__(self, em, pw, pn="Author"):
        self.penname = pn
        self.first = ""
        self.last = ""
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
        # TODO: Swap out for WTForms
        if('@' not in email):   return False
        return False if cls.has_email(email) else True

    @classmethod
    def has_email(cls, email):
        return True if cls.get_by_email(email) else False

    @classmethod
    def get_by_email(cls, email):
        return cls.query.filter_by(email=email).first()

    def validate_password(self, password):
        return crypto.verify(password, self.password_hash)

    @classmethod
    def validate_login(cls, email, password):
        if(not cls.has_email(email)):
            return False
        author = cls.get_by_email(email)
        if(not author.validate_password(password)):
            return False
        return True

    @classmethod
    def add_author(cls, author):
        db.session.add(author)
        db.session.commit()

    @classmethod
    def add_new_author(cls, em, pw, pn):
        new_author = Author(em, pw, pn)
        cls.add_author(new_author)
        return new_author

    @classmethod
    def validate_form(cls, di):
        # TODO: Swap out for WTForms
        if(cls.has_email(di['email'])):
            return False
        return True

    def has_piece_for_pid(self, pid):
        return Piece.query.filter_by(author_id=self.id, id=pid).first()

class Piece(db.Model):
    __tablename__ = "pieces"
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    text = db.Column(db.Text())
    author_id = db.Column(db.Integer, db.ForeignKey('author.id'))
    is_published = db.Column(db.Boolean)
    date_started = db.Column(db.DateTime)
    prompt_id = db.Column(db.Integer, db.ForeignKey('prompts.id'))

    def __init__(self, a_id, text, pid, is_published=False):
        self.date_started = dt.now()
        self.is_published = is_published
        self.author_id = a_id
        self.text = text
        self.prompt_id = pid

    def __repr__(self):
        return "Prompt#:%s\nAuthor#:%s\nText:%s\n" % (self.prompt_id, self.author_id, self.text)

    def update(self, text):
        self.text = text
        db.session.add(self)
        db.session.commit()

    @classmethod
    def add_new_piece(cls, a_id, text, p_id, **kw):
        piece = Piece(a_id, text, p_id, **kw)
        db.session.add(piece)
        db.session.commit()

    @classmethod
    def get_piece(cls, author_id=None, prompt_id=None):
        if(author_id and prompt_id):
            return cls.query.filter_by(author_id=author_id, prompt_id=prompt_id).first()
        elif(prompt_id):
            return cls.query.filter_by(prompt_id=prompt_id).first()
        elif(author_id):
            return cls.query.filter_by(author_id=author_id).first()
        else:
            return []

class Prompt(db.Model):
    __tablename__ = "prompts"
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    prompt = db.Column(db.Text())
    date_created = db.Column(db.DateTime)

    def __init__(self, prompt):
        self.prompt = prompt
        self.date_created = dt.now()

    @classmethod
    def get_dailies(cls):
        today = dt.today()
        week_ago = today - timedelta(days=7)
        return filter(lambda x: week_ago < x.date_created, cls.query.all())[:7]

    @classmethod
    def add_new_prompt(cls, prompt):
        new_prompt = Prompt(prompt)
        db.session.add(new_prompt)
        db.session.commit()

    def __repr__(self):
        return self.prompt

class SuggestedPrompt(db.Model):
    __tablename__ = "suggested_prompts"
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    prompt = db.Column(db.Text())
    author_id = db.Column(db.Integer, db.ForeignKey('author.id'))

    def __init__(self, prompt):
        self.prompt = prompt


class Feedback(db.Model):
    __tablename__ = "feedback"
    id = db.Column(db.Integer, unique=True, autoincrement=True)
    piece_id = db.Column(db.Integer, db.ForeignKey('pieces.id'), primary_key=True)
    author_id = db.Column(db.Integer, db.ForeignKey('author.id'), primary_key=True)
    vote = db.Column(db.Integer)
    comment = db.Column(db.String)

    def __init__(self, piece_id, author_id, vote=0, comment=""):
        self.piece_id = piece_id
        self.author_id = author_id
        self.vote = vote
        self.comment = comment

class Comments(db.Model):
    __tablename__ = "comments"
    id = db.Column(db.Integer, unique=True, autoincrement=True)
    piece_id = db.Column(db.Integer, db.ForeignKey('pieces.id'), primary_key=True)
    author_id = db.Column(db.Integer, db.ForeignKey('author.id'), primary_key=True)
    comment = db.Column(db.String)

    def __init__(self, piece_id, author_id, comment=""):
        self.piece_id = piece_id
        self.author_id = author_id
        self.comment = comment

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

def find_user(email_address):
    return Author.query.filter_by(email=email_address).first()
