import useResultStore from "../store/useResultStore"
import { Link, useNavigate } from "react-router-dom"
import Arrow from "../assets/LeftArrow.svg"
import RightArrow from "../assets/RightArrow.svg"
import { useState } from "react"

const ResultPage = () => {

    const [errorMessage, setErrorMessage] = useState("")
    const [isLoading, setIsLoading] = useState(false)

    let displayResult = useResultStore((state) => state.result)
    let inputResult = useResultStore((state) => state.inputData)
    let sendScript = useResultStore((state) => state.setScript)
    let navigate = useNavigate()
    let content;
    let generateScript;
    let scriptData;

    if (!displayResult && !inputResult) {
        content = (
            <p className="text-center text-sm text-gray-500">
                No results to show yet.
            </p>
        )
    }
    else {
        scriptData = {
            totalAmount: inputResult.amount,
            userElectricCharges: displayResult.userElectricCharges,
            userUnits: displayResult.userUnits,
            perUnitRate: displayResult.perUnitRate,
            userCategory: inputResult.category,
            userTenure: inputResult.tenure,
            difference: displayResult.difference,
            estimatedAmount: displayResult.estimatedAmount
        }
        console.log(scriptData)

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
                        <span className="text-xs text-gray-600">User Electric Charges</span>
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

        async function sendScriptData(scriptData) {
            setIsLoading(true)
            try {

                console.log("Scriptdata:", scriptData)
                const response = await fetch("/api/script", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(scriptData)//convert obj into JSON Text
                })
                if (response.ok) {
                    const scriptContent = await response.json()//convert JSON Text into obj
                    const getScriptContent = scriptContent.script
                    sendScript(getScriptContent)
                    navigate("/scriptPage")
                } else if (response.status === 400) {
                    setErrorMessage("Data is not correct, please recheck your data")
                } else if (response.status === 429) {
                    setErrorMessage("Too many requests right now. Please try again in a few minutes.")
                } else if (response.status === 503) {
                    setErrorMessage("The AI service is busy. Please try again in a minute.")
                } else if (response.status === 500) {
                    setErrorMessage("Something went wrong. Please try again later")
                }
            } finally {
                setIsLoading(false)
            }
        }
        {
            if (displayResult.difference > 0) {
                generateScript = (
                    <button
                        className="mt-6 inline-flex cursor-pointer items-center justify-center gap-2 rounded-3xl bg-darker-purple px-6 py-3 text-lg text-white transition-all duration-200 ease-in-out enabled:active:scale-95 disabled:cursor-not-allowed disabled:opacity-80"
                        disabled={isLoading}
                        aria-busy={isLoading}
                        onClick={() => {
                            sendScriptData(scriptData)
                        }}
                    >
                        {isLoading ? (
                            <>
                                <span className="h-5 w-5 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                                Generating...
                            </>
                        ) : (
                            <>
                                Generate Script
                                <img src={RightArrow} className="animate-pulse h-10 w-10" alt="" />
                            </>
                        )}
                    </button>
                )
            }
            else if (displayResult.difference <= 0) {
                generateScript = (
                    <div className="mt-3 text-gray-600 text-sm">
                        No script is needed here because your charges are not higher than the estimated amount.
                    </div>
                )
            }
        }
    }

    return (
        <div className="bg-background relative min-h-screen px-4 pb-16 pt-24">
            <Link to="/form" className="absolute left-[10%] top-8">
                <img src={Arrow} title="Back" alt="Back" />
            </Link>
            <div className="flex justify-center">
                {content}
            </div>
            <div className="flex justify-center items-center">
                {generateScript}
            </div>
            {errorMessage && (
                <div
                    className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4"
                    role="dialog"
                    aria-modal="true"
                >
                    <div className="w-full max-w-sm rounded-2xl border border-purple-200 bg-white p-6 shadow-xl">
                        <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-purple-100 text-2xl font-bold text-darker-purple">
                            !
                        </div>
                        <h2 className="text-center text-lg font-semibold text-darkest-purple">
                            Something went wrong
                        </h2>
                        <p className="mt-2 text-center text-sm text-gray-600">
                            {errorMessage}
                        </p>
                        <button
                            className="mx-auto mt-6 block cursor-pointer rounded-3xl bg-darker-purple px-6 py-2 text-sm text-white transition-all duration-200 ease-in-out active:scale-95"
                            onClick={() => setErrorMessage("")}
                        >
                            Got it
                        </button>
                    </div>
                </div>
            )}
        </div>
    )
}
export default ResultPage