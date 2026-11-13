# ⚡ WattWise

**Confused by your electricity bill?** WattWise estimates your IESCO bill from the official tariff rates, shows the difference from what you were charged, and writes a short, polite script you can use to ask the company for a breakdown.

**Live Link:** https://watt-wise-woad.vercel.app/

> WattWise gives an **estimate**, not a verdict. It never claims you were overcharged. It tells you the difference and helps you ask the right question.

---

## Why I built it

My own household pays electricity bills without checking them. Wrong readings, wrong categories and slab-crossing errors are a known problem in Pakistan, and most people have no easy way to check. WattWise is built around three ideas: **AI integration, saving the user's time, saving the user's money.**

---

## What it does

1. The user enters five details from their IESCO bill.
2. The app finds the right slab and rate, and calculates the expected charges.
3. The result page shows the estimate, the user's Electric Charges, the per-unit rate and the difference.
4. If the difference is above zero, the user can generate an AI-written script (call or WhatsApp) asking the company to explain how the charges were calculated.
5. The script has a Copy button, so it can be pasted into a message or email.

If the estimate is equal to or higher than the user's charges, no AI button is shown. The page only states the two numbers, with no conclusion.

---

## Tech stack

| Layer | Choice |
|---|---|
| UI | React, Vite, Tailwind CSS v4 |
| Routing | react-router-dom |
| State Management | Zustand (with `persist`, sessionStorage) |
| Backend | One Vercel serverless function (`api/script.js`) |
| AI | Gemini free tier via `@google/genai`, model `gemini-3.5-flash-lite`, `ai.interactions.create` |
| Hosting | Vercel (Hobby plan), auto-deploy from GitHub `main` |

No database. The API key lives only on the server.

---

## Project structure

```
api/
  script.js              # serverless function: validates, recomputes numbers, calls Gemini
src/
  components/
    LandingPage.jsx
    Form.jsx
    ResultPage.jsx
    ScriptPage.jsx
  config/
    slabConfig.js        # all tariff rates
  utils/
    calculateOverCharge.js   # findRate + compare logic
  store/
    useResultStore.js    # Zustand store (result + script)
```

Rule I followed: **no hardcoded rates in logic.** Rates live in config, logic reads from config.

---

## Rates used

Source: IESCO official tariff guide, SRO 279(I)/2026 (12 Feb 2026). Checked on 4 Oct 2026. Verified for **IESCO only**, residential only.

| Category | Units | Rate (Rs/unit) |
|---|---|---|
| Lifeline | 1–50 | 3.95 |
| Lifeline | 51–100 | 7.74 |
| Protected | 1–100 | 10.54 |
| Protected | 101–200 | 13.01 |
| Unprotected | 1–100 | 22.44 |
| Unprotected | 101–200 | 28.91 |
| Unprotected | 201–300 | 33.10 |
| Unprotected | 301–400 | 36.46 |
| Unprotected | 401–500 | 38.95 |
| Unprotected | 501–600 | 40.22 |
| Unprotected | 601–700 | 41.85 |
| Unprotected | 700+ | 47.20 |

**Calculation (v1):** the category picks the slab list, the units pick the slab, and `estimate = units × rate of the landing slab` (all units billed at that one rate, not slab by slab). If no slab matches, `findRate` returns a clear "not found" instead of guessing a rate.

---

## Decisions and why

The coding was the easy part. The hard part was deciding what to build, what to leave out, and what to trust. Here is every major decision, with the reason.

### Product and scope

- **Electricity only (not gas and internet).** I started with three categories and cut to one for the MVP. *Why:* depth and polish beat three half-working categories. Gas, internet and the undercharge case are on the roadmap.
- **IESCO only, residential only.** *Why:* IESCO's tariff page is the source I could verify. I could not find commercial or industrial tariffs and did not want to spend time on unverified numbers. The UI says "IESCO bills only".
- **"Estimate and difference", never "overcharge".** *Why:* after testing on real bills, I realised I cannot prove an overcharge while my formula is unconfirmed. The landing page, form text and script prompt all use neutral wording. Even the AI prompt rules forbid the word "overcharged".
- **Landing headline simplified.** Two friends found the original 7-line headline hard to read, so I shortened it and used plain wording. *Why:* if a friend with bill knowledge struggles, a normal user will too.
- **The "Verified for IESCO" badge became "Estimate based on IESCO's official tariff rates (checked 4 Oct 2026)".** *Why:* "verified" is a claim I cannot fully back up. A dated note is honest.

### Form and calculation

- **Five fields:** Total Amount of Bill, Electric Charges, Units, Category, Tenure. Labels match the wording on the real bill. *Why:* users should find each value without guessing.
- **Category dropdown was removed once, then brought back.** *Why:* the NEPRA rate structure depends on category, so the calculation cannot work without it.
- **Tenure is not used in the calculation.** It only goes into the AI prompt as context. *Why:* it does not change the rate, but it helps the script tone.
- **Form state is the string the user typed; `Number()` is applied at submit time.** *Why:* `e.target.value` is always a string, and storing `Number()` directly made an empty field become `0` (an undeletable zero, "05"). I convert at calculation time, after an empty-field check.
- **Fixed charges are excluded in v1.** I briefly decided to add them, then went back. *Why:* sanctioned load is not a form field, and adding it grows the scope. It is listed as a limitation and a v2 item.
- **Rounding: `Math.round(x * 100) / 100`, numbers not strings, rounded once at the end.** *Why:* `toFixed` returns a string, and one object with a string and a number causes confusion later. Calculating from raw values and rounding only once stops rounding errors from stacking. Rounding lives in `calculateOverCharge.js` because the result page and the script both read from there (single source of truth).

### Validation (server is the safety net)

- **The server recomputes the rate, estimate and difference itself.** It imports `findRate` and the compare function instead of copying the formula. *Why:* I tested that Zustand/sessionStorage values can be edited in the browser, so anything the client sends cannot be trusted. The server only trusts the validated raw inputs.
- **Client validation is for user experience; server validation is for security.** The server never trusts the client.
- **Limits are derived from config, not hardcoded.**
  - Units: **1 to 5000** per month. *Why:* a large house with many ACs could use 2,500 units, so I wanted headroom while rejecting junk values.
  - Charges limit = max units × top slab rate (5000 × 47.20 = Rs 236,000). *Why:* if the tariff changes, I update `slabConfig.js` and the limits follow.
  - Total bill limit = charges limit + 35% (Rs 318,600). *Why:* the total always includes taxes and FPA. In my own bills, taxes were about 19.5% of net charges and total extras about 21.8%, so 35% leaves a buffer so no real user is rejected. (This margin comes from only 3 bills of one household.)
- **All limits sit in named variables, computed in one place.** *Why:* a change needs editing at only one point.
- **Category is checked against three written names (`unProtected`, `protected`, `lifeLine`).** I considered `Object.keys(slabs).includes()` but chose the plain version. *Why:* the category names rarely change and spelling them out is easier to read.
- **Tenure options stay hardcoded in both Form and server.** A shared config file was planned, then dropped. *Why:* there are only three options that rarely change. A long list would justify a config file.
- **Charges use net electricity charges (after subsidies).** *Why:* that is the amount the rates should be compared against.

### AI

- **My code does all the math; the AI only writes the script.** *Why:* language models can get arithmetic wrong, and users need numbers they can trust.
- **AI script instead of a template.** I considered a template, even agreed it could replace the AI, then decided to keep the AI. *Why:* the tone adapts to each user, and I wanted a real AI-integrated project where I can discuss cost, latency and quota.
- **Single call, not a chat coach.** I first planned a negotiation chat coach. I dropped it. *Why:* the free tier limits tokens, and since the app makes no overcharge claim, the coach (which was only needed for overcharge negotiation) is no longer needed.
- **Script structure:** total bill, estimate from official rates, difference, then a polite request for a breakdown. If the breakdown explains the difference, the user stops. If not, the user asks politely for clarification.
- **Gemini free tier, key server-side only.** Env var is `GEMINI_API_KEY` (no `VITE_` prefix). *Why:* `VITE_` variables get bundled into the browser. A serverless function keeps the key private.
- **Model `gemini-3.5-flash-lite`, chosen by measuring.** `gemini-3.8-flash` took over 4 minutes on my account (and gave a 503 "high demand" error). I tested one cause at a time: thinking level, prompt length, API type, model-name prefix and Node networking. None of those was the cause, and switching to the lite model brought it to about 1.5 seconds. Script quality came from fixing the prompt, not from using a bigger model.
- **`ai.interactions.create` instead of `generateContent`.** *Why:* it is Google's recommended newer API, and a future chat feature could keep history on Google's side. Trade-off: the response shape is unusual, so the text is in `output_text`.
- **The server sends only the script text to the browser, not the full Gemini object.** *Why:* the browser needs only the script. Token counts and internal ids should not leak.
- **Prompt fixes found by testing:** one line used the category instead of the tenure; raw values like `5-plus` were reaching the prompt (fixed with a label mapping object inside `script.js`); the word "overcharged" was removed; the tone example is from a different topic, with a rule not to reuse its wording.
- **Labels live in two places (Form and server).** *Why:* the lists are short, so the small cost is outweighed by keeping things simple.
- **No per-user generation limit.** Users can generate as often as Gemini's free tier allows. When the limit is hit, the app shows a "try again later" message. *Why:* a cap of about 10 per day was considered, but a limit adds more code and the free tier already enforces its own.

### State and routing

- **Zustand for data shared between pages.** It was first "not applied", then adopted. *Why:* this is the project where I learned Zustand, and the form, result page and script page all need the same data.
- **`persist` with sessionStorage, for the result and the script only.** *Why:* a refresh should not lose the result or force a second Gemini call (about 3 seconds plus quota). Form inputs are not persisted, which is fine for now.
- **The script is saved to the store before navigating to the script page (not passed via navigate state).** *Why:* it survives a reload.
- **The AI call happens only when the user clicks Generate Script, never on page load.** *Why:* free-tier quota.
- **Store naming:** value `script` with setter `setScript` (set + same name). Other setters are still to be renamed.

### Error handling and UX

- **One popup and one state (`errorMessage`), with hardcoded messages per status (400, 429, 503, 500).** *Why:* the server's `error` text is written for developers, users need to know what to do next, and the UI should not break if the server text changes.
- **Network failure is handled separately with `try/catch`:** "Could not reach the server. Please check your connection and try again." *Why:* `response.ok` and a thrown `fetch` are two different layers. A server reply with an error status does not throw, and a dead connection does.
- **Loading state:** the button is disabled and shows a spinner with "Generating...", reset in `finally`. *Why:* response time varies, and `finally` always runs, whether the call succeeds or fails.
- **"Copied!" is shown only after `navigator.clipboard.writeText` succeeds.** *Why:* it returns a promise, and showing "Copied" before success would give a false confirmation. The button exists because phones have no Ctrl+C.
- **Form: one message "Please fill in all fields" under Submit.** *Why:* with five fields, the user can easily see which one is empty.
- **Client range checks and per-field red errors were postponed until after launch.** I first skipped them, then drafted them, then decided to leave them. *Why:* keep shipping. The server's 400 validation is the safety net.
- **Console logs cleaned before deploy.** Only one labelled `console.error` remains in the `catch` of `api/script.js`. *Why:* logs on Vercel are stored, and the prompt logs held user bill data. The one `console.error` stays because after deploy it is the only way to see why a user got a 500. The popup shows only which status branch ran.

### Deployment and security

- **Vercel serverless function + GitHub auto-deploy.** Every push to `main` goes to production. Env var `GEMINI_API_KEY` is set in Vercel (Production).
- **`.env` and `.vercel` are gitignored.**
- **Function time limit checked in the Vercel docs:** Hobby plan allows 300 seconds default and max, so even the slowest run I saw locally (about 13 to 15 seconds) cannot hit it.
- **Case-sensitive filenames.** I renamed `calculateOvercharge.js` to `calculateOverCharge.js` (capital C). Windows ignores case, but git, TypeScript and Linux (Vercel) do not. *Fix:* two `git mv` steps (via a temp name), then reload the editor. Without this, the Vercel build would have broken.

---

## Testing against real bills

I compared the app's estimate with my household's real IESCO bills (all unprotected, 199 to 233 units, 1 kW sanctioned load).

- The difference between the estimate and the billed Electric Charges ranged from roughly **Rs 500 to Rs 1,700**, and it was **not consistent** between bills, even between bills with similar units.
- Adding the fixed charge (Rs 350 on these bills) reduced the gap but did not remove it. On one bill it went from Rs 634.2 to Rs 284.2.
- I could not find the cause of the remaining gap. Possible factors (not verified) are the exact slab method, readings and billing days.
- **Decision:** the unexplained gap is listed as a limitation instead of blocking v1. That is exactly why the app says "estimate" and the script asks for a breakdown instead of accusing the company.

---

## Limitations

**Known issues**
- **Out-of-range units show "Rs. NaN" on the result page.** Negative units (or any value matching no slab) make `findRate` return `undefined`, so the calculation becomes `NaN`. The client has no range check yet. This was reproduced in the browser (`-176` units).
- Estimates exclude **fixed charges** (Rs per kW per month), taxes and FPA.
- The estimate can differ from the billed Electric Charges for reasons I could not fully identify (see above).
- Response time varies. Locally it ranged from under 1 second to 15 seconds. One live run on Vercel took 2 to 3 seconds. This is not a performance guarantee.

**Not verified yet**
- The server returning **400 for negative units** (`-5`) when called directly (for example with curl).
- **Protected category with 250 units** (no matching slab) returning a clean 400 without crashing.
- The 400, 429 and 503 popups were not each triggered individually in the browser. The 500 popup and the network-failure popup were.
- How protected consumers who cross the limit are billed, and the protected "6 months" rule.

**Scope and trust**
- Verified for **IESCO only**; other DISCOs were not checked. Residential only.
- Rates are a snapshot (checked 4 Oct 2026). If IESCO changes tariffs, `slabConfig.js` must be updated.
- A user can enter **realistic but false** values (for example the wrong category). The server can reject invalid values but cannot know the truth.
- Slab-jump method was tested on a small set of real bills. Protected and lifeline categories are lightly tested because everyone around me is unprotected.
- The 35% total-bill margin comes from only 3 bills of one household.
- Free-tier content may be used by Google, and the bill numbers are sent in the prompt. Whether the interactions API stores data on Google's side was not verified. The Gemini free-tier quota limits can change.

---

## Roadmap

1. Client range checks and per-field red error messages (limits from `slabConfig`)
2. Handle `findRate` returning `undefined` so the user never sees NaN
3. Verify the two server edge cases above with curl
4. UI polish, fixed 2-decimal display for rupee amounts
5. Fixed charges (needs sanctioned load as an input)
6. Decide whether to persist form inputs; rename the remaining store setters
7. Check the real quota numbers on the AI Studio rate-limit page
8. Investigate the Vite WebSocket console errors (port mismatch seen with `vercel dev`)
9. Other DISCOs, then gas and internet
10. Convert the project to **TypeScript**

---

## What I learned

- **Coding was easy; decisions were hard.** Scope, trade-offs, edge cases and "what do I trust?" took most of the time.
- **Measure, don't guess.** The slow-model problem went away only after I tested one suspect at a time.
- `response.ok` (server replied with an error) and `catch` (the request itself failed) are two different layers.
- `toFixed` returns a string; floats like `0.1` do not fit binary exactly; round once, at the end.
- Client validation is user experience. Server validation is security.
- A blocked 400 does not reject `fetch`; `NaN` becomes `null` in `JSON.stringify`; `x == isNaN` never rejects anything.
- Case-only file renames break Linux builds.
- Never put secrets in screenshots. I rotated my Gemini key after one leaked.

---

## Run locally

```bash
npm install
```

Create a `.env` file in the project root:

```
GEMINI_API_KEY=your_key_here
```

Run with the Vercel CLI, not `npm run dev` (Vite alone does not serve the `api/` folder):

```bash
vercel dev
```

The app runs at `http://localhost:3000`. After changing `.env`, restart `vercel dev`.
