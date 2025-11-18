import { useState } from 'react'
import SearchFilter from './components/SearchFilter'
import Board from './components/Board'
import "./App.css"

function App() {
  const [filterTerm, setFilterTerm] = useState("");

  return (
    <div className='app-container'>
      <div className='cabecera'>
        <h1>Kanban Board</h1>
        <SearchFilter setSearch={setFilterTerm} />
      </div>
      <Board filterTerm={filterTerm} />
    </div>
  )
}

export default App;
