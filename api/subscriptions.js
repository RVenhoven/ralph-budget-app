export default async function handler(req, res) {
  console.log('[SUBSCRIPTIONS] Request method:', req.method);

  if (req.method !== 'GET') {
    console.warn('[SUBSCRIPTIONS] Method not allowed:', req.method);
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const apiKey = process.env.LUNCH_MONEY_API_KEY;
  if (!apiKey) {
    console.error('[SUBSCRIPTIONS] API key not configured');
    return res.status(500).json({ error: 'API key not configured' });
  }

  try {
    // Get current month start date for recurring items
    const now = new Date();
    const startDate = new Date(now.getFullYear(), now.getMonth(), 1);
    const start = startDate.toISOString().split('T')[0];

    const url = `https://api.lunchmoney.dev/v1/recurring_items?start_date=${start}`;
    console.log('[SUBSCRIPTIONS] Fetching from:', url);
    console.log('[SUBSCRIPTIONS] Start date:', start);

    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
    });

    console.log('[SUBSCRIPTIONS] Response status:', response.status);

    if (!response.ok) {
      const errorText = await response.text();
      console.error('[SUBSCRIPTIONS] API error:', response.status, '-', errorText);
      return res.status(response.status).json({
        error: `Lunch Money API error: ${response.status}`,
        details: errorText
      });
    }

    const data = await response.json();
    console.log('[SUBSCRIPTIONS] Success, returning', data.recurring_items?.length || 0, 'recurring items');
    res.status(200).json(data);
  } catch (error) {
    console.error('[SUBSCRIPTIONS] Caught error:', error.message);
    console.error('[SUBSCRIPTIONS] Error stack:', error.stack);
    res.status(500).json({ error: error.message, stack: error.stack });
  }
}
