import useResultStore from "../store/useResultStore"
import { Link } from "react-router-dom"
import Arrow from "../assets/BackArrowIcon.svg"

const ResultPage = () => {
    let displayResult = useResultStore.getState().result
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
                    <h1 className="text-lg font-semibold text-darker-purple">
                        Bill Check Results
                    </h1>
                    <p className="mt-1 text-xs text-gray-500">
                        Estimate based on official IESCO rates
                    </p>
                </div>

                <div className="flex flex-col items-center gap-1 rounded-xl border border-purple-200 bg-white px-4 py-6 shadow-sm">
                    <span className="text-sm font-medium text-gray-500">
                        Difference
                    </span>
                    <span className="text-4xl font-bold text-deep-purple">
                        Rs. {displayResult.difference}
                    </span>
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <div className="flex flex-col gap-1 rounded-lg border border-purple-200 bg-white p-4">
                        <span className="text-xs text-gray-500">Your Electric Charges</span>
                        <span className="text-base font-semibold text-gray-900">
                            Rs. {displayResult.userElectricCharges}
                        </span>
                    </div>
                    <div className="flex flex-col gap-1 rounded-lg border border-purple-200 bg-white p-4">
                        <span className="text-xs text-gray-500">Estimated Amount</span>
                        <span className="text-base font-semibold text-gray-900">
                            Rs. {displayResult.estimatedAmount}
                        </span>
                    </div>
                    <div className="flex flex-col gap-1 rounded-lg border border-purple-200 bg-white p-4">
                        <span className="text-xs text-gray-500">Units Used</span>
                        <span className="text-base font-semibold text-gray-900">
                            {displayResult.userUnits} kWh
                        </span>
                    </div>
                    <div className="flex flex-col gap-1 rounded-lg border border-purple-200 bg-white p-4">
                        <span className="text-xs text-gray-500">Per Unit Rate</span>
                        <span className="text-base font-semibold text-gray-900">
                            Rs. {displayResult.perUnitRate}
                        </span>
                    </div>
                </div>
            </div>
        )
    }

    return (
        <div className="relative min-h-screen px-4 pb-16 pt-24">
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