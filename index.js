const bodyParser = require('body-parser')
const express = require('express')
const logger = require('morgan')
const app = express()
const {
  fallbackHandler,
  notFoundHandler,
  genericErrorHandler,
  poweredByHandler
} = require('./handlers.js')

const Snake = require("./core/Snake");

// For deployment to Heroku, the port needs to be set using ENV, so
// we check for the port number in process.env
app.set('port', (process.env.PORT || 9001))

app.enable('verbose errors')

app.use(logger('dev'))
app.use(bodyParser.json())
app.use(poweredByHandler)

// --- SNAKE LOGIC GOES BELOW THIS LINE ---

// Handle POST request to '/start'
app.post('/start', (request, response) => {
  // NOTE: Do something here to start the game
  // console.log("payload", request.body);
  // console.log("food", request.body.board.food);
  // console.log("you", request.body.you.body);

  // Response data
  const data = {
    color: '#DFFF00',
  }

  console.log("");
  console.log("");
  console.log("");
  console.log("");
  console.log("");
  console.log("");
  console.log("");
  console.log("======= GAME ID: " + request.body.game.id + " ==========");

  return response.json(data)
})

// Handle POST request to '/move'
app.post('/move', (request, response) => {
  // NOTE: Do something here to generate your move
  console.log("");
  console.log("");
  console.log("");
  console.log("");
  console.log(`======== TURN: ${request.body.turn} ========`);
  const mySnakeBody = request.body.you.body;
  const board = request.body.board;

  const mySnake = new Snake(mySnakeBody, board);
  const direction = mySnake.getNewDirection();

  console.log("new direction", direction);
  // Response data
  const data = {
    move: direction, // one of: ['up','down','left','right']
  }

  //console.log("move response", data);

  return response.json(data)
})

app.post('/end', (request, response) => {
  // NOTE: Any cleanup when a game is complete.
  return response.json({})
})

app.post('/ping', (request, response) => {
  // Used for checking if this snake is still alive.
  return response.json({});
})

// --- SNAKE LOGIC GOES ABOVE THIS LINE ---

app.use('*', fallbackHandler)
app.use(notFoundHandler)
app.use(genericErrorHandler)

app.listen(app.get('port'), () => {
  console.log('Server listening on port %s', app.get('port'))
})
