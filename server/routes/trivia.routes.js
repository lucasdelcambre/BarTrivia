const TriviaController = require('../controllers/trivia.controller');
module.exports = function (app) {
    app.get('/api', TriviaController.index);
    app.post('/api/trivias', TriviaController.createTrivia);     /* This is new */
    app.get('/api/trivias', TriviaController.getAllTrivias);
    app.get('/api/trivias/:_id', TriviaController.getTriviaById);
    app.put('/api/trivias/:_id', TriviaController.updateTrivia);
    app.delete('/api/trivias/:_id', TriviaController.deleteTrivia);
    app.get('/api/random', TriviaController.getRandom);

}