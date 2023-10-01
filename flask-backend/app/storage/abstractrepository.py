import abc
from PIL import Image
from pathlib import Path

repo_instance = None

class RepositoryException(Exception):
    def __init__(self, message = None):
        pass

class AbstractRepository(abc.ABC):
    
    @abc.abstractmethod
    def add_results_csv(self):
        raise NotImplementedError

    @abc.abstractmethod
    def add_image(self, image: Image):
        raise NotImplementedError
    
    @abc.abstractmethod
    def get_base64_image(self, path: Path):
        raise NotImplementedError
    
    @abc.abstractmethod
    def get_all_images(self) -> list:
        raise NotImplementedError
    
    @abc.abstractmethod
    def get_image_by_name(self, image_name: str) -> Image:
        raise NotImplementedError
    
    @abc.abstractmethod
    def clear_directory(self, directory_path: Path):
        raise NotImplementedError