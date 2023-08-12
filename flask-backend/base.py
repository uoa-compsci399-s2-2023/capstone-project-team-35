from flask import Flask, request
images = []

api = Flask(__name__)
response_body = "This is information recieved from the backend"

@api.route('/profile')
def my_profile():
    return response_body

@api.route('/image', methods=["POST"])
def add_image():
    image = request.json['image']
    images.add(image)
    return image
