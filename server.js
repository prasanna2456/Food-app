import express from "express";
import fetch from "node-fetch";
import path from "path";
import { fileURLToPath } from "url";

// Configuration for serving static files in ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

// 1. Serve static files from the Parcel build output (usually 'dist')
app.use(express.static(path.join(__dirname, "dist")));

// API Route for Swiggy Proxy
app.get("/menu", async (req, res) => {
  try {
    const swiggyUrl =
      "https://www.swiggy.com/dapi/restaurants/list/v5?lat=11.0694457&lng=76.9971301&collection=80477&tags=&sortBy=&filters=&type=rcv2&offset=0&page_type=null";

    // STEP 1 — Initial request to Swiggy to get session cookies
    const preReq = await fetch("https://www.swiggy.com/", {
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
        Accept: "text/html,application/xhtml+xml",
      },
      redirect: "manual",
    });

    const cookies = preReq.headers.get("set-cookie");

    if (!cookies) {
      throw new Error("Swiggy did not send required cookies");
    }

    // STEP 2 — Call the actual API with the cookies to bypass security
    const r = await fetch(swiggyUrl, {
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
        Accept: "application/json, text/plain, */*",
        Cookie: cookies,
        Referer: "https://www.swiggy.com/",
      },
    });

    const text = await r.text();

    if (!text || !text.trim().startsWith("{")) {
      throw new Error("API blocked or returned invalid JSON");
    }

    const json = JSON.parse(text);
    res.json(json);
  } catch (err) {
    console.error("Proxy failed:", err.message);
    res.status(500).json({ error: err.message });
  }
});

// 2. Catch-all route: Send index.html for any other request
// FIXED: Updated to Regular Expression /.*/ to satisfy Express 5 requirements
app.get(/.*/, (req, res) => {
  res.sendFile(path.join(__dirname, "dist", "index.html"));
});

// 3. Listen on process.env.PORT for Render deployment
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
