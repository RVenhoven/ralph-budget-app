export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const apiKey = process.env.LUNCH_MONEY_API_KEY;
  if (!apiKey) {
    return res.status(500).json({ error: 'API key not configured' });
  }

  try {
    const now = new Date();
    const startDate = new Date(now.getFullYear(), now.getMonth(), 1);
    const start = startDate.toISOString().split('T')[0];

    // Recurring items: start_date is optional, but if you use it you must provide end_date
    const endDate = new Date(now.getFullYear(), now.getMonth() + 1, 0);
    const end = endDate.toISOString().split('T')[0];

    const response = await fetch(
      `https://api.lunchmoney.dev/v1/recurring_items?start_date=${start}&end_date=${end}`,
      {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${apiKey}`,
          'Content-Type': 'application/json',
        },
      }
    );

    if (!response.ok) {
      return res.status(response.status).json({ error: 'API request failed' });
    }

    const data = await response.json();

    // Check for error in response body
    if (Array.isArray(data) && data.length > 0 && data[0].error) {
      return res.status(400).json({ error: data[0].error });
    }
    
    // Also check if data itself is an error object
    if (data.error) {
      return res.status(400).json({ error: data.error });
    }

    return res.status(200).json({ recurring_items: data });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}
