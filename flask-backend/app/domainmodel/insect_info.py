class insect_info:
    def __init__(self, label, country, genus, species, image_file) -> None:
        self.__label = label
        self.__country = country
        self.__genus = genus
        self.__species = species
        self.__image_file = image_file
    
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
    def image_file(self) -> str:
        return self.__image_file
    
    def __repr__(self) -> str:
        return f"<Insect {self.label}, country = {self.country}>"

    def __eq__(self, other) -> bool:
        if not isinstance(other, self.__class__):
            return False
        return self.label == other.label