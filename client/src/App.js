import './App.css';
import React, { useEffect, useState } from 'react';
import { Router } from "@reach/router";
import io from 'socket.io-client';

import TriviaList from './components/TriviaHome';
import TriviaForm from './components/AddTrivia';
import Update from './components/EditTrivia';
import PlayTrivia from './components/PlayTrivia';

function App() {
  const [socket] = useState(() => io(':8001'));

  useEffect(() => {
    socket.on('connect', () => {
      console.log('Socket connected. Your id is: ' + socket.id);
    })
    return () => socket.disconnect(true);
  }, []);

  return (
    <div className="App">

      <Router>
        <TriviaForm path="/new" />
        <TriviaList path="/list" />
        <Update path="/trivias/:id/edit" />
        <PlayTrivia path="/" socket={socket} />
      </Router>
    </div>
  );
}

export default App;
