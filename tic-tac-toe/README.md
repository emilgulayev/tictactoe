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

I've decided to use **Bootstrap** as my design library, and also used Spinner package which I found in npm.

I've used React router and conditional render for the "/" path, checking that there is a token.


I've implemented the game as a general 2 dimentions matrix (not 3X3)

I tried to use Components as much as needed, and for each components there is a sass file.

First technical issue I've tackled was hovering on a certain cell(and then row and colum highlighted).
First I tried to find a simple solution with css , but after a while I understood that I have to use state (as the row and col of the hovered cell).
Then I Thought of Creating a component for each part of the game board :

- Game Table
- Game Row
- Game Square

Using this kind of organization , was on one hand more understandable for other devs , but there was a trade off in such that I needed to pass to the components certain function on props that I wouldn't have if I used <div> directly and not component containers.(and thus there are more renders)
  
Specificaly the functions are :
 
1. isHighlighted
2. onSquareHover
3. onPlayerMove
  
Moving on the next issue I've tackled was how I check if there is a win, and how to find AI's last move.
So I've implemented a function that finds the first diff between arrays(and in our case the only diff) : **findLastMove** .
 
Then I needed a function that checks if a certain board is in game end position, so I implemented a container function that uses other mini functions.
I found out that the way of checking is using the last move's row and col , and then check specific row, specific column and a case of diagonals.

Also, I thought the best way to implement the spinner/disable is to create a modal that lays over all other elements, with dark background and a spinner/message in case the game ended (and a reset button).
  
 In the end I implemented the move suggestion, first i thought that minimax will solve everything, but run into a problem of not recognizing the saving move because minix max search in dfs and picks the first node that return +1 , finnaly I split the process in such that it first looks if there's a critical move and if not it digs inside with minimax.
  
  Also I would have used macros in SASS to reduce double code.
  
  Also I would have made the UI more appealing.
  
  
