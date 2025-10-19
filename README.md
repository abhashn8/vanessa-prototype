# Vanessa — Voice AI Acquisitions Assistant (Vapi.ai + Node.js)

A small working prototype of a **Voice AI acquisitions agent** that:
- Connects to a dialer (**Vapi.ai**)
- Makes **outbound calls**
- Detects seller intent in ~90s
- Asks about **price, timing, condition, openness**
- Transfers **qualified** leads or ends gracefully
- Logs results to a **live dashboard**

https://github.com/abhashn8/vanessa-prototype

---

## 🧰 Tech
- **Vapi.ai** (voice + AI + telephony)
- **Node.js / Express** (webhook + dashboard)
- **ngrok** (expose localhost)

---

## 🚀 Quick Start

```bash
git clone https://github.com/abhashn8/vanessa-prototype
cd vanessa-prototype
npm install
node server.js
