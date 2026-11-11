import slabs from "../src/config/slabConfig.js"
import { findRate, compareAmount } from "../src/utils/calculateOverCharge.js"
import { GoogleGenAI } from '@google/genai';

const ai = new GoogleGenAI({
    apiKey: process.env['GEMINI_API_KEY'],
});

const model = 'gemini-3.5-flash-lite'

const tenureLabels = {
    "less-than-1": "Less than 1 year",
    "1-5": "1 Year - 5 Year",
    "5-plus": "More than 5 years",
}

export default async function handler(req, res) {
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
    - Customer tenure with IESCO: ${tenureLabels[req.body.userTenure]} 
    - Units consumed this month: ${req.body.userUnits} 
    - Rate per unit used in my estimate: Rs. ${rate} 
    - My estimated electricity charges: Rs. ${result.estimatedAmount} 
    - Electricity charges shown on my bill (net electricity charges): Rs. ${req.body.userElectricCharges} 
    - Difference between billed charges and my estimate: Rs. ${result.difference} 
    - Total bill amount including taxes and other items: Rs. ${req.body.totalAmount} 

    RULES: 
    1. Never say or suggest that the bill is wrong, unfair or too high, and never accuse IESCO of a mistake. I may have made an error in my own estimate. 
    2. Politely ask IESCO for a detailed breakdown of how the electricity charges were calculated, so I can understand the difference. 
    3. The comparison is only between the electricity charges and my estimate. The total bill includes taxes and other items that my estimate does not cover, so mention the total only as context. 
    4. State the direction of the difference accurately (billed higher or lower than my estimate). If the difference is zero, say there is no difference and ask only for a confirmation of the breakdown. 
    5. If a detail is not in the FACTS above (my name, consumer number, billing month), do not invent it. Leave a placeholder in square brackets such as [Your Name] or [Consumer Number]. 
    6. Do not mention any rates, taxes, laws or regulations that are not in the FACTS. 
    7. Do not reuse any sentence or phrase from the tone example below. Write every sentence in your own words. 

    STYLE: 
    - Polite, professional and calm, in clear English. 
    - Written so that it works both as an email body and as something said on a phone call. 
    - Between 100 and 150 words. No subject line, no bullet points, no markdown.
    - Output only the message text, with no explanation before or after it. 

    TONE EXAMPLE (about a different topic on purpose; copy only its calm, humble tone): 

    "Dear Support Team, I hope you are well. I was going through my internet invoice and had a question about one of the lines. I may be reading it wrongly, so I would be grateful if you could walk me through it. Thank you for your time.`
    console.time("gemini")
    let finalScript
    try {
        finalScript = await ai.interactions.create({
            model, input: scriptPrompt, generation_config: {
                thinking_level: "low"
            }
        })
        console.log(finalScript)
    }
    catch (error) {
        console.log(error)
    }
    console.timeEnd("gemini")
    return res.status(200).json({ finalScript })
}
