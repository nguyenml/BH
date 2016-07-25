from app import db

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
