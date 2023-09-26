import React, { useState } from 'react';
import * as d3 from 'd3';

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
    let steps = [{ state: newState, symbol: '', accepted: false }];
  
    for (let i = 0; i < input.length; i++) {
      const symbol = input[i];
      if (!automaton.transitions[newState][symbol]) {
        // Si el símbolo no está en las transiciones actuales, reiniciar el autómata.
        newState = automaton.initialState;
        steps = [{ state: newState, symbol: '', accepted: false }];
      } else {
        newState = automaton.transitions[newState][symbol];
        steps.push({ state: newState, symbol, accepted: automaton.finalState.includes(newState) });
      }
      setCurrentState(newState);
    }
  
    setIsAccepted(automaton.finalState.includes(newState));
    visualizeAutomaton(steps);
  };
  

  const visualizeAutomaton = (steps) => {
    // Selecciona el contenedor SVG donde se dibujará el autómata.
    const svg = d3.select('#automaton-svg');

    // Define las coordenadas de los estados de manera más ordenada.
    const stateCoordinates = {
      q0: { x: 50, y: 200 },
      q1: { x: 150, y: 50 },
      q2: { x: 150, y: 200 },
      q3: { x: 210, y: 50 },
      q4: { x: 250, y: 150 },
      q5: { x: 250, y: 250 },
      q6: { x: 270, y: 200 },
      q7: { x: 300, y: 50 },
      q8: { x: 350, y: 50 },
      q9: { x: 400, y: 150 },
      q10: { x: 450, y: 150 },
      q11: { x: 550, y: 150 },
      q12: { x: 50, y: 250 },
    };

    // Limpia el SVG para redibujar.
    svg.selectAll('*').remove();

    // Verifica si la cadena completa es aceptada.
    const isCompleteAccepted = steps.length > 0 && steps[steps.length - 1].accepted;

    // Dibuja estados como círculos y agrega nombres de estados.
    const statesGroup = svg.append('g');
    Object.keys(stateCoordinates).forEach((state) => {
      const { x, y } = stateCoordinates[state];

      // Encuentra el estado correspondiente en los pasos.
      const stateStep = steps.find((step) => step.state === state);

      // Determina el color del círculo según el estado actual y si la cadena completa es aceptada.
      let circleColor = '#e9e7e7';
      if (stateStep) {
        if (isCompleteAccepted) {
          circleColor = '#36d399'; // Si la cadena completa es aceptada, todos los círculos son verdes.
        } else {
          circleColor = stateStep.accepted ? '#36d399' : '#f87272';
        }
      }

      // Dibuja el círculo.
      statesGroup
        .append('circle')
        .attr('cx', x)
        .attr('cy', y)
        .attr('r', 20)
        .style('fill', circleColor);

      // Agrega el nombre del estado como texto dentro del círculo.
      statesGroup
        .append('text')
        .attr('x', x)
        .attr('y', y)
        .attr('text-anchor', 'middle')
        .attr('dy', '0.3em') // Ajusta la posición vertical del texto dentro del círculo.
        .text(state);
    });

    if (steps) { 
    // Dibuja transiciones como líneas y coloca los símbolos de transición correctamente.
    for (let i = 0; i < steps.length -1 ; i++) {
      const fromState = steps[i].state;
      const toState = steps[i + 1 ].state;

      // Determina si la transición fue exitosa o no.
      const isTransitionSuccessful = toState !== fromState;

      // Cambia el color de la línea según si la transición fue exitosa o no.
      const lineColor = isTransitionSuccessful ? '#f50076' : '#f87272';

      // Dibuja la línea.
      svg
        .append('line')
        .attr('x1', stateCoordinates[fromState].x)
        .attr('y1', stateCoordinates[fromState].y)
        .attr('x2', stateCoordinates[toState].x)
        .attr('y2', stateCoordinates[toState].y)
        .attr('stroke', lineColor);

      // Agrega los símbolos de transición después de dibujar las líneas.
      if (steps[i].symbol) {
        // Calcula las coordenadas para el texto de transición como el punto medio entre los estados.
        const textX = (stateCoordinates[fromState].x + stateCoordinates[toState].x) / 2;
        const textY = (stateCoordinates[fromState].y + stateCoordinates[toState].y) / 2;
  
        // Agrega el símbolo de transición como texto en el medio de la línea.
        svg
          .append('text')
          .attr('x', textX)
          .attr('y', textY)
          .text(steps[i+1].symbol)
          .attr('text-anchor', 'middle');
      }
    }
  }
  };

  return (
    <div>
      <div className="hero min-h-screen bg-base-200">
        <div className="hero-content flex-col lg:flex-row-reverse">
          <div className="text-center lg:text-top">
            <h1 className="text-5xl font-bold">Validador de autómatas</h1>
            <p className="py-6">Rango de cadenas del DFA-001-A AL DKZ-999-Z</p>
            <div>
                <svg id="automaton-svg" width="600" height="300">
                  
                </svg>
              </div>
          </div>
          <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
            <div className="card-body">
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Cadena</span>
                </label>
                <input
                  type="text"
                  placeholder="Escribe una cadena"
                  className="input input-bordered"
                  value={input}
                  onChange={handleInputChange}
                />
              </div>
              <div className="form-control mt-6">
                <button className="btn btn-primary" onClick={simulateAutomaton}>
                  Validar
                </button>
              </div>
              <div className="mt-6 mb-3">
                <span className="label-text">Estado Actual: {currentState}</span>
                {isAccepted ? (
                  <div className="alert alert-success mt-3">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="stroke-current shrink-0 h-6 w-6"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                    <span>La cadena ha sido aceptada</span>
                  </div>
                ) : (
                  <div className="alert alert-error mt-3">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="stroke-current shrink-0 h-6 w-6"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                    <span>La cadena no es aceptada</span>
                  </div>
                )}
              </div>
             
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Automaton;

