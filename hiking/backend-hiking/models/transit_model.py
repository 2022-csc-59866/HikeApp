from sqlalchemy import Column, String
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy import Enum
from models.transit_type import TransitType

Base = declarative_base()
metadata = Base.metadata

class Transit(Base):
        __tablename__ = "transit"
        user_id = Column(String(255), nullable=False, primary_key=True)
        transit_type = Column(Enum(TransitType), nullable=False, primary_key=True)

        def __init(self, user_id, transit_type):
                self.user_id = user_id
                self.transit_type = transit_type