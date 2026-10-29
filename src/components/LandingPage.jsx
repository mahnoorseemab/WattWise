import { Link } from "react-router-dom"

const LandingPage = () => {
    return (
        <div className="bg-gradient-to-br from-mid-purple/50 via-white to-deep-purple/20 h-screen flex flex-col justify-center items-center px-4">
            <div className="font-sans font-bold text-3xl text-darkest-purple text-center">
                <span className="flex flex-col items-center gap-2">
                    <h1 className="text-xl md:text-2xl lg:text-3xl">Confused by your</h1>
                    <h1 className="bg-gradient-to-r from-darkest-purple to-mid-purple bg-clip-text text-transparent text-4xl md:text-5xl lg:text-6xl tracking-widest uppercase">
                        Electricity Bill?
                    </h1>
                </span>
            </div>

            <p className="text-darkest-purple text-lg md:text-xl mt-10 text-center">
                "Enter your <b>IESCO</b> bill details. We calculate it using official rates and <br />
                show you any difference, so you know what to ask the company
            </p>

            <div className="mt-6 flex justify-center">
                <p className="px-4 py-2 text-center text-sm text-gray-600 md:text-sm">
                    Estimate based on IESCO's official tariff rates. Works for IESCO bills only. <br /> (checked on 4th Oct 2026) <br /> Residential only!
                </p>
            </div>

            <Link to="/form" className="border-2 px-6 py-3 rounded-3xl cursor-pointer transition-all duration-200 ease-in-out active:scale-95 bg-darker-purple text-white text-md mt-10">
                View form
            </Link>
        </div>
    );
};

export default LandingPage;