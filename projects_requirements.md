Project Instructions
To complete this project, follow the instructions below. If you get stuck, ask a question on Slack or in the Treehouse Community.

 8 steps
Initialize Your Project
Our first step is to setup a new Node project and add our dependencies:

Open the command line, navigate to your project directory, and run the command npm init to set up your package.json file.
Install the required dependencies through the command line. Your project will need Express and Pug.
Create a .gitignore file in your directory and save a reference to the node_modules folder so that your repo doesn't store or track that folder.
Add Your Images and Templates
We're going to prepare our application's visual content by creating an ﻿images folder for personal and project images, as well as incorporating the provided Pug templates.

Create an images folder in your directory to store your images.
Add a profile picture of yourself that you would feel comfortable sharing with potential employers. It should present well at 550px by 350px.
Take screenshots of your projects. You will need at least two screenshots for each project.
A main shot for the landing page which should be a square image that can display well at 550px by 550px.
Between one and three additional images that can be any dimensions you want, but work well in this project as landscape images that present well at 1200px by 550px.
Finally add the provided views folder with our Pug templates to the root of your project.
Note: You can use an online tool like PicResize to crop, edit and resize your photos.

Add Your Project Data
We're going to create and populate a ﻿data.json file at our project's root. This file will store key information about each project in our portfolio, forming the data backbone for our application.

Create a data.json file at the root of your directory
The recommended structure for your JSON is to create an object literal that contains a single property called projects. The value of projects is an array containing an object for each project you wish to include in your portfolio.
Each project object should contain the following properties:
id - give each project a unique id, which can just be a single digit number starting at 0 for the first project, 1 for the second project, etc.
project_name
description
technologies - an array of strings containing a list of the technologies used in the project
live_link - link to the live version of the project, which can be hosted for free on GitHub Pages.
github_link - link to the GitHub repo
image_urls - an array of strings containing file paths from the views folder to the images themselves. You'll need a main image to be shown on the landing page, and one to three images to be shown on the project page.
Note: Feel free to add extra projects to this portfolio if you have them to show off.

Setup Your Server, Routes and Middleware
Time to set up our Express.js server with necessary routes and middleware. This essential step enables efficient management of user requests and a dynamic UI.

Create an app.js file at the root of your directory.
Add variables to require the necessary dependencies. You'll need to require:
Express
Your data.json file
Optionally - the path module which can be used when setting the absolute path in the express.static function.
Set up your middleware:
set your “view engine” to “pug”
use a static route and the express.static method to serve the static files located in the public folder
Set your routes. You'll need:
An "index" route (/) to render the "Home" page with the locals set to data.projects
An "about" route (/about) to render the "About" page
Dynamic "project" routes (/project/:id or /projects/:id) based on the id of the project that render a customized version of the Pug project template to show off each project. Which means adding data, or "locals", as an object that contains data to be passed to the Pug template.
Finally, start your server. Your app should listen on port 3000, and log a string to the console that says which port the app is listening to.
Handle Errors
Next up is setting up the error handling within our Express application to ensure a smooth user experience despite any possible roadblocks.

If a user navigates to a non-existent or undefined route, such as /noroute or /project/noroute, or if a request for a resource fails for whatever reason, your app should handle the problem in a user-friendly way.
Since incoming requests to undefined routes aren't technically "server errors", Express doesn't throw an error when this happens. So you need to create your own way of catching this event when it happens and responding appropriately. You do this with a 404 handler, which you'll add near the bottom of app.js to catch any requests for undefined routes.
The 404 handler should create a custom new Error(), set its status property to 404 and set its message property to a user-friendly message. Then the 404 handler should log out the new error's message and status properties.
After the 404 handler in app.js, add a global error handler that will deal with any server errors the app encounters. This handler should ensure that there is an err.status property and an err.message property if they don't already exist, and then log out the err object's message and status.
Test your error handling by pointing the browser at a few undefined routes, like /noroute and /project/noroute, as well as temporarily throwing an intentional 500 error in one of your routes and then navigating to the page for that route.
Note: For more information on handling errors, check out this Practice Error Handling in Express practice session.

Complete Your Pug Files
Go through each of the four Pug templates to inject your data. The Pug files contain comments that detail each change you will need to make. These comments should be deleted once you have everything working as it should.

Pro Tip
Consider adding a target attribute set to _blank on the a tags for the live links to your projects so that they open in a new window.

Layout, CSS and Styles
The layout of the finished project should match the provided mockups. To really make this project your own, you are free to customize the CSS following the suggestions in the Extra Credit section at the bottom of this page.

Finishing the Project
The final stage of the project is perhaps the most important. This is where your developer skills really shine as you carefully double-check that you've accomplished all requirements and that your project is ready for submission.

Code comments - It’s a best practice for development code to be well commented. Replace provided comments with your own to briefly describe your code.
Code readability - Readability is second only to functionality. Double-check your code to ensure the spacing and indentation are consistent.
Quality Assurance Testing - This is the keystone step in the development process.
Open and run your app.
Open the Chrome DevTools console.
Pretend to be a user and test all aspects of functionality and every possible state of the app, while monitoring the console for bugs and resolving any that arise.
Pro Tip
Before submitting your project it's always a good idea to get an additional pair of eyes on it. This will avoid your project from being returned to you if you missed one of the requirements. You can share a link to your GitHub repository in the #review-my-project channel on Slack and a fellow student or staff member will happily have a look at it.

Extra Credit
To get an "exceeds" rating, complete all of the steps below:

 3 steps
Customize the package.json File
Set up your package.json file so that running npm start will run the app.

Render Helpful Pug Templates in Your Error-Handling Middleware
Create two new Pug templates in the views folder and name them error.pug and page-not-found.pug. These Pug files should extend the layout, be set to block content, and display the error's message, status, and optionally, the stack properties.
When the status property is a 404, the page-not-found.pug template should be rendered. For any other error status codes, the error.pug template should be rendered. Be sure that you're passing the {error} or {err} that you're creating or updating as the second parameter in the render method.
These templates should include a link back to the home page.
Customize the Styles
Change or add at least three of the following to make this project your own:

color
background color
font
box or text shadows
transitions or animations
a custom logo
Document your style changes in your README.md file.

Important Notes:
Do not alter the layout or position of the important elements on the page. The basic layout and style should generally match the mockups.

You can either add your changes to the end of the CSS file or add your own CSS file and link it within the head of the layout.pug file, below the other CSS links.

