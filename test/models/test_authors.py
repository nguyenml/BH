import os
import unittest
from datetime import datetime as dt

from flask import Flask
from passlib.hash import sha256_crypt as crypto

from src.app import app
from src.models import Author, Piece, db
from test.test_models import ModelTestCase

class AuthorTestCase(ModelTestCase):
    EXISTING_USER = {"email": "firstlast@test.com",
            "firstname": "firstname",
            "lastname": "lastname",
            "password": "12345",
            "confirmpassword": "12345"}

    NEW_USER = {"email": "newguy@new.com",
            "firstname": "new",
            "lastname": "guy",
            "password": "54321",
            "confirmpassword": "54321"}

    def setUp(self):
        app.config['TESTING'] = True
        app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite://' 
        self.app = app.test_client()
        db.create_all()
        nu = AuthorTestCase.EXISTING_USER
        self.bob = Author(nu['firstname'], nu['lastname'],
                nu['email'], nu['password'])
        db.session.add(self.bob)
        db.session.commit()
        self.piece = Piece(self.bob.id, 'blah blah blah')
        db.session.add(self.piece)
        db.session.commit()

    def tearDown(self):
        pass

    def test_init(self):
        nu = AuthorTestCase.EXISTING_USER
        assert self.bob.first == nu['firstname']
        assert self.bob.last == nu['lastname']
        assert self.bob.penname == 'Author'
        assert self.bob.email == nu['email']

    def test_validate_email(self):
        nu = AuthorTestCase.EXISTING_USER
        assert Author.validate_email(nu['email']) 

    def test_validate_password(self):
        assert self.bob.validate_password('12345') 

    def test_get_pieces(self):
        assert self.bob.pieces[0] == self.piece
