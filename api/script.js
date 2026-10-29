export default function handler(req, res) {
    console.log(req.body)
    if (req.body.totalAmount == isNaN || req.body.totalAmount == Infinity || req.body.totalAmount == "" || req.body.totalAmount == null || req.body.totalAmount <= 0 || req.body.totalAmount == undefined) {
        return res.status(400).json({ error: "Data is incorrect" })
    }
    
}
