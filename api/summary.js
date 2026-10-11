export default async function handler(req, res) {
  console.log('[SUMMARY] Request method:', req.method);

  if (req.method !== 'GET') {
    console.warn('[SUMMARY] Method not allowed:', req.method);
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const apiKey = process.env.LUNCH_MONEY_API_KEY;
  if (!apiKey) {
    console.error('[SUMMARY] API key not configured');
    return res.status(500).json({ error: 'API key not configured' });
  }

  try {
    // Get current month dates
    const now = new Date();
    const startDate = new Date(now.getFullYear(), now.getMonth(), 1);
    const endDate = new Date(now.getFullYear(), now.getMonth() + 1, 0);

    const start = startDate.toISOString().split('T')[0];
    const end = endDate.toISOString().split('T')[0];

    console.log('[SUMMARY] Date range:', start, 'to', end);
    console.log('[SUMMARY] Fetching budgets, transactions, and recurring items...');

    // Fetch budgets, transactions, and recurring items in parallel
    const [budgetsRes, transactionsRes, recurringRes] = await Promise.all([
      fetch(`https://api.lunchmoney.dev/v1/budgets?start_date=${start}&end_date=${end}`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${apiKey}`,
          'Content-Type': 'application/json',
        },
      }),
      fetch(`https://api.lunchmoney.dev/v1/transactions?start_date=${start}&end_date=${end}`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${apiKey}`,
          'Content-Type': 'application/json',
        },
      }),
      fetch(`https://api.lunchmoney.dev/v1/recurring_items?start_date=${start}`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${apiKey}`,
          'Content-Type': 'application/json',
        },
      }),
    ]);

    console.log('[SUMMARY] Response statuses:', budgetsRes.status, transactionsRes.status, recurringRes.status);

    // Check for errors
    if (!budgetsRes.ok) {
      const errorText = await budgetsRes.text();
      console.error('[SUMMARY] Budgets API error:', budgetsRes.status, '-', errorText);
      return res.status(budgetsRes.status).json({
        error: `Budgets API error: ${budgetsRes.status}`,
        details: errorText
      });
    }

    if (!transactionsRes.ok) {
      const errorText = await transactionsRes.text();
      console.error('[SUMMARY] Transactions API error:', transactionsRes.status, '-', errorText);
      return res.status(transactionsRes.status).json({
        error: `Transactions API error: ${transactionsRes.status}`,
        details: errorText
      });
    }

    if (!recurringRes.ok) {
      const errorText = await recurringRes.text();
      console.error('[SUMMARY] Recurring items API error:', recurringRes.status, '-', errorText);
      return res.status(recurringRes.status).json({
        error: `Recurring items API error: ${recurringRes.status}`,
        details: errorText
      });
    }

    const budgets = await budgetsRes.json();
    const transactions = await transactionsRes.json();
    const recurring = await recurringRes.json();

    console.log('[SUMMARY] Data received:', {
      budgets: budgets.budgets?.length || 0,
      transactions: transactions.transactions?.length || 0,
      recurring: recurring.recurring_items?.length || 0,
    });

    // Calculate summary data
    const summary = {
      totalBudgeted: budgets.budgets?.reduce((sum, b) => sum + (b.expected_spend || 0), 0) || 0,
      totalSpent: transactions.transactions?.reduce((sum, t) => sum + Math.abs(t.amount || 0), 0) || 0,
      monthlyRecurring: recurring.recurring_items?.reduce((sum, r) => sum + (r.amount || 0), 0) || 0,
      remaining: 0,
    };

    summary.remaining = summary.totalBudgeted - summary.totalSpent;

    console.log('[SUMMARY] Calculated summary:', summary);
    res.status(200).json(summary);
  } catch (error) {
    console.error('[SUMMARY] Caught error:', error.message);
    console.error('[SUMMARY] Error stack:', error.stack);
    res.status(500).json({ error: error.message, stack: error.stack });
  }
}
