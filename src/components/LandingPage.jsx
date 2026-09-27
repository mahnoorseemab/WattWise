import { Link } from "react-router-dom"

const LandingPage = () => {
    return (
        <div className="bg-gradient-to-br from-mid-purple/50 via-white to-deep-purple/20 h-screen flex flex-col justify-center items-center px-4">
            <div className="font-sans font-bold text-3xl text-darkest-purple text-center">
                <span className="flex flex-col items-center">
                    <h1 className="text-xl md:text-2xl lg:text-3xl">Know If You Are Being</h1>
                    <h1 className="bg-gradient-to-r from-darkest-purple to-mid-purple bg-clip-text text-transparent text-4xl md:text-5xl lg:text-6xl tracking-widest uppercase">
                        Overcharged
                    </h1>
                    <h1 className="text-xl md:text-2xl lg:text-3xl">On Your</h1>
                    <h1 className="bg-gradient-to-r from-darkest-purple to-mid-purple bg-clip-text text-transparent text-4xl md:text-5xl lg:text-6xl tracking-widest uppercase">Electricity Bill</h1>
                    <h1 className="text-xl md:text-2xl lg:text-3xl"> Then</h1>
                    <h1 className="bg-gradient-to-r from-darkest-purple to-mid-purple bg-clip-text text-transparent text-4xl md:text-5xl lg:text-6xl tracking-widest uppercase">
                        Do Something
                    </h1>
                    <h1 className="text-xl md:text-2xl lg:text-3xl">About It</h1>
                </span>
            </div>

            <p className="text-darkest-purple text-lg md:text-xl mt-10 text-center">
                See how your electricity bills stack up, get a personalized script,
                <br className="hidden md:block" /> and practice the conversation before you make the call
            </p>

            <Link to="/form" className="border-2 px-6 py-3 rounded-3xl cursor-pointer transition-all duration-200 ease-in-out active:scale-95 bg-darker-purple text-white text-md mt-10">
                View form
            </Link>
        </div>
    );
};

export default LandingPage;