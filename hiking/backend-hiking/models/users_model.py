from sqlalchemy import Column, String, DateTime, ForeignKey, BigInteger
from sqlalchemy.sql import func
from sqlalchemy.orm import relationship
from sqlalchemy.ext.declarative import declarative_base

from flask_login import UserMixin
from passlib.hash import pbkdf2_sha256

from models.transit_model import Transit

Base = declarative_base()
metadata = Base.metadata

class User(UserMixin, Base):
        """
                Define a model/resource representing a User.
        """
        __tablename__ = "users"
        id = Column(BigInteger, 
                         ForeignKey(Transit.user_id),
                         nullable=False, primary_key=True,
                         autoincrement=True)
        first_name = Column(String(255), nullable=False)
        middle_name = Column(String(255))
        last_name = Column(String(255), nullable=False)

        email = Column(String(255), nullable=False, unique=True)
        password = Column(String(255), nullable=False)

        city = Column(String(255))
        state = Column(String(2))
        country = Column(String(255))
        cookie = Column(String(255))
        avatar_url = Column(String(255))
        create_date = Column(DateTime(timezone=True), server_default=func.now())
        update_date = Column(DateTime(timezone=True),
                            server_default=func.now(),
                            onupdate=func.now())
        
        # transit = relationship('Transit', back_populates='users', foreign_keys=user_id)

        def __init__(self, first_name, middle_name, last_name, 
                     email, password, cookie, avatar_url,
                     city=None, state=None, country=None):
                self.first_name = first_name
                self.middle_name = middle_name
                self.last_name = last_name
                self.email = email
                print(dir(self))
                self.password  = pbkdf2_sha256.hash(password)
                self.city = city
                self.state = state
                self.country = country
                self.cookie = cookie
                self.avatar_url = avatar_url