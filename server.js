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

/**
 * API Route: /menu
 * This proxies the request to Swiggy to bypass CORS policies.
 * It includes a two-step process to handle Swiggy's security (fetching cookies first).
 */
app.get("/menu", async (req, res) => {
  try {
    // The specific Swiggy Collection URL from your error log
    const swiggyUrl =
      "https://www.swiggy.com/dapi/restaurants/list/v5?lat=11.0694457&lng=76.9971301&collection=80477&tags=&sortBy=&filters=&type=rcv2&offset=0&page_type=null";

    // STEP 1 — Initial request to Swiggy to obtain necessary session cookies
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
      throw new Error("Swiggy did not send required session cookies");
    }

    // STEP 2 — Execute the actual data fetch using the captured cookies
    const response = await fetch(swiggyUrl, {
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
        Accept: "application/json, text/plain, */*",
        Cookie: cookies,
        Referer: "https://www.swiggy.com/",
      },
    });

    const text = await response.text();

    // Validate that the response is actually JSON and not an error page
    if (!text || !text.trim().startsWith("{")) {
      throw new Error("API response was blocked or is not valid JSON");
    }

    const json = JSON.parse(text);
    res.json(json);
  } catch (err) {
    console.error("Proxy error:", err.message);
    res.status(500).json({ error: err.message });
  }
});

/**
 * 2. Catch-all route: Send index.html for any other request.
 * FIXED: Uses the Regular Expression /.*/ to comply with Express 5 naming requirements.
 * This allows React Router to handle deep-linked URLs (like /about or /contact) on refresh.
 */
app.get(/.*/, (req, res) => {
  res.sendFile(path.join(__dirname, "dist", "index.html"));
});

// 3. Listen on process.env.PORT (Required for Render deployment)
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server is running successfully on port ${PORT}`);
});
