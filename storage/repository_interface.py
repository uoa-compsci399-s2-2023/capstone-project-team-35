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
    def add_dataset(self):
        # add a dataset to repository
        raise NotImplementedError

    @abc.abstractmethod
    def get_datasets(self) -> list:
        # returns a list of all datasets
        raise NotImplementedError
    
    @abc.abstractmethod
    def get_dataset_by_id(self):
        # returns dataset specified by id
        raise NotImplementedError