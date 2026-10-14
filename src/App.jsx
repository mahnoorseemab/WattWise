import { Routes, Route } from "react-router-dom"
import LandingPage from "./components/LandingPage"
import Form from "./components/Form"
import ResultPage from "./components/ResultPage"
import "./config/slabConfig"

function App() {
  
  return (
    <>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/form" element={<Form />} />
        <Route path="/resultPage" element={<ResultPage />} />
      </Routes>
    </>
  )
}

export default App
