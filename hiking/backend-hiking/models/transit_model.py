from sqlalchemy import Column, String, Integer, DateTime, Float
from sqlalchemy.orm import sessionmaker #, relationship, backref
from sqlalchemy.sql import func
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy import Enum
from models.transit_type import TransitType
# from models.__init__ import *

Base = declarative_base()
metadata = Base.metadata

class Transit(Base):
        __tablename__ = "transit"
        user_id = Column(String(255), nullable=False, primary_key=True)
        transit_type = Column(Enum(TransitType), nullable=False, primary_key=True)

        def __init(self, user_id, transit_type):
                self.user_id = user_id
                self.transit_type = transit_type