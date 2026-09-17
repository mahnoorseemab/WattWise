import { Routes, Route } from "react-router-dom"
import LandingPage from "./components/LandingPage"
import Form from "./components/Form"



function App() {

  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/form" element={<Form />}/>
    </Routes>
  )
}

export default App
