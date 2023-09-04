import abc


class RespositoryException(Exception):
    def __init__(self, message=None):
        pass
    
    
class AbstractInterface(abc.ABC):
    @abc.abstractmethod
    def get_results(self, model_file, labels_path, images_dir, model_name) -> list:
        raise NotImplementedError
    
    @abc.abstractmethod
    def std_image(self, image_dir, out_path):
        raise NotImplementedError
    
    @abc.abstractmethod
    def std_images(self, in_path, out_path):
        raise NotImplementedError

