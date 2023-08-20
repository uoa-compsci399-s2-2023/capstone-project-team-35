import abc

class RepositoryException(Exception):
    def __init__(self, message = None):
        pass

class AbstractRepository(abc.ABC):
    
    @abc.abstractmethod
    def add_classifier(self):
        # add a classifier to repository
        raise NotImplementedError
    
    @abc.abstractmethod
    def get_classifiers(self) -> list:
        # returns a list of all classifiers
        raise NotImplementedError
    
    @abc.abstractmethod
    def get_classifier_by_id(self):
        # returns classifier specified by id
        raise NotImplementedError
    
    @abc.abstractmethod
    def add_image(self):
        # add an image to repo
        raise NotImplementedError
    
    @abc.abstractmethod
    def get_images(self):
        # get all images 
        raise NotImplementedError