from pathlib import Path
from app.ml.classifier import Classifier
from app.ml.prediction import Prediction
from typing import Dict

class TestClassifier:
    def test_construction(self):
        #<Classifier {self.__classifier_name}, Name {self.__classifier_name}, File path {self.__classifier_path}, Labels path {self.__labels_path}>
        classifier1 = Classifier(Path('file'), 'classifier1', Path('file'))
        assert str(classifier1) == "<Classifier classifier1, Name classifier1, File path file, Labels path file>"

        #Test strings with trailing spaces
        classifier2 = Classifier(Path('file'), '   classifier2   ', Path('file'))
        assert classifier2.classifier_path == Path('file')
        assert classifier2.classifier_name == 'classifier2'
        assert classifier2.labels_path == Path('file')

        #Test invalid strings
        classifier3 = Classifier(10, 20, 1029)
        assert classifier3.classifier_path is None
        assert classifier3.classifier_name is None
        assert classifier3.labels_path is None
    
    def test_setters(self):
        classifier1 = Classifier(Path('file'), 'classifier1', Path('file'))
        
        #Test classifier path setter
        classifier1.classifier_path = Path('file2')
        assert classifier1.classifier_path == Path('file2')

        classifier1.classifier_path = 123
        assert classifier1.classifier_path is None

        #Test labels path setter
        classifier1.labels_path = Path('file2')
        assert classifier1.labels_path == Path('file2')

        classifier1.labels_path = 123
        assert classifier1.labels_path is None
    
    def test_equality(self):
        classifier1 = Classifier(Path('file'), 'different', Path('file'))
        classifier2 = Classifier(Path('file'), 'same', Path('file'))
        classifier3 = Classifier(Path('file2'), 'same', Path('file2'))

        #Check equality of same classifier
        assert classifier1 == classifier1
        assert classifier2 == classifier2
        assert classifier2 == classifier3

        #Check inequality of different classifiers
        assert classifier1 != classifier2
        assert classifier1 != classifier3

        #Check inequality with different types
        assert classifier1 != '1'
        assert classifier1 is not None

    def test_sorting(self):
        classifier1 = Classifier(Path('file'), '1', Path('file'))
        classifier2 = Classifier(Path('file'), '2', Path('file'))
        classifier3 = Classifier(Path('file'), '3', Path('file'))

        #Test inequality comparison
        assert classifier1 < classifier2
        assert classifier2 < classifier3
        assert classifier3 > classifier1

        #Test list sorting
        classifiers = [classifier3, classifier2, classifier1]
        assert sorted(classifiers) == [classifier1, classifier2, classifier3]

    def test_set(self):
        classifier1 = Classifier(Path('file'), '1', Path('file'))
        classifier2 = Classifier(Path('file'), '2', Path('file'))
        classifier3 = Classifier(Path('file'), '3', Path('file'))

        classifiers = set()

        #Test addition with no duplicates
        classifiers.add(classifier1)
        classifiers.add(classifier1)
        classifiers.add(classifier2)
        classifiers.add(classifier3)
        assert sorted(classifiers) == [classifier1, classifier2, classifier3]

        #Test Removal
        classifiers.discard(classifier1)
        assert sorted(classifiers) == [classifier2, classifier3]

class TestPrediction:
    def test_construction(self):
        #<Prediction: Label-probability {self.label_probability_dict}, Input Image path {self.input_image_path}>
        prediction1 = Prediction({'dict': 0}, Path('file'))
        assert str(prediction1) == f"<Prediction: Label-probability {prediction1.label_probability_dict}, Input Image path file>"

        #Test empty dict returns None
        prediction2 = Prediction(dict(), Path('file'))
        assert prediction2.label_probability_dict is None

        #Test invalid types
        prediction3 = Prediction(20, 1029)
        assert prediction3.label_probability_dict is None
        assert prediction3.input_image_path is None

        prediction4 = Prediction({'dict': 0}, Path(''))
        assert prediction4.input_image_path is None
    
    def test_setters(self):
        prediction1 = Prediction({'dict': 0}, Path('file'))
        
        #Test path setter
        prediction1.input_image_path = Path('file2')
        assert prediction1.input_image_path == Path('file2')

        prediction1.input_image_path = 123
        assert prediction1.input_image_path is None

        prediction1.input_image_path = Path('')
        assert prediction1.input_image_path is None

        #Test label dict setter
        prediction1.label_probability_dict = {'dict2': 1}
        assert prediction1.label_probability_dict == {'dict2': 1}

        prediction1.label_probability_dict = 123
        assert prediction1.label_probability_dict is None
        