# 🗒️ VAPI.ai Implementation Notes — “Vanessa” Voice AI Assistant

These are my personal setup notes and comments on what I configured inside **Vapi.ai** to connect the assistant with my Node.js backend.

---

## 🔹 Assistant Creation

**Assistant Name:** Vanessa  
**Goal:** Outbound real estate acquisitions caller that identifies if a homeowner is open to selling.

**Model Used:** GPT-4o Cluster (OpenAI provider)  
**Voice Used:** Paige (friendly, clear, natural tone)

**Assistant Behavior:**
- Speaks first with a short, conversational intro:
  > “Hi, is this the homeowner? I’m Vanessa with Abhash Homebuyers. We’re buying in your area — if the price made sense, would you consider an offer?”
- Keeps tone natural and concise (under ~90s per call)
- Focused on collecting seller intent, not closing the deal

---

## 🔹 Conversation Flow Comments

**Stage 1: Introduction**  
Greets and confirms homeowner identity.

**Stage 2: Qualification Questions**
1. Are they open to selling?  
2. If yes — approximate price range?  
3. When are they thinking of selling?  
4. Condition of the property?

**Stage 3: Outcome Branches**
- **Qualified:** Transfer to acquisitions lead.  
- **Not Interested / DNC:** Ends call politely.  
- **Callback:** Marks as callback.

**Notes:**  
I tried to make Vanessa sound human — short sentences, small pauses, and acknowledging user responses.

---

## 🔹 Webhook Integration

**Webhook Purpose:**  
Send call summaries to my Express.js backend to log in the dashboard.

**Endpoint Used:**  
```
https://<my-ngrok-subdomain>.ngrok-free.app/vapi-hook
```

**Method:** POST  
**Format:** JSON  
**When Triggered:** End of call (or when conversation completes)

**Example Body Sent:**
```json
{
  "callId": "{{call.id}}",
  "toNumber": "{{call.toNumber}}",
  "fromNumber": "{{call.fromNumber}}",
  "summary": {
    "owner_confirmed": true,
    "openness": "yes",
    "price_range": "$380k-$420k",
    "timing": "1-3 months",
    "condition": "good",
    "notes": "wants to sell after holidays",
    "disposition": "qualified"
  }
}
```

---

## 🔹 Structured Outputs Setup

Added structured fields in **Vapi.ai → Structured Outputs** to standardize the webhook summary.

| Field | Type | Description |
|-------|------|--------------|
| `owner_confirmed` | boolean | Whether caller is the owner |
| `openness` | enum | yes / maybe / no |
| `price_range` | string | Seller’s quoted or estimated price |
| `timing` | enum | now / 1–3m / 3–6m / 6m+ |
| `condition` | enum | good / needs work / major repairs / unknown |
| `notes` | string | Free-form notes on call |
| `disposition` | enum | qualified / not_interested / callback / dnc |

---

## 🔹 Phone Number Setup

- Purchased / assigned a dedicated **Vapi phone number** (U.S. region)
- Set outbound caller ID to that number
- Connected it to the **Vanessa assistant**
- Verified outbound calls are routed through Vapi’s telephony system

---

## 🔹 Testing Comments

- Performed 3 live test calls:
  1. **Qualified Seller** — Vanessa captured info and logged summary  
  2. **Not Interested** — Call ended politely  
  3. **Callback** — Properly noted disposition
- Confirmed JSON appeared in the server console logs
- Dashboard refreshed automatically showing call data

---

## 🔹 Additional Notes

- Used **ngrok** to expose localhost so Vapi could reach the backend webhook.  
- `server.js` handles `/vapi-hook` and updates a live table at `/dashboard`.  
- All configuration was done inside **Vapi.ai’s dashboard** — no extra code needed in the assistant beyond system instructions.

---

✅ **Result:**  
A functional **Voice AI Acquisitions Assistant** that autonomously handles outbound calls, detects intent, and logs leads into a Node.js dashboard in real time.
