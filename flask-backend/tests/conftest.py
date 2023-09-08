import pytest
import os
import app.globals as globals
from app import create_app
from app.storage.local.local_repository import LocalRepository


@pytest.fixture
def local_repo():
    repo = LocalRepository()
    return repo

@pytest.fixture
def client():
    my_app = create_app({'TESTING': True})
    return my_app.test_client()

@pytest.fixture(scope='session', autouse=True)
def end_of_tests():
    yield
    os.remove(globals.USER_UPLOADED_IMAGES_DIRECTORY / "sample_image.jpg")
