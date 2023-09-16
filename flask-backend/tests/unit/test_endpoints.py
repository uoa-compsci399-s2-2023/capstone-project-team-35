from utils import get_project_root
from PIL import Image
import os

TEST_IMAGES_DIRECTORY = get_project_root() / "tests" / "test_images" 

def test_upload_and_get_predictions(client, local_repo):

    #Test single image provided returns classification and code 200
    test_img_path = TEST_IMAGES_DIRECTORY / "sample_image.jpg"
    response = client.post('/classify/trupanea', data={'image': (open(test_img_path, 'rb'), test_img_path)})
    assert response.status_code == 200
    assert len(response.data) > 0
    assert response.data.count(b'probability') == 3 #Three predictions for one image
    

    #Test multiple images provided returns 200
    test_img_path = TEST_IMAGES_DIRECTORY
    images = []
    for image in os.listdir(test_img_path):
        images.append((open(test_img_path / image, 'rb'), test_img_path / image))
    
    data = {'image': images[0], 'image2': images[1]}
    response = client.post('/classify/trupanea', data=data)
    assert response.status_code == 200
    assert len(response.data) > 0
    assert response.data.count(b'probability') == 6 #Three predictions per image

    #Test no image returns 400
    response = client.post('/classify/trupanea')
    assert response.status_code == 400
    assert b'No image provided' in response.data