import { useState } from "react"

const Form = () => {
  const [billAmount, setBillAmount] = useState("")
  const [unit, setUnit] = useState("")
  const [tenure, setTenure] = useState("")

  return (
    <div className="bg-background h-screen font-sans">
      <div className="flex flex-col items-center ">
        <h1 className="bg-gradient-to-r from-darkest-purple to-mid-purple bg-clip-text text-transparent font-bold text-4xl tracking-tighter mt-10">Check Your Electricity Bill!</h1>
        <p className="text-darker-purple">Enter your electricity bill details to know if <br /> you're overpaying or already getting a fair rate.</p>
      </div>

      <div className="flex items-center justify-center m-4 flex-col border-3">
        <div className="flex flex-col border-2 w-[50vw]">
          <div className="flex flex-col p-4">
            <label htmlFor="BillAmount">Amount of Bill</label>
            <input className="border-2 p-2" type="number" placeholder="Enter the amount of your bill"
              value={unit}
              onChange={(e) => setUnit(e.target.value)
              } />
          </div>

          <div className="flex flex-col p-4">
            <label htmlFor="BillAmount">Number of units used</label>
            <input className="border-2 p-2" type="number" placeholder="Enter the number of units used (kWh)"
            value={tenure}
              onChange={(e) => setTenure(e.target.value)
              }
             />
          </div>

          <div className="flex flex-col p-4">
            <label htmlFor="BillAmount">Tenure</label>
            <select name="Tenure" className="p-2 border-2">
              <option value="">Choose your tenure</option>
              <option value="less-then-1">Less then 1 year</option>
              <option value="1-5">1 Year - 5 Years</option>
              <option value="5 plus">More than 5 years</option>
            </select>
          </div>
        </div>

        <div className="flex items-center justify-center">
          <button className="border-2 px-6 py-3 rounded-3xl cursor-pointer transition-all duration-200 ease-in-out active:scale-95 bg-darker-purple text-white text-md mt-6">
            Submit
          </button>
        </div>
      </div>
    </div>
  )
}

export default Form