import unittest

from flask import Flask

from src.app import app
from src.models import db, Author, Piece, Prompt

import unittest

app.config['TESTING'] = True
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite://'
db.init_app(app)

class BaseTestCase(unittest.TestCase):
    USER = dict(em="a@a.com",
                pw="a",
                pn="penname")

    def login(self):
        return self.app.post('/login', data={'email': BaseTestCase.USER['em'],
                                            'password': BaseTestCase.USER['pw'],
                                            },
                                        follow_redirects=True)

    @classmethod
    def setUpClass(cls):
        app.app_context().push()

    def setUp(self):
        self.app = app.test_client()
        db.create_all()
        db.session.add(Author(**BaseTestCase.USER))

    def tearDown(self):
        db.session.rollback()
        db.session.remove()
        db.drop_all()
    
    def getAll(self):
