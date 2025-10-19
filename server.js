// ─── VANESSA AI Voice Agent Webhook + Dashboard ───
const express = require("express");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
dotenv.config();

const app = express();
app.use(bodyParser.json());

const PORT = process.env.PORT || 3000;
const COMPANY = process.env.COMPANY_NAME || "Abhash Homebuyers";
const leads = []; // in-memory lead list

// ─── Webhook endpoint (Vapi → this server) ───
app.post("/vapi-hook", (req, res) => {
  try {
    const { callId, toNumber, fromNumber, summary } = req.body || {};
    if (summary) {
      leads.unshift({
        ts: new Date().toISOString(),
        phone: toNumber || fromNumber || "",
        callId: callId || "",
        owner_confirmed: summary.owner_confirmed ?? "",
        openness: summary.openness ?? "",
        price_range: summary.price_range ?? "",
        timing: summary.timing ?? "",
        condition: summary.condition ?? "",
        disposition: summary.disposition ?? "",
        notes: summary.notes ?? "",
      });
      console.log("Lead logged:", summary);
    } else {
      console.log("Received body without summary:", req.body);
    }
    res.sendStatus(200);
  } catch (e) {
    console.error("Error in /vapi-hook:", e);
    res.sendStatus(500);
  }
});

// ─── Dashboard ───
app.get("/", (_req, res) => res.redirect("/dashboard"));

app.get("/dashboard", (_req, res) => {
  const rows = leads
    .map(
      (l) => `
    <tr>
      <td>${l.ts}</td>
      <td>${l.phone}</td>
      <td>${l.owner_confirmed}</td>
      <td>${l.openness}</td>
      <td>${l.price_range}</td>
      <td>${l.timing}</td>
      <td>${l.condition}</td>
      <td>${l.disposition}</td>
      <td>${(l.notes || "").replace(/</g, "&lt;")}</td>
      <td style="font-family:monospace">${l.callId}</td>
    </tr>`
    )
    .join("");

  res.send(`<!doctype html>
  <html>
  <head>
    <meta charset="utf-8" />
    <title>Vanessa Leads</title>
    <style>
      body{font-family:system-ui,Arial;margin:24px;background:#fafafa}
      h1{margin:0 0 8px 0}
      .sub{color:#555;margin-bottom:16px}
      table{border-collapse:collapse;width:100%;background:white}
      th,td{border:1px solid #e5e7eb;padding:8px;font-size:14px}
      th{background:#f3f4f6;text-align:left}
      tr:nth-child(even){background:#fafafa}
      code{background:#f3f4f6;padding:2px 4px;border-radius:4px}
    </style>
  </head>
  <body>
    <h1>Vanessa Leads</h1>
    <div class="sub">${COMPANY}</div>
    <table>
      <thead>
        <tr>
          <th>Time</th><th>Phone</th><th>Owner</th><th>Openness</th>
          <th>Price</th><th>Timing</th><th>Condition</th><th>Disposition</th>
          <th>Notes</th><th>Call ID</th>
        </tr>
      </thead>
      <tbody>${rows}</tbody>
    </table>
    <p style="margin-top:16px;color:#666">Webhook: <code>/vapi-hook</code></p>
  </body>
  </html>`);
});

// ─── Start ───
app.listen(PORT, () =>
  console.log(`Vanessa server running on http://localhost:${PORT}`)
);
