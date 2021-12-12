import React from 'react';
import ReactDOM from "react-dom";

function render() {
  stateIndex = 0;  // 重新渲染时归零
  effectIndex = 0;  // effects下标归零
  ReactDOM.render(<App/>, document.getElementById('root'));
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
  stateIndex++;
  return [state, setState];
}

let prevDepsAry = [];
let effectIndex = 0;

function useEffect(callback, depsAry) {
  if (Object.prototype.toString.call(callback) !== '[object Function]') {
    throw new Error('useEffect第一个参数必须是函数')
  }
  if (typeof depsAry === 'undefined') {
    callback();
  } else {
    if (Object.prototype.toString.call(depsAry) !== '[object Array]') {
      throw new Error('useEffect第二个参数必须是数组')
    }

    const prevDeps = prevDepsAry[effectIndex];

    // 同步依赖值
    const hasChanged = !prevDeps ? true : prevDeps.some((dep, index) => dep !== depsAry[index]);
    if (hasChanged) {
      callback()
    }
    prevDepsAry[effectIndex] = depsAry;
    effectIndex++;
  }
}


function useReducer(reducer, initialState) {
  const [state, setState] = useState(initialState);

  function dispatch(action) {
    const newState = reducer(state, action);
    setState(newState)
  }

  return [state, dispatch]
}

function App() {
  const [count, setCount] = useState(0);
  const [name, setName] = useState('张三');

  function reducer(state, action) {
    switch (action.type) {
      case 'increment':
        return state + 1;
      case 'decrement':
        return state - 1;
      default:
        return state;
    }
  }

  const [num, dispatch] = useReducer(reducer, 0);

  useEffect(() => {
    console.log('hello');
  }, [])

  useEffect(() => {
    console.log('world');
  }, [])

  return <div>
    {count}
    <button onClick={() => setCount(count + 1)}>setCount</button>
    {name}
    <button onClick={() => setName('李四')}>setName</button>
    {num}
    <button onClick={() => dispatch({type: 'increment'})}>+num</button>
    <button onClick={() => dispatch({type: 'decrement'})}>-num</button>
  </div>;
}

export default App;
