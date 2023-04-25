from sqlalchemy import Column, String, ForeignKey
from sqlalchemy.orm import relationship
from sqlalchemy.ext.declarative import declarative_base
from models.album_type import AlbumType
from models.users_model import User
from sqlalchemy import Enum

Base = declarative_base()
metadata = Base.metadata

class User_Albums(Base):
        __tablename__ = "user_albums"
        user_id = Column(String(255), ForeignKey(User.user_id), nullable=False, primary_key=True)
        album_id = Column(String(255),nullable=False, primary_key=True)
        album_name = Column(String(255), nullable=False)
        album_type = Column(Enum(AlbumType), nullable=False)
        album_hikes = relationship('Album_Hikes', back_populates='user_albums')

        def __init__(self, user_id, album_id, album_name="Favorites", album_type=AlbumType.FAVS):
                self.user_id = user_id
                self.album_id = album_id
                self.album_name = album_name
                self.album_type = album_type
