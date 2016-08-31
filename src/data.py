from models import db, Author

def register_author(firstname, lastname, emai, password):
    print Author.query.filter_by(email=emai).first()
    if(Author.query.filter_by(email=emai).first()):
        return False
    else:
        db.session.add(Author(firstname, lastname, emai, password))
        db.session.commit()
        return True
