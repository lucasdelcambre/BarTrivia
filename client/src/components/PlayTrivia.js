import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from '@reach/router';

const PlayTrivia = () => {
    // const { id } = props;
    const [question, setQuestion] = useState("");
    const [tidbit, setTidbit] = useState("");
    const [guess, setGuess] = useState("");
    const [correctBoolean, setCorrectBoolean] = useState(false)
    const [nextBoolean, setNextBoolean] = useState(false)
    const [answers, setAnswers] = useState([]);
    const [score, setScore] = useState(0);
    const [errorMessage, setErrorMessage] = useState(false);
    // var score = 0;
    // const [answerStr, setAnswerStr] = useState("");

    // const displayAnswer = () => {
    //     document.getElementById("Answer").style.display = "Block";
    // }
    useEffect(() => {
        axios.get(`http://localhost:8001/api/random`)
            .then(res => {
                console.log(res.data);
                setQuestion(res.data.question);
                setTidbit(res.data.tidbit);
                setAnswers(res.data.answers);



            })
            .catch(err => console.log(err))
    }, [nextBoolean]);

    const nextQuestion = () => {
        setNextBoolean(!nextBoolean);
        document.getElementById("Answer").style.display = "none";
        document.getElementById("Submit").style.display = "none";
        setCorrectBoolean(false);
        setErrorMessage(false);
        setGuess("");
    }
    const styleAnswerSubmit = () => {
        document.getElementById("Answer").style.display = "block";
        document.getElementById("Submit").style.display = "block";
    }
    const startGame = () => {
        document.getElementById("StartGame").style.display = "block";
        function countdown() {
            var seconds = 60;
            function tick() {
                var counter = document.getElementById("counter");
                seconds--;
                counter.innerHTML = "0:" + (seconds < 10 ? "0" : "") + String(seconds);
                if (seconds > 0) {
                    setTimeout(tick, 1000);
                } else {
                    displayAnswer()
                }
            }
            tick();
        }

        countdown();
    }
    const displayAnswer = () => {
        // var answerBoolean = false;
        // if(guess === "")

        if (guess.length < 1) {
            setErrorMessage(!errorMessage);
            styleAnswerSubmit();
            return

        }
        for (var i = 0; i < answers.length; i++) {
            console.log(answers[i]);
            if (answers[i] === guess && guess.length > 0) {
                setCorrectBoolean(!correctBoolean);
                setScore(score + 1);


            }
        }

        styleAnswerSubmit();
        console.log(correctBoolean);
        console.log(guess);
        console.log(errorMessage);


        //     // console.log(guess);
        //     // setCorrectBoolean = setAnswers.contains(guess => { guess == })
        // }
    }

    // const btnNext = document.getElementById("btnNext");
    // btnNext.addEventListener('click', function () {

    // });
    return (
        <div>
            <div className="header">
                <h1>Play Trivia</h1>
                <button onClick={startGame}>Click to Start Game</button>
                <Link to={"/"}>Back to home</Link>
            </div>
            <div id="StartGame">
                <div>
                    <h4 id="counter"></h4>
                    <h4>Score: {score}</h4>
                </div>


                <p>
                    <button id="btnNext" onClick={nextQuestion}>Next Question</button>
                </p>
                <div id="Question">

                    <label>{question}</label>
                </div>


                <div id="GuessDiv">
                    <label> Guess:</label>
                    <input id="InputGuess" type="text" onChange={(e) => setGuess(e.target.value)}
                        value={guess}
                    />
                </div>

                <div id="Submit">
                    {
                        correctBoolean ?
                            <p>
                                Correct Answer!
                            </p>
                            : <p>
                                Incorrect!
                            </p>
                    }

                    {errorMessage ?
                        <p className="Error">
                            Guess cannot be blank
                        </p>
                        : <></>
                    }
                </div>



                <button id="SubmitButton" onClick={displayAnswer}>Submit</button>
                <p>
                    <label>Guess:{guess}</label>
                </p>
                <div id="Answer">
                    Answer:
                    <label id="Question">{answers}</label>
                    <div>
                        Tidbit:
                        <label id="Question">{tidbit}</label>
                    </div>

                </div>

            </div>




        </div >




    )

};

export default PlayTrivia;