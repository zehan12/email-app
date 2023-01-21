import './App.css'
import { useDispatch, useSelector } from "react-redux";
import Email from './components/Email';
import List from './components/List';
import Filters from './components/Filters';

function App() {
  const state = useSelector(state => state)
  // const dispatch = useDispatch().

  console.log(state,"data")
  return (
    <div className="App">
      <Filters />
      <Email />
      <List />
    </div>
  )
}

export default App
