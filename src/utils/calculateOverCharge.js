import slabs from "../config/slabConfig.js";

let rate;
export function findRate(userUnit, userCategory) {
    let requiredSlab = slabs[userCategory]?.find((slabValue) => slabValue.lowerLimit <= userUnit && slabValue.upperLimit >= userUnit)
    rate = requiredSlab?.rate
    return rate
}

export function compareAmount(userUnit, userElectricCharges, rate) {
    let rawEstimatedAmount = userUnit * rate
    let estimatedAmount = Math.round(rawEstimatedAmount * 100) / 100 //to roundoff the numbers
    let rawDifference = userElectricCharges - rawEstimatedAmount
    let difference = Math.round(rawDifference * 100) / 100


    return {
        userElectricCharges: userElectricCharges,
        userUnits: userUnit,
        perUnitRate: rate,
        estimatedAmount: estimatedAmount,
        difference: difference
    }
}

