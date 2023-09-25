import React from 'react';
import Automaton from './automaton/automaton';
import { useState } from 'react';
import './App.css';

const automaton = {
    states: ['q0', 'q1', 'q2', 'q3', 'q4','q5','q6','q7', 'q8', 'q9', 'q10', 'q11', 'q12'], // Lista de states
    transitions: {
      q0: {'D': 'q1'},
      q1: {},
      q2: {},
      q3: {'-': 'q4'},
      q4: {},
      q5: {'0': 'q6'},
      q6: {'0':'q12'},
      q7: {'-':'q8'},
      q8: {},
      q9: {},
      q10: {},
      q11: {'-':'q8'},
      q12: {'-':'q8'},
    },
    initialState: 'q0',
    finalState: ['q9'],
  };
  //  'F' a 'K'

for (let i = 'F'.charCodeAt(0); i <= 'K'.charCodeAt(0); i++) {
  const symbol = String.fromCharCode(i);
  console.log( automaton.transitions.q1[symbol])
  automaton.transitions.q1[symbol] = 'q2';
}

//modificar para a-z

for (let i = 'A'.charCodeAt(0); i <= 'Z'.charCodeAt(0); i++) {
  const symbol = String.fromCharCode(i);
  automaton.transitions.q2[symbol] = 'q3';
  automaton.transitions.q8[symbol] = 'q9';
}

//modificar para 0-9

for (let i = 0; i <= 9; i++) {
  const symbol = i.toString();
  automaton.transitions.q4[symbol] = 'q5';
  automaton.transitions.q10[symbol] = 'q11';
}


//del 1-9
for (let i = 1; i <= 9; i++) {
  const symbol = i.toString();
  automaton.transitions.q5[symbol] = 'q10';
  automaton.transitions.q6[symbol] = 'q7';
}

function App() {
  return (
    <div className="App">
      <Automaton automaton={automaton} />
    </div>
  );
}

export default App;
