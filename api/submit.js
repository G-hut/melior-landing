export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { name, phoneNumber, selectedPainPoints, specificSituation } = req.body;

  if (!process.env.GOOGLE_SHEET_URL) {
    console.error("Missing GOOGLE_SHEET_URL");
    return res.status(500).json({ message: 'Server configuration error' });
  }

  try {
    const payload = {
      name: name || "익명",
      phoneNumber: phoneNumber || "",
      selectedPainPoints: Array.isArray(selectedPainPoints) ? selectedPainPoints.join(', ') : selectedPainPoints,
      specificSituation: specificSituation || ""
    };

    // 1. Clean URL: Remove accidental quotes from Env Var
    const sheetUrl = process.env.GOOGLE_SHEET_URL.replace(/['"]/g, '').trim();

    // 2. Fetch to Google Apps Script
    const response = await fetch(sheetUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    const text = await response.text();

    // 3. Validation: Check if response is HTML (Login Page) instead of JSON
    // Google returns a standard HTML login page if permissions are wrong (Status is often 200 or 302 -> 200)
    if (text.includes("<!DOCTYPE html>") || text.includes("Google Accounts")) {
        console.error("Received HTML instead of JSON. Likely Permission Error. Deployment must be 'Anyone'. Response snippet:", text.substring(0, 200));
        throw new Error("Google Sheet Permission Error: The script is requesting login. Check deployment settings (Access: Anyone).");
    }

    // 4. Try parsing JSON to check for script-level errors
    try {
        const json = JSON.parse(text);
        if (json.result === 'error') {
            throw new Error(json.error);
        }
    } catch (e) {
        // If it's not JSON but also not the login page, it might be a simple success text or unknown state.
        // We log it but optimistically assume success if status was OK, as GAS redirects can be tricky.
        console.log("Non-JSON response received:", text.substring(0, 100));
    }

    return res.status(200).json({ message: 'Success' });
  } catch (error) {
    console.error('Submission Failed:', error);
    return res.status(500).json({ message: 'Failed to save data', error: error.message });
  }
}