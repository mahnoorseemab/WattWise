import useResultStore from "../store/useResultStore"
import { Link } from "react-router-dom"
import Arrow from "../assets/BackArrowIcon.svg"

const ResultPage = () => {
    let displayResult = useResultStore.getState().result
    console.log(displayResult)

    if (displayResult === null) {
        return (
            <>
                <div>no result</div>
            </>
        )
    }
    else {
        return (
            <>
            
                <Link to="/form">
                    <img src={Arrow} className="mt-8 absolute right-[230%]" title="Back" alt="Arrow" />
                </Link>
                <div>ResultPage</div>
                <div>UserElectricCharges: {displayResult.userElectricCharges}</div>
                <div>UserUnits: {displayResult.userUnits}</div>
                <div>EstimatedAmount: {displayResult.estimatedAmount}</div>
                <div>Difference: {displayResult.difference}</div>
                <div>PerUnitRate: {displayResult.perUnitRate}</div>
            </>
        )
    }
}
export default ResultPage