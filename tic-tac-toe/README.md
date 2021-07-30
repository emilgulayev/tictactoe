# Getting Started with tic tac toe

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.


# Organization and Technical Choices

I've decided to use Bootstrap as my design library, and also used Spinner package which I found in npm.

I tried to use Components as much as needed, and for each components there is a sass file.

First technical issue I've tackled was hovering on a certain cell(and then row and colum highlighted).
First I tried to find a simple solution with css , but after a while I understood that I have to use state (as the row and col of the hovered cell).
Then I Thought of Creating a component for each part of the game board :

## Game Table
## Game Row
## Game Square

Using this kind of organization , was on one hand more understandable for other devs , but there was a trade off in such that I needed to pass to the components certain function on props that I wouldn't have if I used <div> directly and not component containers.
  
Specificaly the functions are :
 
 ## isHighlighted
 ## onSquareHover
 ## onPlayerMove
  
Moving on the next issue I've tackled was 
