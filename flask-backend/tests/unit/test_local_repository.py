from PIL import Image
from utils import get_project_root
from pathlib import PurePath
import app.globals as globals
import os

TEST_IMAGE_DIR = get_project_root() / "tests" / "test_images"

def test_add_image(local_repo):
    with Image.open(TEST_IMAGE_DIR / "sample_image.jpg") as img:
        local_repo.add_image(img)
        added_image = local_repo.get_image_by_name("sample_image.jpg")
        assert added_image is not None
    img.close()
    

def test_get_image_by_name(local_repo):
    #Get existing image
    img = local_repo.get_image_by_name("sample_image.jpg")
    assert img is not None

    #Non existent image returns None
    img = local_repo.get_image_by_name("This_image_will_never_exist.jpg")
    assert img is None

def test_get_all_images(local_repo):
    images = local_repo.get_all_images()
    filenames = [PurePath(x.filename).name for x in images]
    assert "sample_image.jpg" in filenames

