const Trivia = require('../models/trivia.models');    /* this is new */
module.exports.index = (request, response) => {
    response.json({
        message: "Hello World"
    });
}

module.exports.createTrivia = (request, response) => {
    // const { name } = request.body;
    Trivia.create(request.body)
        .then(newTrivia => response.json(newTrivia))
        .catch(err => {
            console.log(err)
            response.status(400).json(err);
        });
}

module.exports.getAllTrivias = (request, response) => {
    Trivia.find({})
        .then(trivia => response.json(trivia))
        .catch(err => response.json(err))
}

module.exports.getTriviaById = (request, response) => {
    Trivia.findOne({ _id: request.params._id })
        .then(queriedTrivia => response.json(queriedTrivia))
        .catch(err => console.log(err))
}


module.exports.updateTrivia = (request, response) => {
    Trivia.findOneAndUpdate({ _id: request.params._id }, request.body, { new: true, runValidators: true, })
        .then(updatedTrivia => response.json(updatedTrivia))
        .catch(err => response.json(err))
}

module.exports.deleteTrivia = (request, response) => {
    Trivia.deleteOne({ _id: request.params._id })
        .then(deleteConfirmation => response.json(deleteConfirmation))
        .catch(err => response.json(err))
}
module.exports.getRandom = (req, res) => {


    Trivia.estimatedDocumentCount((err, count) => {
        console.log(count);

        const randomPosition = Math.floor(Math.random() * count);


        Trivia.findOne().skip(randomPosition).exec()
            .then(trivia => res.json(trivia))
            .catch(err => console.log(err));
    });
}