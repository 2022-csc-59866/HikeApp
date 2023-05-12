from sqlalchemy import Column, String, Integer, DateTime, Float
from sqlalchemy.sql import func
from sqlalchemy.ext.declarative import declarative_base
import uuid

Base = declarative_base()
metadata = Base.metadata

class Hike(Base):
        __tablename__ = "hikes"
        id = Column(Integer, nullable=False, primary_key=True)
        api_id = Column(Float)
        name = Column(String(255), nullable=False)
        length = Column(String(100))
        longitude = Column(Float, nullable=False)
        latitude = Column(Float, nullable=False)
        city = Column(String(255))
        state = Column(String(10))
        country = Column(String(100))
        description = Column(String(255))
        thumbnail = Column(String(255))
        create_date = Column(DateTime(timezone=True), server_default=func.now())
        update_date = Column(DateTime(timezone=True),
                            server_default=func.now(),
                            onupdate=func.now())

        def __init__(self, api_id, name, length, longitude, latitude, city, 
                     state, country, description, thumbnail, id):
                self.api_id = api_id
                self.name = name
                self.length = length
                self.longitude = longitude
                self.latitude = latitude
                self.city = city
                self.state = state
                self.country = country
                self.description = description
                self.thumbnail = thumbnail
                self.id = id
