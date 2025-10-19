# Vanessa — Voice AI Acquisitions Assistant (Vapi.ai + Node.js)

A small working prototype of a **Voice AI acquisitions agent** that:

- Connects to a dialer (**Vapi.ai**)  
- Makes **outbound calls**  
- Detects **seller intent** in ~90s  
- Asks about **price, timing, condition, and openness**  
- **Transfers qualified leads** or ends gracefully  
- Logs results to a **live dashboard**

---

🔗 **Repository:** [https://github.com/abhashn8/vanessa-prototype](https://github.com/abhashn8/vanessa-prototype)

---

## Tech Stack

| Component | Purpose |
|------------|----------|
| **Vapi.ai** | Voice + AI + Telephony |
| **Node.js / Express** | Webhook + Dashboard |
| **ngrok** | Expose localhost for Vapi.ai webhooks |

---

## Quick Start

```bash
# Clone the repository
git clone https://github.com/abhashn8/vanessa-prototype
cd vanessa-prototype

# Install dependencies
npm install

# Start the server
node server.js
