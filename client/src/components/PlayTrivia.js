import '../App.css';
import React, { useEffect, useState } from 'react';
import { Link } from '@reach/router';

const PlayTrivia = (props) => {
    const { socket } = (props);

    const [playersData, setPlayersData] = useState({});
    const [triviaGameState, setTriviaGameState] = useState({});
    const [guess, setGuess] = useState("");
    const [errorMessage, setErrorMessage] = useState('');
    const [timerId, setTimerId] = useState('');

    useEffect(() => {
        // Update the state of all the players in the game when the server sends an update.
        socket.on('updatePlayersData', (data) => setPlayersData(data));

        // Set the current trivia question when the server sends one.
        socket.on('newRound', (data) => {
            clearTimeout(timerId);
            setTriviaGameState(data);
            document.getElementById('guessInput').disabled = false;
            document.getElementById('guessSubmitBtn').disabled = false;
            startQuestionTimer(60);
        });

        socket.on('gameStarting', (data) => {
            setTriviaGameState(data);
            startGame();
        });

        socket.on('gameOver', (data) => {
            setTriviaGameState(data);
            document.getElementById('startGameBtn').disabled = false;
        })
    });

    const submitGuess = (e) => {
        e.preventDefault();
        setErrorMessage('');
        // If the answer is valid, send it to the server and disabled the input for the rest of the round.
        if(guess.length > 0){
            socket.emit('guessSubmission', guess);
            console.log('answer submitted');
            document.getElementById('guessInput').disabled = true;
            document.getElementById('guessSubmitBtn').disabled = true;
        }
        else {
            setErrorMessage('Answer cannot be blank.');
        }
    }

    const requestGameStart = () => {
        document.getElementById('startGameBtn').disabled = true;
        socket.emit('startGame');
    }

    const startGame = () => {
        startQuestionTimer(60);
        document.getElementById('startGameBtn').disabled = true;
    }

    const startQuestionTimer = (seconds) => {
        function oneSecondTick() {
            seconds--;
            const timer = document.getElementById('timer');
            timer.innerHTML = "0:" + (seconds < 10 ? "0" : "") + String(seconds);
            if (seconds > 0) {
                setTimerId(setTimeout(oneSecondTick, 1000));
            }
            else {
                socket.emit('guessSubmission', "You didn't answer in time!");
            }
        }
        oneSecondTick();
    }

    return (
        <div>
            <div className="header">
                <h1>Play Trivia</h1>
                <Link to={"/"}>Back to home</Link>
            </div>

            <div id='game'>
                <button id='startGameBtn' onClick={requestGameStart}>Click to Start Game</button>
                <h4 id='timer'>1:00</h4>

                {
                    triviaGameState.running ?
                    <div>
                        <p id='roundCounter'>Round {triviaGameState.roundCount}</p>
                        <p id='question'>{triviaGameState.currentQuestion.question}</p>
                    </div>
                    :null
                }

                <form onSubmit={submitGuess}>
                    <label>Guess: </label>
                    <input 
                        id='guessInput'
                        type="text"
                        onChange={(e) => setGuess(e.target.value)}
                        value={guess}
                        name='guess'
                    />
                    <button id='guessSubmitBtn'>Submit guess</button>
                </form>

                <table id='scoreBoard'>
                    <thead>
                        <tr>
                            <td>Player</td>
                            <td>Score</td>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            playersData ?
                                Object.keys(playersData).map((player, index) => (
                                    <tr key={player}>
                                        {
                                            player === socket.id ?
                                            <td className='you'>{player} (You)</td>
                                            :
                                            <td>{player}</td>
                                        }
                                        {
                                            player === socket.id ?
                                            <td className='you'>{playersData[player].score}</td>
                                            :
                                            <td>{playersData[player].score}</td>
                                        }
                                    </tr>
                                ))
                                :null
                        }
                    </tbody>
                </table>
            </div>
        </div >
    );
};

export default PlayTrivia;