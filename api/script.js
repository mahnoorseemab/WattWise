import slabs from "../src/config/slabConfig.js"
import { findRate, compareAmount } from "../src/utils/calculateOverCharge.js"
import { GoogleGenAI } from '@google/genai';
import type { Interactions } from '@google/genai';


export default function handler(req, res) {
    console.log("handler hit")
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
    const rate = findRate(req.body.userUnits, req.body.userCategory)
    if (rate === undefined) {
        return res.status(400).json({ error: "Incorrect Data" })
    }
    const result = compareAmount(req.body.userUnits, req.body.userElectricCharges, rate)
    console.log("Result:", result)

    const scriptPrompt = `You are helping a residential electricity customer in Pakistan write a message to IESCO customer support. The customer compared their bill with an estimate calculated from official IESCO slab rates and found a difference. Write the message they will send or read out.

    FACTS (use only these; do not add or change any number):
    - Category: ${req.body.userCategory}
    - Customer tenure with IESCO: ${req.body.userCategory}
    - Units consumed this month: ${req.body.userUnits}
    - Rate per unit used in my estimate: Rs. ${rate}
    - My estimated electricity charges: Rs. ${result.estimatedAmount}
    - Electricity charges shown on my bill (net electricity charges): Rs. ${req.body.userElectricCharges}
    - Difference between billed charges and my estimate: Rs. ${result.difference}
    - Total bill amount including taxes and other items: Rs. ${req.body.totalAmount}

    RULES:
    1. Never claim or imply that I was overcharged, and never accuse IESCO of a mistake. I may have made an error in my own estimate.
    2. Politely ask IESCO for a detailed breakdown of how the electricity charges were calculated, so I can understand the difference and check whether I missed something.
    3. The comparison is only between the electricity charges and my estimate. The total bill includes taxes and other items that my estimate does not cover, so mention the total only as context.
    4. State the direction of the difference accurately (billed higher or lower than my estimate). If the difference is zero, say there is no difference and ask only for a confirmation of the breakdown.
    5. If a detail is not in the FACTS above (my name, consumer number, billing month), do not invent it. Leave a placeholder in square brackets such as [Your Name] or [Consumer Number].
    6. Do not mention any rates, taxes, laws or regulations that are not in the FACTS.

    STYLE:
    - Polite, professional and calm, in clear English.
    - Written so that it works both as an email body and as something said on a phone call.
    - Between 100 and 150 words. No subject line, no bullet points, no markdown.
    - Output only the message text, with no explanation before or after it.

    TONE EXAMPLE (for tone only; do NOT copy its wording or structure):
    "Dear IESCO Customer Support, I am writing about my electricity bill. I am not claiming that I have been overcharged, but I would like to understand how it was calculated so I can check whether I missed something in my own estimate."`

    return res.status(200).json({ message: "ok" })
}
