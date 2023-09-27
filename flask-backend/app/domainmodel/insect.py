from pathlib import Path

class Insect:
    def __init__(self, label, country, genus, species, image_file_path, tags) -> None:
        self.__label = label
        self.__country = country
        self.__genus = genus
        self.__species = species
        self.__image_file_path = image_file_path
        self.__tags = tags
    
    @property
    def label(self) -> str:
        return self.__label
    
    @property
    def country(self) -> str:
        return self.__country
    
    @property
    def genus(self) -> str:
        return self.__genus
    
    @property
    def species(self) -> str:
        return self.__species
    
    @property
    def image_file_path(self) -> Path:
        return self.__image_file_path
    
    @property
    def tags(self) -> dict:
        return self.__tags
    
    def __repr__(self) -> str:
        return f"<Insect {self.label}, country = {self.country}, genus  = {self.genus}>, species = {self.species}, image file path = {self.image_file_path}, tags = {self.tags}"

    def __eq__(self, other) -> bool:
        if not isinstance(other, self.__class__):
            return False
        return self.label == other.label
