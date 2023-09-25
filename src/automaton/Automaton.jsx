import React, { useState } from 'react';

const Automaton = ({ automaton }) => {
  const [input, setInput] = useState('');
  const [currentState, setCurrentState] = useState(automaton.initialState);
  const [isAccepted, setIsAccepted] = useState(false);

  const handleInputChange = (event) => {
    const inputValue = event.target.value;
    setInput(inputValue);
    setCurrentState(automaton.initialState);
    setIsAccepted(false);
  };

  const simulateAutomaton = () => {
    let newState = automaton.initialState;
    for (let i = 0; i < input.length; i++) {
      const symbol = input[i];
      if (automaton.transitions[newState][symbol]) {
        newState = automaton.transitions[newState][symbol];
        setCurrentState(newState);
      } else {
        setIsAccepted(false);
        return;
      }
    }
    setIsAccepted(automaton.finalState.includes(newState));
  };

  return (
    <div>


<div className="hero min-h-screen bg-base-200">
  <div className="hero-content flex-col lg:flex-row-reverse">
    <div className="text-center lg:text-center">
      <h1 className="text-5xl font-bold">Validador de automátas</h1>
      <p className="py-6">Rango de cadenas del DFA-001-A AL DKZ-999-Z</p>
    </div>
    <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
      <div className="card-body">
        <div className="form-control">
          <label className="label">
            <span className="label-text">Cadena</span>
          </label>
          <input type="text" placeholder="Escribe una cadena" className="input input-bordered"
          value={input}
          onChange={handleInputChange} />
        </div>
        <div className="form-control mt-6">
          <button className="btn btn-primary" onClick={simulateAutomaton}>Validar</button>
        </div>
        <div className='mt-6 mb-3' >
        <span className="label-text">Estado Actual: {currentState}</span>
        {isAccepted ? (
         <div className="alert alert-success mt-3">
         <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
         <span>La cadena ha sido aceptada</span>
       </div>
        ) : (
          <div className="alert alert-error mt-3">
  <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
  <span>La cadena no es aceptada</span>
</div>
        )}
      </div>
    </div>
  
      </div>
    </div>
  </div>
</div>
  )
      
};

export default Automaton;
