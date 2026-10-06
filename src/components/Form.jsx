import { useState } from "react"
import Arrow from "../assets/BackArrowIcon.svg"
import { Link } from "react-router-dom"

const Form = () => {
  const [billAmount, setBillAmount] = useState("")
  const [electricCharges, setElectricCharges] = useState("")
  const [unit, setUnit] = useState("")
  const [category, setCategory] = useState("")
  const [tenure, setTenure] = useState("")

  return (
    <div className="bg-background h-screen font-sans">
      <div className="flex flex-col items-center ">
        <div className="flex relative">
          <Link to="/">
            <img src={Arrow} className="mt-8 absolute right-[230%]" title="Back" alt="Arrow" />
          </Link>
          <h1 className="bg-gradient-to-r from-darkest-purple to-mid-purple bg-clip-text text-transparent font-bold text-4xl tracking-tighter mt-10">Check Your Electricity Bill!</h1>
        </div>
        <p className="text-darker-purple">Enter the details from your IESCO bill to compare it with an estimate based on official rates.</p>
      </div>

      <div className="flex items-center justify-center m-2 flex-col">
        <div className="flex flex-col border-2 w-[50vw]">
          <div className="flex flex-col p-4">
            <label htmlFor="BillAmount">Total Amount of Bill</label>
            <input className="border-2 p-2" type="number" placeholder="Enter the total amount of your bill"
              value={billAmount}
              onChange={(e) =>
                setBillAmount(e.target.value)
              }
            />
          </div>

          <div className="flex flex-col p-4">
            <label htmlFor="charges">Electric Charges</label>
            <input className="border-2 p-2" type="number" placeholder="Enter the electricity charges from your bill"
              value={electricCharges}
              onChange={(e) => setElectricCharges(e.target.value)
              } />
            <label htmlFor="hint">Find this on your bill under the line for cost of electricity. Don't include taxes, fuel adjustments or other charges.</label>
          </div>

          <div className="flex flex-col p-4">
            <label htmlFor="BillAmount">Number of units used</label>
            <input className="border-2 p-2" type="number" placeholder="Enter the number of units used (kWh)"
              value={unit}
              onChange={(e) => {
                setUnit(e.target.value);
              }
              } />
          </div>

          <div className="flex flex-col p-4">
            <label htmlFor="Category">Category</label>
            <select name="Category" className="p-2 border-2"
              value={category}
              onChange={(e) => setCategory(e.target.value)
              }>
              <option value="">Choose your category</option>
              <option value="lifeLine">Lifeline</option>
              <option value="protected">Protected</option>
              <option value="unProtected">Non-protected</option>
            </select>
            <label htmlFor="hint">Check your bill for the tariff category and select the one that matches</label>
          </div>

          <div className="flex flex-col p-4">
            <label htmlFor="tenure">Tenure</label>
            <select name="Tenure" className="p-2 border-2"
              value={tenure}
              onChange={(e) => setTenure(e.target.value)
              }>
              <option value="">Choose your tenure</option>
              <option value="less-than-1">Less than 1 year</option>
              <option value="1-5">1 Year - 5 Years</option>
              <option value="5-plus">More than 5 years</option>
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