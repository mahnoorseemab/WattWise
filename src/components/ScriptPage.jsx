import Arrow from "../assets/LeftArrow.svg"
import { Link } from "react-router-dom"

const ScriptPage = () => {
  return (
    <div className="bg-background relative min-h-screen px-4 pb-16 pt-24">
      <Link to="/resultPage" className="absolute left-[10%] top-8">
        <img src={Arrow} title="Back" alt="Back" />
      </Link>
    </div>
  )
}

export default ScriptPage