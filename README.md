This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

# Installation Guide 

## Prerequisites

Before running the program, you must have the latest version of Node.js installed onto your computer.<br />
Go to [https://nodejs.org/en/](https://nodejs.org/en/) for installation.

You must also have a private AWS key and a secret AWS key (distributed by the administrator). <br />
Add this to the config.json file in the application.

You also need to know the AWS region and URL for the RDMS as well as the RDMS name and password (distributed by the administrator). <br />
These can be found after logging into [https://aws.amazon.com/rds/](https://aws.amazon.com/rds/).

## Downloading Project

### `git clone`

Downloads a local copy of this project onto your computer.

## Installing Dependencies

### `npm install`

Run this command in the project directory. 

## Run App

In the project directory:

### `npm start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.<br />
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

<br />

# Release Notes

## New Features

- Added Lessons Page for student users
- Added ability to save student's quiz answers for student users
- Added grading functionality for quizzes for teacher users
- Added ability to see class averages for teacher users

## Known Bugs

- If the video URL is not a real URL, then app shows another instance of the React start page in the video player
- Questions in a quiz to the left of the answers instead of above
- The edit button on admin Quiz Page does not do anything when clicked
- Admin Quiz Page does not add new quiz once you click save
- Side nav bar sometimes displays incorrectly (displays black)

## Fixed Bugs

- Fixed navigation on the sidebar
- Added dynamic video list to student videos
- Added dynamic announcements on the dashboard page
- Fixed create account page
- Working video player for students

