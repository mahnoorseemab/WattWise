import useResultStore from "../store/useResultStore"
import { Link } from "react-router-dom"
import Arrow from "../assets/BackArrowIcon.svg"

const ResultPage = () => {
    let displayResult = useResultStore((state) => state.result)
    console.log(displayResult)

    let content;
    if (!displayResult) {
        content = (
            <p className="text-center text-sm text-gray-500">
                No result to show yet.
            </p>
        )
    }
    else {
        content = (
            <div className="flex w-full max-w-md flex-col gap-6">
                <div className="text-center">
                    <h1 className="text-3xl font-semibold text-darkest-purple">
                        Results
                    </h1>
                    <p className="mt-1 text-sm text-gray-600">
                        Estimate based on official IESCO rates
                    </p>
                </div>

                <div className="flex flex-col items-center gap-1 rounded-xl border border-purple-200 bg-white px-4 py-6 shadow-sm">
                    <span className="text-sm font-medium text-gray-600">
                        Difference
                    </span>
                    <span className="text-4xl font-bold text-deep-purple">
                        Rs. {displayResult.difference}
                    </span>
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <div className="flex flex-col gap-1 rounded-xl border border-purple-200 bg-white p-4">
                        <span className="text-xs text-gray-600">Your Electric Charges</span>
                        <span className="text-xl font-semibold text-deep-purple">
                            Rs. {displayResult.userElectricCharges}
                        </span>
                    </div>
                    <div className="flex flex-col gap-1 rounded-xl border border-purple-200 bg-white p-4">
                        <span className="text-xs text-gray-600">Estimated Amount</span>
                        <span className="text-xl font-semibold text-deep-purple">
                            Rs. {displayResult.estimatedAmount}
                        </span>
                    </div>
                    <div className="flex flex-col gap-1 rounded-xl border border-purple-200 bg-white p-4">
                        <span className="text-xs text-gray-600">Units Used</span>
                        <span className="text-xl font-semibold text-deep-purple">
                            {displayResult.userUnits} kWh
                        </span>
                    </div>
                    <div className="flex flex-col gap-1 rounded-xl border border-purple-200 bg-white p-4">
                        <span className="text-xs text-gray-600">Per Unit Rate</span>
                        <span className="text-xl font-semibold text-deep-purple">
                            Rs. {displayResult.perUnitRate}
                        </span>
                    </div>
                </div>
            </div>
        )
    }

    return (
        <div className="bg-background relative min-h-screen px-4 pb-16 pt-24">
            <Link to="/form" className="absolute left-[10%] top-8">
                <img src={Arrow} title="Back" alt="Back" />
            </Link>
            <div className="flex justify-center">
                {content}
            </div>
        </div>
    )
}
export default ResultPage