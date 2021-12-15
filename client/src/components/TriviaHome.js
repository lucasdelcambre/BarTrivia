import React, { useState, useEffect } from 'react';
import axios from "axios";
import { Link } from '@reach/router';






const TriviaList = (props) => {
    const { submitted } = props;

    // submitted.preventDefault();
    const [trivia, setTrivia] = useState([]);
    const [deleteBoolean, setDeleteBoolean] = useState(false);

    const [guess, setGuess] = useState("");
    const deleteTrivia = (id, index) => {

        axios.delete(`http://localhost:8001/api/trivias/${id}`)
            .then(res => {
                console.log(res);
                setDeleteBoolean(!deleteBoolean);
                // const PetCopy = [...Pet];
                // const filteredArr = PetCopy.filter(
                //     (element, idx) => idx !== index
                // );
                // setPet(filteredArr);
            })
    }

    useEffect(() => {
        console.log("inside all Trivia");

        axios
            .get("http://localhost:8001/api/trivias")
            .then((response) => {
                console.log(response.data);

                setTrivia(response.data);
            })
            .catch((err) => console.log(err));
    }, [submitted, deleteBoolean]);


    return (
        <>
            <div className="header">
                <Link to={"/game"}>Play Trivia</Link>
                <Link to={"/new"}>Add Trivia Questions</Link>
            </div>
            <h3>Trivia Questions:</h3>


            <table class="table">
                <thead>
                    <tr>

                        <th scope="col">Question</th>
                        <th scope="col">Answer 1</th>
                        <th scope="col">Answer 2</th>
                        <th scope="col">Answer 3</th>
                        <th scope="col">Answer 4</th>
                        <th scope="col">Tidbit</th>
                        <th scope="col">Actions</th>

                    </tr>
                </thead>
                <tbody>
                    {trivia.map((trivia, index) => (
                        <tr key={index}>

                            <td>{trivia.question}</td>
                            <td>{trivia.answers[0]}</td>
                            <td>{trivia.answers[1]}</td>
                            <td>{trivia.answers[2]}</td>
                            <td>{trivia.answers[3]}</td>
                            <td>{trivia.tidbit}</td>

                            <td>
                                <Link className='all-Pets' to={"/trivias/" + trivia._id + "/edit"}>
                                    Edit
                                </Link>
                                {/* <Link className='all-Pets' to={"/trivias/" + trivia._id}>
                                    Details
                                </Link> */}
                                <button class="btn btn-primary" onClick={(e) => { deleteTrivia(trivia._id, index) }}>Delete</button>
                            </td>

                        </tr>
                    ))}
                </tbody>
            </table>



        </>

    );
}

export default TriviaList;