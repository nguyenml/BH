import os
import unittest

from flask import Flask

from src.app import app
from src.models import db

import unittest 

class ModelTestCase(unittest.TestCase):
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

    def tearDown(self):
        db.session.remove()
        db.drop_all()

