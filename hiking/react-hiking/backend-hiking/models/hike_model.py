from sqlalchemy import Column, String, Integer, DateTime, Float, ForeignKeyConstraint
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func
from sqlalchemy.ext.declarative import declarative_base
from models.album_hikes_model import Album_Hikes

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
        __table_args__ = (ForeignKeyConstraint([name, longitude, latitude],
                                           [Album_Hikes.hike_name, Album_Hikes.hike_longitude, Album_Hikes.hike_latitude]),
                      {})
        album_hikes = relationship('Album_Hikes', back_populates='hike')

        def __init__(self, name, longitude, latitude, parent_id_api=None, place_id_api=None, city=None, 
                     state = None, country=None, description=None):
                self.name = name
                self.longitude = longitude
                self.latitude = latitude
                self.parent_id_api = parent_id_api
                self.place_id_api = place_id_api
                self.city = city
                self.state = state
                self.country = country
                self.description = description