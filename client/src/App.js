import logo from './logo.svg';
import './App.css';
import React from 'react';
import { Router } from "@reach/router";
import TriviaList from './components/TriviaHome';
import TriviaForm from './components/AddTrivia';
import Update from './components/EditTrivia';
import PlayTrivia from './components/PlayTrivia';

function App() {
  return (
    <div className="App">

      <Router>
        <TriviaForm path="/new" />
        <TriviaList path="/" />
        <Update path="/trivias/:id/edit" />
        <PlayTrivia path="/game" />


      </Router>
    </div>
  );
}

export default App;
