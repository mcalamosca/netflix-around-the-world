## Netflix Around The World
This application is built from scratch using only Angular Material components for the layout, Highcharts for the visualizations, and Ag-Grid for the data grid. There are 2 modes accessible from the sidebar menu, TV Shows and Movies. If you select a country or a rating from the charts, it will filter the data grid below according to your selection. If I had more time I would've tied together the charts to make them reflect each other's selections as well. The app is responsive and will follow the Material grid layout according to screen size.

I was able to get this deployed as a GCP project here: https://netflix-around-the-globe.uk.r.appspot.com/

One caveat, and I discovered this late in getting it deployed on GCP...App Engine isn't necessarily the best platform for SPAs. If you try to hit the direct URL https://netflix-around-the-globe.uk.r.appspot.com/static/dashboard/tvshows it will throw a 404 because it's redirecting to main.py according to the rules in app.yaml. The redirect logic wasn't clear and involved a lot of regex which I didn't have time to hash out. As long as you hit the base url https://netflix-around-the-globe.uk.r.appspot.com/ it will load index.html and Angular properly for testing. Something I would do differently next time around is use Firebase as it's the recommended platform for SPAs.

It was interesting working with Geolocation data and the Highmaps library, I needed to map real country names from the Netflix data set to 2 digit codes (ISO 3166-1 alpha-2) to work with the library's map. Interestingly enough Netflix has such a variety of media on their site that it paints almost the entire global map, and you might miss the gaps at first. It's always satisfying getting that first render after the data is plugged in and going from a blank canvas to a fully detailed map after hitting save.

## Development server

Run `py flaskapi/main.py` for the Flask Python API. The build files from the /frontend Angular project are hosted via Flask and served up at the following address.

Navigate to http://127.0.0.1:8080/.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. To update the Flask build you need to move all files to flaskapi/static except for index.html which will need move to flaskapi/templates.

## Lint

Run `ng lint` to lint the project.


## Original Requirements:
Data 
1.	Pick a Data Source of your choice 
2.	Optional: Netflix shows: https://www.kaggle.com/shivamb/netflix-shows/data
Objectives 
1.	Create a responsive dashboard accessible from both a desktop/mobile device that displays the data. Examples: 
1.	Table of data with search, filter, sorting, and pagination 
2.	Graphs to help guide the user to a conclusion about the data 
2.	Use Angular for the front-end 
3.	Use Flask/FastAPI Python for any back-end code if necessary 
4.	Push data into a database of your choice 
5.	Unit Testing, Linting implemented 
6.	Check in the code to your personal GitHub account. 
Extra Points 
1.	Push data into a database of your choice 
2.	Continuous Integration/Continuous Deployment features set up (CI/CD) 
3.	 E.g. CircleCI, Travis, GCP Cloud Build, Github Actions, etc. 
1.	Authentication implemented so that only authenticated users are capable of accessing the dashboard. 
2.	Deploy the application in Google Cloud (Use free tier with new account setup) 
Preferably you can use managed services (App Engine, Cloud Run, CloudSQL, etc.) 


This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 14.2.2.
