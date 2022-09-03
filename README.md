
# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.


## `Game logic`:

Rows section - calculates each row which was cleared during the game
Level section - after every 10 cleared rows level increases hence speed of tetromino increases as well
Score section - score counted for every cleared row by the following formula: cleared row * level

## `Gameplay`:

Movements: down, left and right arrow keys (hold the down key to increase the tetromino speed)
Tetromino rotation: up arrow key


<img width="732" alt="Screenshot 2022-09-03 at 21 25 46" src="https://user-images.githubusercontent.com/93957570/188286836-3a22f679-51d3-4a1d-bb95-648b128b707f.png">
