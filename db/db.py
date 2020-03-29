from abc import ABC, abstractmethod


class DB(ABC):
    def __init__(self):
        self._model = None
        self.datetime_format = "%Y%m%d_%H%M"

    @abstractmethod
    def write_model(self):
        pass

    @abstractmethod
    def parse_database(self) -> dict():
        pass

    @abstractmethod
    def init_from_json(self, json_model: dict()):
        pass
