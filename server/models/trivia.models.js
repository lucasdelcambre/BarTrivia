const mongoose = require('mongoose');

const TriviaSchema = new mongoose.Schema({
    question: {
        type: String,
        required: [
            true,
            "Question is required"
        ],
        minLength: [3, "Question must be at least 3 characters"],
    },
    answers: {
        type: Array,
        required: [
            false,
            "Question is required"
        ],

    }







    ,
    tidbit: {
        type: String,
        required: [
            false,
            "tidbit is required"
        ],
        minLength: [3, "Tidbit must be at least 3 characters"]
    },


}, { timestamps: true });


module.exports = mongoose.model('Trivia', TriviaSchema);
// s.plugin(random);


// const AnswerSchema = new mongoose.Schema({
//     answer1: {
//         type: String,
//     },
//     answer2: {
//         type: String,
//     },
//     answer3: {
//         type: String,
//     },
//     answer4: {
//         type: String,
//     },
//     answer5: {
//         type: String,
//     },
//     answer6: {
//         type: String,
//     },
// })