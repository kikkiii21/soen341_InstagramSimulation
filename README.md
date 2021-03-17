# soen341_InstagramSimulation [![Build Status](https://travis-ci.com/kikkiii21/soen341_InstagramSimulation.svg?token=pt6PQXoyXhRXSsbbzoLs&branch=main)](https://travis-ci.com/kikkiii21/soen341_InstagramSimulation)

## Project Objective
The goal of this project is to simulate a software development process through the creation of a simplified version of Instagram. The project will be completed in 4 sprints each lasting about 2-3 weeks.

## Description 
Social media applications allow their users the benefit and convenience of staying in touch with friends and family by overcoming the barriers of distance and travel. To offer these benefits, this project's web application will feature four core elements implemented with specific frameworks and programming languages. In summary, registered users will have the power to:
- Post a picture with text description on their page
- Follow another user to receive notifications when the other user creates picture posts
- Leave comments to a posted picture
- (TBD)

## Team Members 
| **Github ID** |   **Name**     | **ID**  |
|-------------- |--------------- |---------|
|kikkiii21      |Judith Lombardo |29737472 |
|kilobeaw       |Jason Li        |40135468 |
|jacklibb       |Jia Xin Li      |40136094 |
|massimolopez11 |Massimo Lopez   |40095372 |
|Khairo-kh      |Khairo Khatib   |40071125 |
|YiHengYan      |Yi Heng Yan     |40060587 |


## Framework and Language
This project will utilize two main technologies:
-  **Frontend**: _React.JS_ <br>
&nbsp; &nbsp; &nbsp; React.JS is a component-based JavaScript library for building user interfaces (UI)
- **Backend**: _Django_ <br>
&nbsp; &nbsp; &nbsp; Django is a robust python backend framework that efficiently handles all backend operations.


## Getting Started
 First, make sure you have Python3 and NodeJS installed on your local machine. You also need to install pipenv to <br>
 manage Python packages throughout the project, and run the python virtual environment.<br>
 in a terminal window, run the following command: ` pip install pipenv` then, use the following steps: <br>
 1. Clone the project to your local machine and in your terminal change directory to the project root.
 2. Inside the project root, where you can find the file _pipfile_, run the command `pipenv shell` to start the Python virtual environment.
 3. Run the command `pipenv install` to install all python packages and dependencies needed for the project.
 4. Change the directory and go inside the _instagram_ folder in the project root. You should see the file _manage.py_ here.
 5. If there are any changes to the database models, you need to run `python manage.py makemigrations` 
    and then `python manage.py migrate`.
 6. Run the command `python manage.py runserver` which will run the server.
 7. Open a different terminal window and navigate to the directory of the frontend app at `soen341_InstagramSimulation/instagram/frontend`.
 8. Run `npm install` command to install all packages required for React and the front end app.
 9. Finally, run the command `npm run dev` to start the react development server.
 10. Check the page rendered by the project in your browser at `http://127.0.0.1:8000/`.
