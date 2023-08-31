import pytest

from app import create_app

@pytest.fixture
def client():
    my_app = create_app({'TESTING': True})
    return my_app.test_client()