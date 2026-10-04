export default async function handler(req, res) {
  try {
    const apiKey = process.env.LUNCH_MONEY_API_KEY;
    
    if (!apiKey) {
      return res.status(500).json({ error: 'API key not configured' });
    }

    const response = await fetch('https://dev.lunchmoney.app/v1/budgets', {
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json'
      }
    });

    if (!response.ok) {
      throw new Error(`Lunch Money API error: ${response.status}`);
    }

    const data = await response.json();
    
    res.status(200).json(data);
  } catch (error) {
    console.error('Budgets API error:', error);
    res.status(500).json({ 
      error: 'Failed to fetch budgets',
      details: error.message 
    });
  }
}
