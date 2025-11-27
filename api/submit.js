export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { name, phoneNumber, selectedPainPoints, specificSituation } = req.body;

  if (!process.env.GOOGLE_SHEET_URL) {
    return res.status(500).json({ message: 'Server configuration error: Missing Google Sheet URL' });
  }

  try {
    // Data formatting for Google Sheets
    const payload = {
      name: name || "익명",
      phoneNumber: phoneNumber || "",
      selectedPainPoints: selectedPainPoints.join(', '), // Join array to string
      specificSituation: specificSituation || ""
    };

    const response = await fetch(process.env.GOOGLE_SHEET_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
        throw new Error(`Google Sheets responded with ${response.status}`);
    }

    return res.status(200).json({ message: 'Success' });
  } catch (error) {
    console.error('Google Sheet API Error:', error);
    return res.status(500).json({ message: 'Failed to save data', error: error.message });
  }
}