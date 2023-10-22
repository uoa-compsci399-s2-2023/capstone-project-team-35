<img src="README_assets/ocellai_banner.png">

Ocell.ai empowers pest biosecurity personnel by bridging them to the modern tools and insights of AI crafted by multidisciplinary expert entomologists. It is designed to enhance workflow efficiency through its straightforward interface combined with relevant biosecurity information that promote the formation of actionable insights.

## Downloads

- Windows Application: [https://drive.google.com/uc?export=download&id=1OcUPP_2evQRGtfKl3fLw3xJAsxfj_kFk](https://drive.google.com/uc?export=download&id=1OcUPP_2evQRGtfKl3fLw3xJAsxfj_kFk)
- Mac Application: _insert download link_

## Tech Stack

### Front-end

- **Framework** : React (18.2.0)
- **Languages** : JavaScript, HTML, CSS
- **Libraries**
  - tailwindcss (3.3.3)
  - daisyUI (3.7.3)
  - plotly (2.26.1)
  - axios (1.4.0)
  - electron (27.0.0)
  - express (4.18.2)

### Backend

- **Framework** : Flask (3.0.0)
- **Languages** : Python
- **Libraries** :
  - Please see `mac_requirements.txt` and `windows_requirements.txt` in `/flask-backend`

## Installation and Setup

### Preliminary Steps

In order to run this application you will need to install Node.js. You can download the installer from [https://nodejs.org/en/download/](https://nodejs.org/en/download/).

Select version 18.17.1 LTS (Recommended For Most Users) and follow the installation instructions.

Once done, check the versions of your node and npm by running the following commands in your terminal:

```
node -v
npm -v
```

It should return the following versions:

```
v18.17.1
9.6.7
```

---

### Commands Reference List

### Flask Backend Commands

Below commands should be executed from the project root directory.

##### `npm run start-backend`

This starts the backend server of the app
Open [http://localhost:5000](http://localhost:5000) to view it in your browser.
You will have to refresh the connection in order to see changes.

##### `./flask-backend/flask/Scripts/activate`

This activates a virtual flask enviorment

##### `npm run build-exe`

This will run the `build.py` python file located at `/flask-backend/build_script` which creates an executable file under `/flask-backend/build_script/packaged_backend/ocellai_backend` which starts the backend server when executed.

### React Frontend Commands

Below commands should be executed from the project root directory.

##### `npm start`

This starts up the react front end server of the app.
It should open the application's web interface tab in your browser at [http://localhost:3000](http://localhost:3000).

##### `npm run electron`

This starts up the react app as an electron application and runs the backend executable as a local server.

##### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

##### `npm run package`

Packages the app and puts it into the `/dist` directory as an executable installer which allows the user to install the application onto their device. Please note that the final installer will be specific to operating system (e.g., Windows, MacOS) on which it was generated.

## Setup and Installation

### Setup

In order to run this application in a development setting you first need to run `npm run build-exe` which will build the python executable and will act has the local server for the flask backend.

Next you will need to run `npm run build` which will compile the react front end code into a smaller, and easier to run version within the build/ directory.

Finally if you run `npm run electron` the electron application will launch along with the python executable and you should be able to use Ocellai and all of its features. (Assuming all of the dependencies have been installed)

### In case of an error

If there is an error when identifying images through this application, try this list of things before contacting the developers.

1. Refresh the app using `ctrl+R`
2. Close the application window and reopen it.
3. Check what image type you are uploading. You might be uploading a corrupt/invalid image.

##### Front-end Dependencies for Development Mode

```
npm install react react-dom
npm install electron-builder --save-dev
npm install express --save
npm install -D tailwindcss
npm i -D daisyui@latest
npm i --save plotly.js-dist-min
npm install axios
```

## Executable Package Installation

After you have generated the executable package, you will need to install the application locally through the installer you downloaded from the `/dist` folder.

<img src="README_assets/Usage_steps/Step1.PNG" width=600>

You will be asked to pick a directory to intall the application into. Please select a path that's not within a OneDrive directory.

<img src="README_assets/Usage_steps/step2.PNG" width=600>

Once the installation has finished you can run the application.

<img src="README_assets/Usage_steps/step3.PNG" width=600>

Here is the home page of this app.

<img src="README_assets/Usage_steps/step4.PNG" width=600>

The first thing you will need to do is select an insect type. Each insect type in the dropdown represents a machine learning model in the backend end which is used to process your images. As more models get added more 'insect type' options will appear.

<img src="README_assets/Usage_steps/step5.PNG" width=600>

Now you need to select any images you want to get processed, and find out what type of insect is in each picture. While there is no maximum number of images you can upload at once, we recommend only doing **up to 40 images** at one time as otherwise the loading time for all those image will be quite long. If you accidently select the wrong images or want to add more, there are features to remove a selected image (the red x to the right of the image name) and add more (the 'add images' button).

<img src="README_assets/Usage_steps/step6.PNG" width=600>

Once you have selected your images you are ready to click 'identify' and see your results.

<img src="README_assets/Usage_steps/step7.PNG" width=600>

The machine learning model of your choice is now processing your images.

<img src="README_assets/Usage_steps/step8.PNG" width=600>
Once finished, you will automatically be directed to the results page. And on the left hand side of the screen we can see a list of all the uploaded images which gives you the option to select each image and see the individual prediction scores for each.

As seen in the image below, the top 3 insects with the highest prediction scores are displayed in cards following a podium-like arrangement.

Below that we can see the full list of the top 10 insects with the highest predictions as well the image that was analysed for you reference and verification.

<img src="README_assets/Usage_steps/step9.PNG" width=600>

For some cards, a 'view distribution' button with a blue icon will be available at the footer. You can use this to view where in the world the species has been present. Below this map, there are external links to the gbif.org database for reference images of the species and its other taxonomical information.

<img src="README_assets/Usage_steps/step10.PNG" width=600>

You also have the ability to download a csv file of all the predictions for each of the selected images.

<img src="README_assets/Usage_steps/step11.PNG" width=600>

As well as the option the download a csv file with all the predications for a specific image.

<img src="README_assets/Usage_steps/step12.PNG" width=600>

Once you are content with your results you can click the home button and navigate to the home page once again to upload more images if you desire.

<img src="README_assets/Usage_steps/step13.PNG" width=600>

## Adding New Models

Currently, this has to be done manually through creating new directories in the repository, in the future it would be possible to create a way to do it automatically but as specified by the clients it wasn't something they wanted in the UI.

To add a new model, follow along with the following instructions:

1. First off you'll need to make a new folder within the following directory /flask-backend/app/data/ml/models/. this folder should be named something in relation to the model, for example, Trupanea's model directory is the following: /flask-backend/app/data/ml/models/trupanea/
2. After making the new folder, you need to create 2 more folders in the new directory, one needs to be named **labels**, and the other needs to be named the **model version (such as "inceptionv3" for Trupanea**.
3. With those 2 new folders, in **/flask-backend/app/data/ml/models/<model_name>/labels** add the labels.csv, if you need to see what it looks like, take a look at /flask-backend/app/data/ml/models/trupanea/labels/labels.csv.
4. In **/flask-backend/app/data/ml/models/<model_name>/<model_version>** add the .h5 Machine Learning model file, which needs to be called model.h5.

After following those steps above, the program should automatically recognise the new model file, allowing you to select the model on the home page of the application.

## Future Plans

### Maintenance

Currently, updating the application proves to be tedious as it requires the user to uninstall the application and reinstall it with the updated version. This is due to the file size limit imposed by GitHub, which leads to the machine learning models being stored locally. One option to circumvent this issue is to use the Git Large File Storage Extension as a way of accommodating the machine learning models in the repository. Since electron allows for the deployed application to be connected to a GitHub repository, any changes made in the repository itself should automatically be reflected in the application without needing to reinstall it.

### Packaging and Distribuition

If resources permit, this project could easily be repackaged and deployed as a Web Application in order to make maintenance more convenient, and to allow for the application to be used on a wider range of devices. This would also allow for the application to be used on mobile devices, which would be beneficial for field work.

### User Experience

Geared towards aiding biosecurity personnel, we believe the following features could enhance user experience and promote the reliability of the application:

- **Image Cropping** - The ability to crop images to focus on the insect of interest.
- **Image Rotation** - The ability to rotate images to the correct orientation.
- **Extended Species Information** - The addition of extensive yet necessary details about the morphological features of the insect of interest throughout the stages of its lifecycle. This would allow the user to make more informed decisions, as it would acquaint them with pest insects whose adult appearance are not as distinct as others.
- **Addition of Crucial Biosecurity Information** - Information such as the host of the pest insect along with its natural enemies would present a more holistic approach to pest management.

## Project Management Tool

Below is a screenshot of Team 35's Gantt Chart for this project.

<img src="README_assets/ocellai_gantt-chart.png" width=600>

## Acknowledgements

Darren Ward and Aaron Harmer, for providing the machine learning model and pest insect data used in this project.

---

Brought to you by Team 35

<img src="README_assets/team35_logo.png" width=250>

- Dan Khomenko - Team Leader/Backend Developer
- Fiona Bautista - Frontend Developer/ UI/UX Designer
- Tom Clunie - Backend Developer/Unit Testing
- Aaron Heald - Backend Developer
- Finn Massey - Lead Frontend Developer
- Alex Wardega - Backend Developer
