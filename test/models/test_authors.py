import os
import unittest
from datetime import datetime as dt

from flask import Flask
from passlib.hash import sha256_crypt as crypto

from src.app import app
from src.models import Author, Piece, db
from test import EXISTING_USER
from test.test_models import ModelTestCase

class AuthorTestCase(ModelTestCase):
    
    def setUp(self):
        app.config['TESTING'] = True
        app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite://'
        app.config['SQLALCHEMY_ECHO'] = False
        self.app = app.test_client()
        db.create_all()
        nu = EXISTING_USER
        self.bob = Author(nu['email'], nu['password'], nu['penname'])
        db.session.add(self.bob)
        db.session.commit()
        self.piece = Piece(self.bob.id, 'blah blah blah')
        db.session.add(self.piece)
        db.session.commit()
        self.form = {'password': 'blah',
                'confirmpassword': 'blah',
                'email': 'unique@unique.com'}
 
    def tearDown(self):
        pass

    def test_init(self):
        nu = EXISTING_USER
        assert self.bob.penname == 'The Tester'
        assert self.bob.email == nu['email']

    def test_has_email(self):
        nu = EXISTING_USER
        assert Author.has_email(nu['email']) 

    def test_does_not_have_email(self):
        assert Author.has_email('lollercopter@blah.com') == False

    def test_get_by_email(self):
        assert Author.get_by_email('firstlast@test.com')

    def test_get_by_invalid_email(self):
        assert Author.get_by_email('fake@email.com') == []

    def test_validate_password(self):
        assert self.bob.validate_password('12345') 

    def test_validate_form(self):
        assert Author.validate_form(self.form)
    
    def test_invalidate_form_passwords(self):
        self.form['password'] = 'notblah'
        assert Author.validate_form(self.form) == False
        self.form['password'] = 'blah'

    def test_invalidate_form_used_email(self):
        self.form['email'] = 'firstlast@test.com'
        assert Author.validate_form(self.form) == False

    def test_get_pieces(self):
        assert self.bob.pieces[0] == self.piece
