import slabs from "../config/slabConfig";


export function findRate(userUnit, userCategory) {
    let requiredSlab = slabs[userCategory]?.find((slabValue) => slabValue.lowerLimit <= userUnit && slabValue.upperLimit >= userUnit)
    let rate = requiredSlab.rate
    let estimatedAmount;
    estimatedAmount = userUnit * rate
    console.log(estimatedAmount)
    return estimatedAmount
}

// export function calculateEstimatedAmount(userUnit , rate) {
//   let estimatedAmount;
//   estimatedAmount = userUnit * rate
//   console.log(estimatedAmount)
// }

