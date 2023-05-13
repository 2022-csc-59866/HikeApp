from sqlalchemy import Column, String, Float, ForeignKey
from sqlalchemy.orm import relationship, declarative_base
from models.user_albums_model import User_Albums

Base = declarative_base()
metadata = Base.metadata

class Album_Hikes(Base):
        __tablename__ = "album_hikes"
        hike_id = Column(String(255), nullable=False, primary_key=True)
        hike_api_id = Column(Float)
        album_id = Column(String(255), nullable=False, primary_key=True)

        # user_albums = relationship('User_Albums', back_populates='album_hikes')
        # album_hikes = relationship('Hikes', back_populates='album_hikes')

        def __init__(self, hike_id, hike_api_id, album_id):
                self.hike_id = hike_id
                self.hike_api_id = hike_api_id
                self.album_id = album_id