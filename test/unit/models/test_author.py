from datetime import datetime as dt

from passlib.hash import sha256_crypt as crypto

from src.app import app
from src.models import Author, Piece, db

from test.testcase import BaseTestCase

class AuthorTestCase(BaseTestCase):
    NEW_USER = dict(em="bob@bob.com",
                    pw="pw",
                    pn="penname")
    EX_FORM = dict(email="g@g.com",
                   password="pass",
                   penname="another_penname")

    def test_init(self):
        bob = Author(**AuthorTestCase.NEW_USER)
        self.assertTrue(bob.email == 'bob@bob.com')
        self.assertTrue(bob.penname == 'penname')

    def test_has_email(self):
        bob = Author(**AuthorTestCase.NEW_USER)
        db.session.add(bob)
        self.assertTrue(Author.has_email('bob@bob.com'))

    def test_does_not_have_email(self):
        self.assertFalse(Author.has_email('nonexistent@email.com'))

    def test_get_by_email(self):
        self.assertTrue(Author.get_by_email('a@a.com'))

    def test_get_by_invalid_email(self):
        self.assertFalse(Author.get_by_email('fake@email.com'))

    def test_validate_password(self):
        bob = Author(**AuthorTestCase.NEW_USER)
        self.assertTrue(bob.validate_password('pw'))

    def test_validate_form(self):
        assert Author.validate_form(AuthorTestCase.EX_FORM)

    def test_invalidate_form_used_email(self):
        form = AuthorTestCase.EX_FORM.copy()
        form['email'] = 'a@a.com'
        self.assertFalse(Author.validate_form(form))

