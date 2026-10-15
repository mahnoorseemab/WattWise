import { useState } from "react"
import Arrow from "../assets/BackArrowIcon.svg"
import { Link, useNavigate } from "react-router-dom"
import { findRate, compareAmount } from "../utils/calculateOvercharge"
import useResultStore from "../store/useResultStore"

const Form = () => {
  const [billAmount, setBillAmount] = useState("")
  const [electricCharges, setElectricCharges] = useState("")
  const [unit, setUnit] = useState("")
  const [category, setCategory] = useState("")
  const [tenure, setTenure] = useState("")
  const Result = useResultStore((state) => state.userResult)
  const navigate = useNavigate()

  function handleSubmit(e) {
    e.preventDefault()//prevents the page from default refresh on clicking submit button
    let userUnit = Number(unit)
    let userCategory = category
    let userElectricCharges = Number(electricCharges)
    let rate = findRate(userUnit, userCategory)
    let data = compareAmount(userUnit, userElectricCharges, rate)
    Result(data)
    navigate("/resultPage")
    console.log("StoreResult:", useResultStore.getState().result)
  }

  return (
    <div className="bg-background h-screen font-sans">
      <div className="flex flex-col items-center ">
        <div className="flex relative">
          <Link to="/">
            <img src={Arrow} className="mt-8 absolute right-[200%]" title="Back" alt="Arrow" />
          </Link>
          <h1 className="bg-gradient-to-r from-darkest-purple to-mid-purple bg-clip-text text-transparent font-bold text-4xl tracking-wide mt-10">Check Your Electricity Bill!</h1>
        </div>
        <p className="text-darker-purple">Enter the details from your IESCO bill to compare it with an estimate based on official rates.</p>
      </div>
      <form action=""
        onSubmit={
          handleSubmit
        }>
        <div className="flex items-center justify-center m-2 flex-col">
          <div className="flex flex-col border-gray-500 w-[40vw]">
            <div className="flex flex-col gap-1.5 p-4">
              <label className="text-darkest-purple text-xl" htmlFor="BillAmount">Total Amount of Bill</label>
              <input className="border-2 border-mid-purple outline-deep-purple shadow-lg p-3 rounded-2xl" type="number" placeholder="Enter the total amount of your bill"
                value={billAmount}
                onChange={(e) =>
                  setBillAmount(e.target.value)
                }
              />
            </div>

            <div className="flex flex-col gap-1.5 p-4">
              <label className="text-darkest-purple text-xl" htmlFor="charges">Net Electricity Charges</label>
              <input className="border-2 p-3 rounded-2xl border-mid-purple outline-deep-purple" type="number" placeholder="Enter your net electricity charges from your bill"
                value={electricCharges}
                onChange={(e) => setElectricCharges(e.target.value)
                } />
              <label className="text-deep-purple text-sm" htmlFor="hint">Find this on your bill in the section of Bill Charges Breakdown. Don't include taxes, fuel adjustments or other charges.</label>
            </div>

            <div className="flex flex-col gap-1.5 p-4">
              <label className="text-darkest-purple text-xl" htmlFor="BillAmount">Number of units used</label>
              <input className="border-2 p-3 rounded-2xl border-mid-purple outline-deep-purple" type="number" placeholder="Enter the number of units used (kWh)"
                value={unit}
                onChange={(e) => {
                  setUnit(e.target.value);
                }
                } />
            </div>

            <div className="flex flex-col gap-1.5 p-4">
              <label className="text-darkest-purple text-xl" htmlFor="Category">Category</label>
              <select name="Category" className="p-3 border-2 rounded-2xl text-gray-500 border-mid-purple outline-deep-purple"
                value={category}
                onChange={(e) => setCategory(e.target.value)
                }>
                <option value="">Choose your category</option>
                <option value="lifeLine">Lifeline</option>
                <option value="protected">Protected</option>
                <option value="unProtected">UnProtected</option>
              </select>
              <label className="text-deep-purple text-sm" htmlFor="hint">Check your bill for the tariff category and select the one that matches</label>
            </div>

            <div className="flex flex-col gap-1.5 p-4">
              <label className="text-darkest-purple text-xl" htmlFor="tenure">Tenure</label>
              <select name="Tenure" className="p-3 border-2 rounded-2xl text-gray-500 border-mid-purple outline-deep-purple"
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
      </form>
    </div>
  )
}

export default Form