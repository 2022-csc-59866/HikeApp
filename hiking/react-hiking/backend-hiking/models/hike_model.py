from sqlalchemy import Column, String, Integer, DateTime, Float
from sqlalchemy.orm import sessionmaker #, relationship, backref
from sqlalchemy.sql import func
from sqlalchemy.ext.declarative import declarative_base

Base = declarative_base()
metadata = Base.metadata

class Hike(Base):
        __tablename__ = "hikes"
        name = Column(String(255), nullable=False, primary_key=True)
        longitude = Column(Float, nullable=False, primary_key=True)
        latitude = Column(Float, nullable=False, primary_key=True)
        parent_id_api = Column(Integer)
        place_id_api = Column(Integer)
        city = Column(String(255))
        state = Column(String(2))
        country = Column(String(100))
        description = Column(String(100))
        create_date = Column(DateTime(timezone=True), server_default=func.now())
        update_date = Column(DateTime(timezone=True),
                            server_default=func.now(),
                            onupdate=func.now())