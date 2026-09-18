const Form = () => {
  return (
    <div className="bg-background h-screen font-sans">
      <div className="flex flex-col items-center ">
        <h1 className="bg-gradient-to-r from-darkest-purple to-mid-purple bg-clip-text text-transparent font-bold text-4xl tracking-tighter mt-10">Check Your Electricity Bill!</h1>
        <p className="text-darker-purple">Enter your electricity bill details to know if <br /> you're overpaying or already getting a fair rate.</p>
      </div>

      <div className="flex items-center justify-center m-4">
        <div className="flex flex-col border-2 w-[50vw]">
          <div className="flex flex-col p-4">
            <label htmlFor="BillAmount">Amount of Bill</label>
            <input className="border-2 p-2" type="number" placeholder="Enter the amount of your bill" />
          </div>

          <div className="flex flex-col p-4">
            <label htmlFor="BillAmount">Number of units used</label>
            <input className="border-2 p-2" type="number" placeholder="Enter the number of units used(kWh)" />
          </div>

          <div className="flex flex-col p-4">
            <label htmlFor="BillAmount">Tenure</label>
            <select name="Tenure" className="p-2">
              <option value="">Choose your tenure</option>
              <option value="less-then-1">Less then 1 year</option>
              <option value="1-5">1 Year - 5 Years</option>
              <option value="5 plus">More than 5 years</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Form