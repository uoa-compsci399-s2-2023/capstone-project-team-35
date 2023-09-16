from utils import get_project_root
from PIL import Image

TEST_IMAGES_DIRECTORY = get_project_root() / "tests" / "test_images" 

def test_upload_and_get_predictions(client, local_repo):

    #Test single image provided returns classification and code 200
    test_img_path = TEST_IMAGES_DIRECTORY / "sample_image.jpg"
    response = client.post('/classify/trupanea', data={'image': (open(test_img_path, 'rb'), test_img_path)})
    assert response.status_code == 200



    #Test no image returns 400
    response = client.post('/classify/trupanea')
    assert response.status_code == 400
    assert b'No image provided' in response.data