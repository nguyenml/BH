from sqlalchemy.ext.declarative import declarative_base
Base = declarative_base()

from sqlalchemy import Column, Integer, DateTime, Text, Boolean


class User(Base):
    __tablename__ = 'users'
    id = Column(Integer, primary_key=True)
    first_name = Column(String)
    last_name = Column(String)
    email = Column(String)
    password_hash = Column(String)
    last_login = Column(Date)
    is_logged_in = Column(Boolean)

class WebSession(Base):
    __tablename__ = "sessions"

class Documents(Base):
    __tablename__ = "documents"

class Prompts(Base):
    __tablename__ = "prompts"


