export default async function handler(req, res) {
  console.log('[BUDGETS] Request method:', req.method);

  if (req.method !== 'GET') {
    console.warn('[BUDGETS] Method not allowed:', req.method);
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const apiKey = process.env.LUNCH_MONEY_API_KEY;
  if (!apiKey) {
    console.error('[BUDGETS] API key not configured');
    return res.status(500).json({ error: 'API key not configured' });
  }

  try {
    // Get current month start and end dates
    const now = new Date();
    const startDate = new Date(now.getFullYear(), now.getMonth(), 1);
    const endDate = new Date(now.getFullYear(), now.getMonth() + 1, 0);

    const start = startDate.toISOString().split('T')[0];
    const end = endDate.toISOString().split('T')[0];

    const url = `https://api.lunchmoney.dev/v1/budgets?start_date=${start}&end_date=${end}`;
    console.log('[BUDGETS] Fetching from:', url);
    console.log('[BUDGETS] Date range:', start, 'to', end);

    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
    });

    console.log('[BUDGETS] Response status:', response.status);

    if (!response.ok) {
      const errorText = await response.text();
      console.error('[BUDGETS] API error:', response.status, '-', errorText);
      return res.status(response.status).json({
        error: `Lunch Money API error: ${response.status}`,
        details: errorText
      });
    }

    const data = await response.json();
    console.log('[BUDGETS] Success, returning', data.budgets?.length || 0, 'budgets');
    res.status(200).json(data);
  } catch (error) {
    console.error('[BUDGETS] Caught error:', error.message);
    console.error('[BUDGETS] Error stack:', error.stack);
    res.status(500).json({ error: error.message, stack: error.stack });
  }
}
