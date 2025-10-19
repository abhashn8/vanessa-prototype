Vanessa — Voice AI Acquisitions Assistant (Vapi.ai + Node.js)

A small working prototype of a Voice AI acquisitions agent that:

Connects to a dialer (Vapi.ai)

Makes outbound calls

Detects seller intent in ~90s

Asks about price, timing, condition, openness

Transfers qualified leads or ends gracefully

Logs results to a live dashboard

🔗 Repo: https://github.com/abhashn8/vanessa-prototype

🧰 Tech Stack

Vapi.ai — Voice + AI + Telephony

Node.js / Express — Webhook + Dashboard

ngrok — Expose localhost

🚀 Quick Start
# Clone the repo
git clone https://github.com/abhashn8/vanessa-prototype
cd vanessa-prototype

# Install dependencies
npm install

# Start the server
node server.js


Then open your browser at:

http://localhost:3000/dashboard


Expose your local server using ngrok:

npx ngrok http 3000


Copy the HTTPS URL from ngrok and paste it into Vapi.ai → Server URL field:

https://<your-ngrok-subdomain>.ngrok-free.app/vapi-hook

🎯 Vapi.ai Setup Summary
1️⃣ Assistant: “Vanessa”

Created a custom Voice AI assistant in Vapi.ai named Vanessa, acting as a warm and confident real estate acquisitions agent for outbound seller qualification.

Model & Voice

Provider: OpenAI GPT-4o Cluster

Voice: Paige (friendly female tone)

Greeting Example:

“Hi, is this the homeowner? I’m Vanessa with Abhash Homebuyers.
We’re buying in your area — if the price made sense, would you consider an offer?”

2️⃣ Conversation Flow

Vanessa follows a short, structured qualification process:

Identify if the person is the homeowner

Ask key qualifying questions:

Openness to sell (yes / maybe / no)

Price range

Timing to sell

Property condition

Branch logic:

✅ If qualified → transfer to acquisitions lead

❌ If not interested / not owner → end politely

Generate an end-of-call summary → send to webhook

3️⃣ Integration: Phone Number & Webhook

Assigned a dedicated phone number inside Vapi.ai

Linked it to the Vanessa assistant

Set the Server URL to:

https://<your-ngrok-subdomain>.ngrok-free.app/vapi-hook


Configured an HTTP POST Webhook Tool to send structured JSON at the end of every call:

{
  "callId": "{{call.id}}",
  "toNumber": "{{call.toNumber}}",
  "fromNumber": "{{call.fromNumber}}",
  "summary": {
    "owner_confirmed": true,
    "openness": "yes",
    "price_range": "$400k",
    "timing": "now",
    "condition": "needs work",
    "notes": "Interested, waiting on spouse",
    "disposition": "qualified"
  }
}

4️⃣ Structured Outputs

Defined the following schema in Vapi.ai → Structured Outputs:

Field	Type	Description
owner_confirmed	boolean	Whether they confirmed ownership
openness	enum: yes / maybe / no	Interest in selling
price_range	string	Quoted or expected price
timing	enum: now / 1–3m / 3–6m / 6m+	Timeline to sell
condition	enum: good / needs work / major repairs / unknown	Property condition
notes	string	Additional call notes
disposition	enum: qualified / not_interested / callback / dnc	Lead classification
5️⃣ Dashboard Logging

When Vapi posts to /vapi-hook, the backend:

Parses the JSON payload

Logs lead data to console

Updates the Express.js live dashboard at:

http://localhost:3000/dashboard


Dashboard Columns:

Time	Phone	Owner	Openness	Price	Timing	Condition	Disposition	Notes	Call ID

🧠 Author: @abhashn8

📞 Project: Vanessa — Voice AI Acquisitions Prototype
