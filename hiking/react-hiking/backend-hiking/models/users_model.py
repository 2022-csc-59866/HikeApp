from sqlalchemy import Column, String, DateTime, ForeignKey
from sqlalchemy.sql import func
from sqlalchemy.orm import relationship
from sqlalchemy.ext.declarative import declarative_base
from models.transit_model import Transit

Base = declarative_base()
metadata = Base.metadata

class User(Base):
        __tablename__ = "users"
        user_id = Column(String(255), 
                         ForeignKey(Transit.user_id),
                         nullable=False, primary_key=True)
        first_name = Column(String(255), nullable=False)
        last_name = Column(String(255), nullable=False)
        username = Column(String(255), nullable=False)
        city = Column(String(255))
        state = Column(String(2))
        country = Column(String(255))
        create_date = Column(DateTime(timezone=True), server_default=func.now())
        update_date = Column(DateTime(timezone=True),
                            server_default=func.now(),
                            onupdate=func.now())
        transit = relationship('Transit', back_populates='users', foreign_keys=user_id)

        def __init__(self, user_id, first_name, last_name, username, city=None, state=None, country=None):
                self.user_id = user_id
                self.first_name = first_name
                self.last_name = last_name
                self.username = username
                self.city = city
                self.state = state
                self.country = country