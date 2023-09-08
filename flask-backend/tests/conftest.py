import pytest

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