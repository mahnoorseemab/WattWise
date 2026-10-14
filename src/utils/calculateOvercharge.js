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
    let estimatedAmount = userUnit * rate
    let difference = userElectricCharges - estimatedAmount
    console.log("userElectricCharges:", userElectricCharges, "estimatedAmount:", estimatedAmount, "difference:", difference)
    return {
        userElectricCharges: userElectricCharges,
        userUnits: userUnit,
        perUnitRate: rate,
        estimatedAmount: estimatedAmount,
        difference: difference
    }
}

