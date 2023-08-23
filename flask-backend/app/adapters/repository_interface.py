import abc
from PIL import Image

class RepositoryException(Exception):
    def __init__(self, message = None):
        pass

class AbstractRepository(abc.ABC):
    
    @abc.abstractmethod
    def add_image(self, image: Image):
        # add an image to repo
        raise NotImplementedError
    
    @abc.abstractmethod
    def get_images(self) -> list:
        # get all images 
        raise NotImplementedError
    
    @abc.abstractmethod
    def get_image_by_name(self, image_name: str) -> Image:
        # get image by name
        raise NotImplementedError