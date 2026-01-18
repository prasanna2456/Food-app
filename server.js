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

// API Route
app.get("/menu", async (req, res) => {
  try {
    const swiggyUrl =
      "https://www.swiggy.com/dapi/menu/pl?page-type=REGULAR_MENU&complete-menu=true&lat=11.0694457&lng=76.9971301&restaurantId=50374";

    // STEP 1 — Initial request to get cookies
    const preReq = await fetch("https://www.swiggy.com/", {
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/120 Safari/537.36",
        Accept: "text/html,application/xhtml+xml",
      },
      redirect: "manual",
    });

    const cookies = preReq.headers.get("set-cookie");
    console.log("Got cookies:", cookies ? "YES" : "NO");

    if (!cookies) {
      throw new Error("Swiggy did not send cookies");
    }

    // STEP 2 — Call API with cookies
    const r = await fetch(swiggyUrl, {
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/120 Safari/537.36",
        Accept: "application/json, text/plain, */*",
        Cookie: cookies,
        Referer: "https://www.swiggy.com/",
      },
    });

    console.log("Swiggy status:", r.status);

    const text = await r.text();
    // console.log("First 200 chars:", text.slice(0, 200));

    if (!text || !text.trim().startsWith("{")) {
      throw new Error("Still not JSON — API blocked");
    }

    const json = JSON.parse(text);
    res.json(json);
  } catch (err) {
    console.error("Proxy failed:", err.message);
    res.status(500).json({ error: err.message });
  }
});

// 2. Catch-all route: Send index.html for any other request
// FIXED: Changed "*" to /.*/ to fix Express 5 "Missing parameter name" error
app.get(/.*/, (req, res) => {
  res.sendFile(path.join(__dirname, "dist", "index.html"));
});

// 3. Listen on process.env.PORT (Render Requirement)
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
