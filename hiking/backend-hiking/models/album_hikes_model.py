from sqlalchemy import Column, String, Integer
from sqlalchemy.orm import declarative_base

Base = declarative_base()
metadata = Base.metadata

class Album_Hikes(Base):
        __tablename__ = "album_hikes"
        hike_id = Column(String(255), nullable=False, primary_key=True)
        hike_api_id = Column(Integer)
        album_id = Column(String(255), nullable=False, primary_key=True)

        def __init__(self, hike_id, hike_api_id, album_id):
                self.hike_id = hike_id
                self.hike_api_id = hike_api_id
                self.album_id = album_id