<img src="README_assets/ocellai_banner.png">

Ocell.ai empowers pest biosecurity personnel by bridging them to the modern tools and insights of AI crafted by multidisciplinary expert entomologists. It is designed to enhance workflow efficiency through its straightforward interface combined with relevant biosecurity information that promote the formation of actionable insights.

## Tech Stack

### Front-end

- **Framework** : React
- **Libraries**
  - tailwindcss
  - daisyUI
  - plotly

### Backend

- **Framework** : flask
- **Libraries** :
  - tensorflow

## Installation and Setup

### 1. Flask Backend

#### `npm run start-backend`

This starts the backend server of the app
Open [http://localhost:5000](http://localhost:5000) to view it in your browser.
You will have to refresh the connection in order to see changes.

#### `./flask-backend/flask/Scripts/activate`

This activates a virtual flask enviorment

### 2. React Front-end

##### Dependencies:

```
npm install react react-dom
npm install -D tailwindcss
npm i -D daisyui@latest
npm i --save plotly.js-dist-min
```

##### `npm start`

This starts the react app in dev mode
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.
The page will reload when you make changes.
You may also see any lint errors in the console.

#### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

#### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

## Usage Examples

Firstly you need to install the application through the installer you downloaded.

<img src="README_assets/Usage_steps/Step1.PNG" width=600>

You will be asked to pick a directory to intall the application into.

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

Here are the resulting predications for you selected images. As you can see, the podium show shows the top 3 most likly insects (with the highest probability) with the green column being the highest, the yellow column being the second highest and the red column being the third highest. Below that we can see the full list of the top 10 insects with the highest predictions as well as the selected image. On the left hand side of the screen we can see a list of all the uploaded images which gives you the option to select each image and see the individual prediction scores for each.

<img src="README_assets/Usage_steps/step9.PNG" width=600>

If you click the 'view distribution' button under each of the top 3 insects for each image, you can see where abouts in the world this insect mostly lives, as well as links to various pictures of the insects and more information.

<img src="README_assets/Usage_steps/step10.PNG" width=600>

You also have the ability to download a csv file of all the predictions for each of the selected images.

<img src="README_assets/Usage_steps/step11.PNG" width=600>

As well as the option the download a csv file with all the predications for a specific image.

<img src="README_assets/Usage_steps/step12.PNG" width=600>

Once you are content with your results you can click the home button and navigate to the home page once again to upload more images if you desire.

<img src="README_assets/Usage_steps/step13.PNG" width=600>

## Future Plans

<img src="README_assets/team35_logo.png" width=250>

### Project Management Tool

### Acknowledgements
