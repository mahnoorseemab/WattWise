import slabs from "../config/slabConfig";


export function findRate(userUnit, userCategory) {
    let requiredSlab = slabs[userCategory]?.find((slabValue) => slabValue.lowerLimit <= userUnit && slabValue.upperLimit >= userUnit)
    console.log(requiredSlab)
    return requiredSlab

}