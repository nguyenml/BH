import os
import unittest
from datetime import datetime as dt

from flask import Flask
from passlib.hash import sha256_crypt as crypto

from src.app import app
from src.models import Author, Piece, db, Prompt
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
        db.drop_all()
        db.session.commit()

    def test_initialize(self):
        new_prompt = Prompt("Hello, this is a test prompt")
        assert new_prompt.prompt == "Hello, this is a test prompt"
        assert new_prompt.date_created

    def test_add_new_prompt(self):
        Prompt.add_new_prompt("I'm a new prompt")
        assert Prompt.query.filter_by(prompt="I'm a new prompt")

    def test_get_dailies(self):
        prompts = [str(x) for x in range(7)]
        prompts = map(lambda x: Prompt.add_new_prompt(x), prompts)
        assert len(Prompt.get_dailies()) == 7
