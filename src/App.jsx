import './App.css'
import { useDispatch, useSelector } from "react-redux";
import Email from './components/Email';
import List from './components/List';

function App() {
  const state = useSelector(state => state)
  const dispatch = useDispatch()
  return (
    <div className="App">
      <Email />
      <List />
    </div>
  )
}

export default App
