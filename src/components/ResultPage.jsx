import useResultStore from "../store/useResultStore"

const ResultPage = () => {

    let displayResult = useResultStore.getState().result
    console.log(displayResult)

    return (
        <div>ResultPage</div>
    )
}
export default ResultPage