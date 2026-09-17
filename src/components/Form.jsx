const Form = () => {
  return (
    <div className="bg-background h-screen font-sans">
      <div className="flex flex-col items-center">
        <h1 className="bg-gradient-to-r from-darkest-purple to-mid-purple bg-clip-text text-transparent font-bold text-4xl tracking-tighter">Check Your Bill!</h1>
        <p className="text-darker-purple ">Enter your bill details to know if  you're <br /> overpaying or already getting a fair rate.</p>
      </div>
      <div className="flex gap-4">
        Choose your bill Categories!
        <select>
          <option value="">Choose category</option>
          <option value="electricity">Electricity</option>
          <option value="gas">Gas</option>
          <option value="internet">Internet</option>
        </select>
      </div>
    </div>
  )
}

export default Form