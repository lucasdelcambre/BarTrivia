const express = require('express');
const cors = require('cors');
const socket = require('socket.io');
const app = express();
const port = 8001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({origin: 'http://localhost:3000'}));

require('./config/mongoose.config');
require('./routes/trivia.routes')(app);

const server = app.listen(port, () => {
    console.log(`Express server listening on port ${port}.`);
});

const io = socket(server, {
    cors: {
        origin: 'http://localhost:3000',
        methods: ['GET', 'POST'],
        allowHeaders: ['*'],
        credentials: true,
    }
});

const trivia = [
    {
        id: 0,
        question: 'Who won the 2020 presidential election?',
        answers: ['Joe', 'Joe Biden', 'Biden']
    },
    {
        id: 1,
        question: 'What is 2 plus 2 equal to?',
        answers: ['4', 'four']
    },
    {
        id: 2,
        question: 'What US state is the city Seattle located in?',
        answers: ['Washington', 'WA']
    },
    {
        id: 3,
        question: 'What is  9 multiplied by 9 equal to?',
        answers: ['81', 'eighty-one']
    }
]

let playersData = {};

let roundsToPlay = 5;

let triviaGameState = {
    running: false,
    roundCount: 1,
    currentQuestion: trivia[0],
    numPlayersAnswered: 0
};

io.on('connection', socket => {
    console.log('Client connected: ' + socket.id);
    socket.emit('yourIdIs', socket.id);

    playersData[socket.id] = {
        score: 0,
    };

    io.emit('updatePlayersData', playersData);

    socket.on('disconnect', () => {
        console.log('Client disconnected: ' + socket.id);
        delete playersData[socket.id];
        io.emit('updatePlayersData', playersData);
    });

    // Start the game and send the clients the first question
    socket.on('startGame', () => {
        console.log('Game starting.')
        triviaGameState = {
            running: true,
            roundCount: 1,
            currentQuestion: trivia[0],
            numPlayersAnswered: 0
        };
        io.emit('gameStarting', triviaGameState);
        console.log('Round ' + triviaGameState.roundCount);

    })

    // Client sends a guess for the current question
    socket.on('guessSubmission', (data) => {
        triviaGameState.numPlayersAnswered++;

        // Check to see if the client's guess was correct
        for(var i = 0; i < triviaGameState.currentQuestion.answers.length; i++){
            if(data === triviaGameState.currentQuestion.answers[i]){
                playersData[socket.id].score++;
                io.emit('updatePlayersData', playersData);
                break;
            }
        }

        io.emit('updatePlayersData', playersData);

        // Check if enough players answered to end the round
        if(triviaGameState.numPlayersAnswered >= Object.keys(playersData).length) {
            triviaGameState.roundCount++;
            // Check if the game should be over
            if(triviaGameState.roundCount > roundsToPlay) {
                console.log('Game finished.')
                triviaGameState = {
                    running: false,
                    roundCount: 1,
                    currentQuestion: trivia[0],
                    numPlayersAnswered: 0
                };
                io.emit('gameOver');
            }
            else {
                // Send a new random question to the players
                console.log('Round ' + triviaGameState.roundCount)
                triviaGameState.numPlayersAnswered = 0;
                triviaGameState.currentQuestion = trivia[Math.floor(Math.random() * trivia.length)];
                io.emit('newRound', triviaGameState);
            }
        }
    })
})