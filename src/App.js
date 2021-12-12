import React from 'react';
import useState from "./useState";

function App() {
  const [count, setCount] = useState(0);
  const [name, setName] = useState('张三');
  return <div>
    {count}
    <button onClick={() => setCount(count + 1)}>setCount</button>
    {name}
    <button onClick={() => setName('李四')}>setName</button>
  </div>;
}

export default App;
