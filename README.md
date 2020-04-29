# Polling System API

## Dependencies needed to install

To install any dependency required, Navigate to the project directory, open the terminal and run the command `npm install <dependency_name>`.\
For example `npm install express`

The following dependencies need to be installed before running the project

* express
* nodemon
* mongoose
* passport
* passport-jwt
* crypto-js
* jsonwebtoken

## Running the project

To run the project open the terminal and run the command `npm start`

## Testing the project

After the project has successfully run, In a web browser you can run the following urls to get the data

* `http://localhost:8000/api/v1/questions`\
  This will return all the questions along with their options currently present in the catalogue.

* `http://localhost:8000/api/v1/questions/create/?title=<your_question>`'\
  This will first check if the question with that title is already present in the database. If not only then a new question will be added in the database.

* `http://localhost:8000/api/v1/questions/<question_id>/options/create/?option=<your_option>`'\
  This will first check if the question with that title is already present in the database. If yes then it will add a new option in that question and return the question with the newly added option.

* `http://localhost:8000/api/v1/questions/<question_id>/delete`\
  Two conditions need to be fulfilled for successful deletion
  1).  The user must be logged in
  2).  There are no votes on any of the options of the question

* `http://localhost:8000/api/v1/options/<option_id>/delete`\
  Two conditions need to be fulfilled for successful deletion
  1).  The user must be logged in
  2).  There are no votes on the option

* `http://localhost:8000/api/v1/options/<option_id>/add_vote`\
  This will check if the option is present in the database. If yes then the vote count on that option will be incremented by one.

* `http://localhost:8000/api/v1/questions/<question_id>`\
  This will check if the question is present and if yes then return the question along with options and the link to vote on any one of those option.