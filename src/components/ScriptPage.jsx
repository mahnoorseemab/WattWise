import Arrow from "../assets/LeftArrow.svg"
import { Link } from "react-router-dom"
import useResultStore from "../store/useResultStore"

const ScriptPage = () => {
  const receiveScript = useResultStore((state) => state.script)

  return (
    <div className="bg-background relative min-h-screen px-4 pb-16 pt-24">
      <Link to="/resultPage" className="absolute left-[10%] top-8">
        <img src={Arrow} title="Back" alt="Back" />
      </Link>

      <div className="mx-auto max-w-2xl">
        <div className="text-center">
          <h1 className="mt-3 text-3xl font-bold text-purple-900">Your Script</h1>
          <p className="mt-2 text-sm text-gray-500">
            Fill in the placeholders, then send it to IESCO by email or on a call.
          </p>
        </div>

        <div className="mt-8 overflow-hidden rounded-2xl bg-white shadow-lg shadow-purple-200/60">
          <div className="h-1.5 bg-gradient-to-r from-purple-700 to-purple-400" />

          <div className="p-6 sm:p-8">
            <p className="whitespace-pre-line border-l-4 border-purple-300 pl-4 text-[15px] leading-7 text-[#2b2540]">
              {receiveScript || "No script yet. Go back and generate one."}
            </p>
          </div>

          <div className="flex items-center justify-between gap-3 bg-purple-50 px-6 py-4 sm:px-8">
            <p className="text-xs text-gray-500">
              Replace [Your Name] and [Consumer Number] before sending.
            </p>
            <button className="rounded-full bg-purple-800 px-5 py-2 text-sm font-medium text-white shadow transition hover:bg-purple-700 active:scale-95 hover:cursor-pointer">
              Copy
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ScriptPage