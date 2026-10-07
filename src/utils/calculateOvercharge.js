import slabs from "../config/slabConfig";

export function findRate(userUnit, userCategory) {
    const matchingArray = Object.entries(slabs).find(([key, value]) => key === userCategory && value.lowerLimit <= userUnit && value.upperLimit >= userUnit)
    console.log(matchingArray)
}