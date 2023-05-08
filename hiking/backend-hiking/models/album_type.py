import enum
import json

class AlbumType(enum.Enum):
    FAVS = "FAVS"
    COMPLETED = "COMPLETED"
    CUSTOM = "CUSTOM"

    def to_dict(self):
        return {'album_type': self.value}

    def to_json(self):
        return json.dumps(self.to_dict())
