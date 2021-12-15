import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from '@reach/router';

const Update = (props) => {
    const { id } = props;
    const [question, setQuestion] = useState("");
    const [tidbit, setTidbit] = useState("");
    const [answers, setAnswers] = useState([]);
    // const [answerStr, setAnswerStr] = useState("");
    const [answer1, setAnswer1] = useState("");
    const [answer2, setAnswer2] = useState("");
    const [answer3, setAnswer3] = useState("");
    const [answer4, setAnswer4] = useState("");


    const [errors, setErrors] = useState({});

    // useEffect(() => {
    //     updateAnswerArr();
    // }, [answerStr])
    // const updateAnswerArr = () => {
    //     setAnswers(answerStr.split(","));
    // }
    // const updateAnswerString = async (e) => {
    //     setAnswerStr(e.target.value)


    //     await setAnswers(answerStr.split(","));
    // }
    useEffect(() => {
        axios.get(`http://localhost:8001/api/trivias/${id}`)
            .then(res => {
                console.log(res.data);
                setQuestion(res.data.question);
                setTidbit(res.data.tidbit);
                setAnswers(res.data.answers);
                setAnswer1(res.data.answers[0]);
                setAnswer2(res.data.answers[1]);
                // setSkill1(res.data.skill1);
                // setSkill2(res.data.skill2);
                // setSkill3(res.data.skill3);


            })
            .catch(err => console.log(err))
    }, []);
    const updateTrivia = (e) => {
        e.preventDefault();
        // updateAnswerArr();
        const newQuestion = {
            question,
            tidbit,
            answers: [answer1, answer2, answer3, answer4],
            // skill1,
            // skill2,
            // skill3,

        };
        axios.put(`http://localhost:8001/api/trivias/${id}`, newQuestion)
            .then(res => console.log(res))
            .catch(err => console.log(err))
    }
    return (
        <div>
            <div className="header">
                <h1>Edit Trivia</h1>
                <Link to={"/"}>Back to home</Link>
            </div>

            <h3>Edit {question}</h3>
            <form onSubmit={updateTrivia} className="pet-form">
                <div className="leftside">
                    <p>
                        <label> Question: </label>
                        <input type="text"
                            name="name"
                            id="Name"
                            value={question}
                            onChange={(e) => setQuestion(e.target.value)} />
                    </p>
                    <p>
                        <label> Tidbit: </label>
                        <input type="text"
                            name="name"
                            id="Name"
                            value={tidbit}
                            onChange={(e) => setTidbit(e.target.value)} />
                    </p>
                    <p>
                        <label> Answers 1</label>
                        <input type="text"
                            name="name"
                            id="Name"
                            value={answer1}
                            onChange={(e) => setAnswer1(e.target.value)} />
                    </p>
                    <p>
                        <label> Answers 2</label>
                        <input type="text"
                            name="name"
                            id="Name"
                            value={answer2}
                            onChange={(e) => setAnswer2(e.target.value)} />
                    </p>
                    <button class="btn btn-primary" type="submit">Edit Question</button>


                </div>


            </form>
        </div>
    )

};
export default Update;