import abc    
    
class AbstractModel(abc.ABC):
    @abc.abstractmethod
    def predict(self, model_file, labels_path, images_dir, model_name) -> list:
        raise NotImplementedError
