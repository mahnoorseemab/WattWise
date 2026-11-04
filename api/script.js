import slabs from "../src/config/slabConfig.js"

export default function handler(req, res) {
    const unitsLimit = 5000
    const rateLimit = slabs.unProtected[slabs.unProtected.length - 1].rate
    const chargesLimit = rateLimit * unitsLimit
    const totalLimit = chargesLimit * 1.35
    if (typeof req.body.totalAmount !== "number" || req.body.totalAmount <= 0 || req.body.totalAmount > totalLimit) {
        return res.status(400).json({ error: "Incorrect Data" })
    }
    if (typeof req.body.userUnits !== "number" || req.body.userUnits <= 0 || req.body.userUnits > unitsLimit) {
        return res.status(400).json({ error: "Incorrect Data" })
    }
    if (typeof req.body.userElectricCharges !== "number" || req.body.userElectricCharges <= 0 || req.body.userElectricCharges > chargesLimit) {
        return res.status(400).json({ error: "Incorrect Data" })
    }
    if (req.body.userCategory !== "protected" && req.body.userCategory !== "unProtected" && req.body.userCategory !== "lifeLine") {
        return res.status(400).json({ error: "Incorrect Data" })
    }
    if (req.body.userTenure !== "less-than-1" && req.body.userTenure !== "1-5" && req.body.userTenure !== "5-plus") {
        return res.status(400).json({ error: "Incorrect Data" })
    }
    return res.status(200).json({ message: "ok" })
}
