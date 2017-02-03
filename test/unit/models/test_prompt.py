from datetime import datetime as dt

from passlib.hash import sha256_crypt as crypto

from src.app import app
from src.models import Author, Piece, db, Prompt

from test.testcase import BaseTestCase

class PromptTestCase(BaseTestCase):

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
