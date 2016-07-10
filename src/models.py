import json

from sqlalchemy import Column, Integer, DateTime, Text, Boolean, String, create_engine
from sqlalchemy.ext.declarative import declarative_base

with open('tmp/config.cfg', 'r') as fh:
    CONFIG = json.loads(fh.read())

engine = create_engine("mysql://%s:%s@%s" % (CONFIG['db_hostname'],
                                            CONFIG['db_username'],
                                            CONFIG['db_password']),
                        echo=True)
Base = declarative_base()
class User(Base):
    __tablename__ = 'users'
    id = Column(Integer, primary_key=True)
    first_name = Column(String)
    last_name = Column(String)
    email = Column(String)
    password_hash = Column(String)
    last_login = Column(DateTime)
    is_logged_in = Column(Boolean)

"""
class WebSession(Base):
    pass
    #__tablename__ = "websessions"

class Documents(Base):
    pass
    __tablename__ = "documents"

class Prompts(Base):
    pass
    __tablename__ = "prompts"
"""
