export default async function handler(req, res) {
  try {
    const apiKey = process.env.LUNCH_MONEY_API_KEY;
    
    if (!apiKey) {
      return res.status(500).json({ error: 'API key not configured' });
    }

    // Get current month for date range
    const now = new Date();
    const startDate = new Date(now.getFullYear(), now.getMonth(), 1).toISOString().split('T')[0];
    const endDate = new Date(now.getFullYear(), now.getMonth() + 1, 0).toISOString().split('T')[0];

    const response = await fetch(
      `https://dev.lunchmoney.app/v1/transactions?start_date=${startDate}&end_date=${endDate}`,
      {
        headers: {
          'Authorization': `Bearer ${apiKey}`,
          'Content-Type': 'application/json'
        }
      }
    );

    if (!response.ok) {
      throw new Error(`Lunch Money API error: ${response.status}`);
    }

    const data = await response.json();
    
    res.status(200).json(data);
  } catch (error) {
    console.error('Transactions API error:', error);
    res.status(500).json({ 
      error: 'Failed to fetch transactions',
      details: error.message 
    });
  }
}
