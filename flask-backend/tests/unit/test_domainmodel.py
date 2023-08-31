import pytest
import os

from app.domainmodel.classifier import Classifier

class TestClassifier:
    def test_construction(self):
        classifier1 = Classifier(1, 'file1', 'classifier1', 'insect1')
        assert str(classifier1) == "<Classifier classifier1, Insect: insect1, Filename: file1, ID: 1>"
        classifier2 = Classifier(2, 'file2', 'classifier2', 'insect2')
        assert str(classifier2) == "<Classifier classifier2, Insect: insect2, Filename: file2, ID: 2>"
        classifier3 = Classifier(3, 'file3', 'classifier3', 'insect3')
        assert str(classifier3) == "<Classifier classifier3, Insect: insect3, Filename: file3, ID: 3>"

        #Test non int ID
        with pytest.raises(ValueError):
            Classifier(None, 'file4', 'classifier4', 'insect4')
        
        with pytest.raises(ValueError):
            Classifier("ID", 'file4', 'classifier4', 'insect4')

        #Test negative ID
        with pytest.raises(ValueError):
            Classifier(-4, 'file4', 'classifier4', 'insect4')

        #Test strings with trailing spaces
        classifier4 = Classifier(4, '    file4   ', '   classifier4   ', '   insect4   ')
        assert classifier4.classifier_file == 'file4'
        assert classifier4.classifier_name == 'classifier4'
        assert classifier4.insect_type == 'insect4'

        #Test invalid strings
        classifier5 = Classifier(5, 10, 20, 1029)
        assert classifier5.classifier_file is None
        assert classifier5.classifier_name is None
        assert classifier5.insect_type is None
    
    def test_setters(self):
        classifier1 = Classifier(1, 'file1', 'classifier1', 'insect1')
        
        #Test classifier file name setter
        classifier1.classifier_file = 'file2'
        assert classifier1.classifier_file == 'file2'

        classifier1.classifier_file = '   file3    '
        assert classifier1.classifier_file == 'file3'

        classifier1.classifier_file = 123
        assert classifier1.classifier_file is None

        #Test classifier name setter
        classifier1.classifier_name = 'classifier2'
        assert classifier1.classifier_name == 'classifier2'

        classifier1.classifier_name = '   classifier3    '
        assert classifier1.classifier_name == 'classifier3'

        classifier1.classifier_name = 123
        assert classifier1.classifier_name is None


        #Test insect type setter
        classifier1.insect_type = 'insect2'
        assert classifier1.insect_type == 'insect2'

        classifier1.insect_type = '   insect3    '
        assert classifier1.insect_type == 'insect3'

        classifier1.insect_type = 123
        assert classifier1.insect_type is None
    
    def test_equality(self):
        classifier1 = Classifier(1, '1', '1', '1')
        classifier2 = Classifier(2, '2', '2', '2')
        classifier3 = Classifier(2, '2', '2', '2')

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
        classifier1 = Classifier(1, '1', '1', '1')
        classifier2 = Classifier(2, '2', '2', '2')
        classifier3 = Classifier(3, '3', '3', '3')

        #Test inequality comparison
        assert classifier1 < classifier2
        assert classifier2 < classifier3
        assert classifier3 > classifier1

        #Test list sorting
        classifiers = [classifier3, classifier2, classifier1]
        assert sorted(classifiers) == [classifier1, classifier2, classifier3]

    def test_set(self):
        classifier1 = Classifier(1, '1', '1', '1')
        classifier2 = Classifier(2, '2', '2', '2')
        classifier3 = Classifier(3, '3', '3', '3')

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
        