import React from 'react';
import ReactDOM from "react-dom";
import App from './App'

function render() {
  stateIndex = 0;  // 重新渲染时归零
  ReactDOM.render(<App />, document.getElementById('root'));
}

let states = [];
let setters = [];
let stateIndex = 0;

function createSetter(index) {
  return function (value) {
    states[index] = value;
    render();
  }
}

function useState(initialState) {
  const existState = states[stateIndex];
  if (!existState) {
    states.push(initialState);
  }
  setters.push(createSetter(stateIndex));
  const state = states[stateIndex];
  const setState = setters[stateIndex];
  stateIndex ++;
  return [state, setState];
}

export default useState;
