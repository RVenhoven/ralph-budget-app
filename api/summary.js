export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const apiKey = process.env.LUNCH_MONEY_API_KEY;
  if (!apiKey) {
    return res.status(500).json({ error: 'API key not configured' });
  }

  try {
    // Get current month dates
    const now = new Date();
    const startDate = new Date(now.getFullYear(), now.getMonth(), 1);
    const endDate = new Date(now.getFullYear(), now.getMonth() + 1, 0);

    const start = startDate.toISOString().split('T')[0];
    const end = endDate.toISOString().split('T')[0];

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

    if (!budgetsRes.ok || !transactionsRes.ok || !recurringRes.ok) {
      return res.status(500).json({ error: 'Failed to fetch data from Lunch Money' });
    }

    const budgets = await budgetsRes.json();
    const transactions = await transactionsRes.json();
    const recurring = await recurringRes.json();

    // Calculate summary data
    const summary = {
      totalBudgeted: budgets.budgets?.reduce((sum, b) => sum + (b.expected_spend || 0), 0) || 0,
      totalSpent: transactions.transactions?.reduce((sum, t) => sum + Math.abs(t.amount || 0), 0) || 0,
      monthlyRecurring: recurring.recurring_items?.reduce((sum, r) => sum + (r.amount || 0), 0) || 0,
      remaining: 0,
    };

    summary.remaining = summary.totalBudgeted - summary.totalSpent;

    res.status(200).json(summary);
  } catch (error) {
    console.error('Summary API error:', error);
    res.status(500).json({ error: error.message });
  }
}
