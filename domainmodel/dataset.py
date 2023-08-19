class Dataset:
    def __init__(self, dataset_id, dataset_name):
        if type(dataset_id) is not int or dataset_id < 0:
            raise ValueError("Dataset ID should be a non negative integer")
        self.__dataset_id = dataset_id

        self.__dataset_name = None
        if type(dataset_name) is str and dataset_name.strip() != "":
            self.__dataset_name = dataset_name
    
    @property
    def dataset_id(self):
        return self.__dataset_id
    
    @dataset_id.setter
    def dataset_id(self, new_dataset_id):
        if type(new_dataset_id) is not int or new_dataset_id < 0:
            raise ValueError("Dataset ID should be a non negative integer")
        self.__dataset_id = new_dataset_id
    
    @property
    def dataset_name(self):
        return self.__dataset_name
    
    @dataset_name.setter
    def dataset_name(self, new_dataset_name):
        self.__dataset_name = None
        if type(new_dataset_name) is str and new_dataset_name.strip() != "":
            self.__dataset_name = new_dataset_name
    
    def __repr__(self):
        return f'<Dataset {self.__dataset_name}, ID {self.__dataset_id}>'
    
    def __eq__(self, other):
        if not isinstance(other, self.__class__):
            return False
        return self.dataset_id == other.dataset_id
    
    def __lt__(self, other):
        if not isinstance(other, self.__class__):
            return True
        return self.dataset_id < other.dataset_id
    
    def __hash__(self):
        return hash(self.__dataset_id)
