import slabs from "../config/slabConfig.js";

let rate;
export function findRate(userUnit, userCategory) {
    let requiredSlab = slabs[userCategory]?.find((slabValue) => slabValue.lowerLimit <= userUnit && slabValue.upperLimit >= userUnit)
    rate = requiredSlab?.rate
    return rate
}

export function compareAmount(userUnit, userElectricCharges, rate) {
    let estimatedAmount = userUnit * rate
    let difference = userElectricCharges - estimatedAmount
    return {
        userElectricCharges: userElectricCharges,
        userUnits: userUnit,
        perUnitRate: rate,
        estimatedAmount: estimatedAmount,
        difference: difference
    }
}

