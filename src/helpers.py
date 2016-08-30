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

