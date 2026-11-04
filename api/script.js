import slabs from "../src/config/slabConfig.js"

export default function handler(req, res) {
    console.log(req.body)
    console.log(typeof req.body.userUnits, typeof req.body.userElectricCharges, typeof req.body.totalAmount)
    if (typeof req.body.totalAmount !== "number" || req.body.totalAmount == Infinity || req.body.totalAmount == "" || req.body.totalAmount == null || req.body.totalAmount <= 0 || req.body.totalAmount == undefined) {
        return res.status(400).json({ error: "Incorrect Data" })
    }
    let unitsLimit = 5000
    if (typeof req.body.userUnits !== "number" || req.body.userUnits <= 0 || req.body.userUnits > unitsLimit || req.body.userUnits == "" || req.body.userUnits == null || req.body.userUnits == undefined) {
        return res.status(400).json({ error: "Incorrect Data" })
    }
    let rateLimit = slabs.unProtected[slabs.unProtected.length - 1].rate
    let chargesLimit = rateLimit * unitsLimit
    console.log(chargesLimit)
    if (typeof req.body.userElectricCharges !== "number" || req.body.userElectricCharges <= 0 || req.body.userElectricCharges > chargesLimit || req.body.userElectricCharges == "" || req.body.userElectricCharges == null || req.body.userElectricCharges == undefined) {
        return res.status(400).json({ error: "Incorrect Data" })
    }
    if (req.body.userCategory !== "protected" && req.body.userCategory !== "unProtected" && req.body.userCategory !== "lifeLine") {
        return res.status(400).json({ error: "Incorrect Data" })
    }
    return res.status(200).json({ message: "ok" })
}
