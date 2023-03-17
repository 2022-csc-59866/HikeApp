from sqlalchemy import Column, String, Float, ForeignKey
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import relationship
from models.user_albums_model import User_Albums

Base = declarative_base()
metadata = Base.metadata

class Album_Hikes(Base):
        __tablename__ = "album_hikes"
        # hike_id = Column(String(255), nullable=False, primary_key=True)
        # all needed to identify a hike
        hike_name = Column(String(255), nullable=False, primary_key=True)
        hike_longitude = Column(Float, nullable=False, primary_key=True)
        hike_latitude = Column(Float, nullable=False, primary_key=True)
        album_id = Column(String(255),ForeignKey(User_Albums.album_id), nullable=False, primary_key=True)
        user_albums = relationship('User_Albums', back_populates='album_hikes')

        def __init__(self, hike_name, hike_longitude, hike_latitude, album_id):
                self.hike_name = hike_name
                self.hike_latitude = hike_latitude
                self.hike_longitude = hike_longitude
                self.album_id = album_id