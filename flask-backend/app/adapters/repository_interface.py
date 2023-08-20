import abc

class RepositoryException(Exception):
    def __init__(self, message = None):
        pass

class AbstractRepository(abc.ABC):
    
    @abc.abstractmethod
    def add_image(self):
        # add an image to repo
        raise NotImplementedError
    
    @abc.abstractmethod
    def get_images(self):
        # get all images 
        raise NotImplementedError
    
    @abc.abstractmethod
    def get_image_by_name(self):
        # get image by name
        raise NotImplementedError