from utils import get_project_root
from PIL import Image

TEST_IMAGES_DIRECTORY = get_project_root() / "tests" / "test_images" 

def test_upload_and_get_predictions(client, local_repo):

    #Test image provided returns classification and code 200
    #--Not Implemented--

    #Test no image returns 400
    response = client.post('/classify')
    assert response.status_code == 400
    assert b'No image provided' in response.data