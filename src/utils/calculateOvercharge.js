import slabs from "../config/slabConfig";

let rate;

export function findRate(userUnit, userCategory) {
    let requiredSlab = slabs[userCategory]?.find((slabValue) => slabValue.lowerLimit <= userUnit && slabValue.upperLimit >= userUnit)
    rate = requiredSlab.rate
    console.log("rate:", rate)
    return rate
}

export function compareAmount(userUnit, userElectricCharges, rate) {
    console.log("units:", userUnit, "rate:", rate, "userElectricCharges:", userElectricCharges)
    let estimatedAmount;
    estimatedAmount = userUnit * rate
    let difference = userElectricCharges - estimatedAmount
    console.log("difference:", difference)
    return difference
}

