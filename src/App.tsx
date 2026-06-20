import { useState } from 'react'
import { BrowserRouter as Router , Routes, Route } from 'react-router-dom'
import EmployeeManagementPage from './components/pages/EmployeeManagementPage'

function App() {
  const [count, setCount] = useState(0)

  return (
    <Router>
      <Routes>
        <Route path='/' element=<EmployeeManagementPage/> />
      </Routes>
    </Router>
  )
}

export default App
