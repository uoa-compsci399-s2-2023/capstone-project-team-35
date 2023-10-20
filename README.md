<img src="ocellai_banner.png">

Ocell.ai empowers pest biosecurity personnel by bridging them to the modern tools and insights of AI crafted by multidisciplinary expert entomologists. It is designed to enhance workflow efficiency through its straightforward interface combined with relevant biosecurity information that promote the formation of actionable insights.

## Tech Stack

### Front-end

- **Framework** : React (18.2.0)
- **Libraries**
  - tailwindcss (3.3.3)
  - daisyUI (3.7.3)
  - plotly (2.26.1)
  - axios (1.4.0)
  - electron (27.0.0)
  - express (4.18.2)

### Backend

- **Framework** : flask (Version)
- **Libraries** :
  - tensorflow 

## Installation and Setup

Here are a complete list of commands used within the application:

### 1. Flask Backend

#### `npm run start-backend`

This starts the backend server of the app
Open [http://localhost:5000](http://localhost:5000) to view it in your browser.
You will have to refresh the connection in order to see changes.

#### `./flask-backend/flask/Scripts/activate`

This activates a virtual flask enviorment

#### `npm run build-exe`

This will run the build.py python file and create a python executable that will be used by the application to run the backend.

### 2. React Front-end

#### `npm start`

This starts up the react front end server of the app.
It should open a tab in your browser at [http://localhost:3000](http://localhost:3000)

#### `npm run electron`

This starts up the react app as an electron application and runs the backend executable as a local server.

#### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

#### `npm run package`

Packages the app into the dist/ directory as an installer which allows the user to install the application onto their device.

### Usage

In order to run this application in a development setting you first need to run `npm run build-exe` which will build the python executable and will act has the local server for the flask backend.\
Next you will need to run `npm run build` which will compile the react front end code into a smaller, and easier to run version within the build/ directory.\
Finally if you run `npm run electron` the electron application will launch along with the python executable and you should be able to use Ocellai and all of its features. (Assuming all of the dependencies have been installed)

##### Dependencies:

```
npm install react react-dom
npm install -D tailwindcss
npm i -D daisyui@latest
npm i --save plotly.js-dist-min
npm install axios
```

## Usage Examples

## Project Management Tool

## Future Plans

## Project Management Tool

## Acknowledgements

<img src="team35_logo.png" width=250>

