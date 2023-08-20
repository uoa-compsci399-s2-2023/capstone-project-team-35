class Classifier:
    def __init__(self, classifier_id, classifier_name, insect_type):
        if type(classifier_id) is not int or classifier_id < 0:
            raise ValueError("Classifier ID should be a non negative integer")
        self.__classifier_id = classifier_id
        
        self.__classifier_name = None
        self.__insect_type = None

        if type(classifier_name) is str and classifier_name.strip() != "":
            self.__classifier_name = classifier_name                        #Name of the classifier

        if type(insect_type) is str and insect_type.strip() != "":
            self.__insect_type = insect_type                                #Name to display frontend
    
    @property
    def classifier_id(self):
        return self.__classifier_id
    
    @classifier_id.setter
    def classifier_id(self, new_classifier_id):
        if type(new_classifier_id) is not int or new_classifier_id < 0:
            raise ValueError("Classifier ID should be a non negative integer")
        self.__classifier_id = new_classifier_id

    @property
    def classifier_name(self):
        return self.__classifier_name
    
    @classifier_name.setter
    def classifier_name(self, new_classifier_name):
        self.__classifier_name = None

        if type(new_classifier_name) is str and new_classifier_name.strip() != "":
            self.__classifier_name = new_classifier_name

    @property
    def insect_type(self):
        return self.__insect_type

    @insect_type.setter
    def insect_type(self, new_insect_type):
        self.insect_type = None
        if type(new_insect_type) is str and new_insect_type.strip() != "":
            self.__insect_type = new_insect_type
    
    def __repr__(self):
        return f'<Classifier {self.__classifier_name}, Insect {self.__insect_type}, ID {self.__classifier_id}>'
    
    def __eq__(self, other):
        if not isinstance(other, self.__class__):
            return False
        return self.classifier_id == other.classifier_id
    
    def __lt__(self, other):
        if not isinstance(other, self.__class__):
            return True
        return self.classifier_id == other.classifier_id
    
    def __hash__(self):
        return hash(self.__classifier_id)