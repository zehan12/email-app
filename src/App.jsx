import './App.css'
import { useDispatch, useSelector } from "react-redux";

function App() {
  const state = useSelector(state=>state)
  const dispatch = useDispatch()
  return (
    <div className="App">
      <h1 className='text-red-700 text-3xl font-bold'>Tailwind install</h1>
    </div>
  )
}

export default App
