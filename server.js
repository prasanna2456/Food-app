import express from "express";
import fetch from "node-fetch";

const app = express();

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
    console.log("First 200 chars:", text.slice(0, 200));

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

app.listen(4000, () => console.log("Proxy running on http://localhost:4000"));
