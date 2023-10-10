from PIL import Image
from utils import get_project_root
from pathlib import PurePath
import app.globals as globals
import os
import base64

TEST_IMAGE_DIR = get_project_root() / "tests" / "test_images"

def test_add_image(local_repo):
    with Image.open(TEST_IMAGE_DIR / "sample_image.jpg") as img:
        local_repo.add_image(img)
        added_image = local_repo.get_image_by_name("sample_image.jpg")
        assert added_image is not None
        img.close()

def test_adding_same_image_adds_it_once(local_repo):
    with Image.open(TEST_IMAGE_DIR / "sample_image2.jpg") as img:
        local_repo.add_image(img)
        local_repo.add_image(img)
        added_images = os.listdir(globals.USER_UPLOADED_IMAGES_DIRECTORY)
        assert added_images.count("sample_image2.jpg") == 1
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

def test_get_base64_image(local_repo):
    #Get existing image
    img = local_repo.get_base64_image(TEST_IMAGE_DIR / "sample_image.jpg")
    assert img is not None
    
    #Check image is encoded in base64
    with open(str(TEST_IMAGE_DIR / "sample_image.jpg"), "rb") as test_img_file:
        test_img_data = test_img_file.read()
        test_img = base64.b64encode(test_img_data).decode('utf-8')
        assert test_img == img

    #Non existent image returns None
    img = local_repo.get_base64_image("This_image_will_never_exist.jpg")
    assert img is None
