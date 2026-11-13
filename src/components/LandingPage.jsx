import { Link } from "react-router-dom"

const LandingPage = () => {
    return (
        <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-mid-purple/50 via-white to-deep-purple/20 flex flex-col justify-center items-center px-4 py-12">
            {/* Decorative blurred shapes */}
            <div aria-hidden="true" className="pointer-events-none absolute -top-24 -left-24 h-72 w-72 rounded-full bg-mid-purple/30 blur-3xl" />
            <div aria-hidden="true" className="pointer-events-none absolute -bottom-24 -right-24 h-80 w-80 rounded-full bg-deep-purple/20 blur-3xl" />

            <div className="relative z-10 flex flex-col items-center text-center max-w-2xl">
                <span className="mb-6 rounded-full border border-mid-purple/40 bg-white/60 px-4 py-1.5 text-xs font-semibold tracking-wide text-darkest-purple backdrop-blur-sm">
                    IESCO Bill Checker
                </span>

                <h1 className="font-sans font-bold text-darkest-purple text-xl md:text-2xl lg:text-3xl">
                    Confused about your
                </h1>
                <h1 className="mt-2 font-sans font-extrabold uppercase tracking-widest text-4xl md:text-5xl lg:text-6xl bg-gradient-to-r from-darkest-purple to-mid-purple bg-clip-text text-transparent">
                    Electricity Bill?
                </h1>

                <p className="mt-8 max-w-xl text-darkest-purple/80 text-base md:text-lg leading-relaxed">
                    Enter your <b>IESCO</b> bill details. We calculate it using official rates and
                    show you any difference, so you know what to ask the company.
                </p>

                <Link
                    to="/form"
                    className="group mt-10 inline-flex items-center gap-2 rounded-3xl bg-darker-purple px-8 py-3.5 text-white font-medium shadow-lg shadow-deep-purple/30 transition-all duration-200 ease-in-out hover:-translate-y-0.5 hover:shadow-xl active:scale-95"
                >
                    View form
                    <span className="transition-transform duration-200 group-hover:translate-x-1">→</span>
                </Link>

                <ul className="mt-10 flex flex-wrap justify-center gap-2 text-xs text-gray-600">
                    <li className="rounded-full bg-white/70 px-3 py-1.5 backdrop-blur-sm">IESCO bills only</li>
                    <li className="rounded-full bg-white/70 px-3 py-1.5 backdrop-blur-sm">Residential only</li>
                    <li className="rounded-full bg-white/70 px-3 py-1.5 backdrop-blur-sm">Rates checked on 4th Oct 2026</li>
                </ul>
                <p className="mt-3 text-xs text-gray-500">
                    This is an estimate based on IESCO's official tariff rates.
                </p>
            </div>
        </div>
    );
};

export default LandingPage;