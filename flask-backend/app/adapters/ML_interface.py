import abc


class RespositoryException(Exception):
    
    @abc.abstractmethod
    def get_results(self, model_file, labels_path, images_dir, model_name):
        raise NotImplementedError
    
    @abc.abstractmethod
    def std_image(self, image_dir, out_path):
        raise NotImplementedError
    
    @abc.abstractmethod
    def std_images(self, in_path, out_path):
        raise NotImplementedError
    
    