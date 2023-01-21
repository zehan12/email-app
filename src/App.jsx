import './App.css'
import { useDispatch, useSelector } from "react-redux";
import Email from './components/Email';
import List from './components/List';
import Filters from './components/Filters';
import { changePage } from './redux/pageSlice';

function App() {
  const dispatch = useDispatch();
  const s = useSelector(state => state)

  console.log(s, "data")
  return (
    <div className="App">
      <Email />
      {/* <Filters /> */}
      {/* <Email /> */}
      {/* <List /> */}
    </div>
  )
}

export default App
