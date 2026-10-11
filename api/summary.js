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
    const endDate = new Date(now.getFullYear(), now.getMonth() + 1, 0);

    const start = startDate.toISOString().split('T')[0];
    const end = endDate.toISOString().split('T')[0];

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
      fetch(`https://api.lunchmoney.dev/v1/recurring_items?start_date=${start}&end_date=${end}`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${apiKey}`,
          'Content-Type': 'application/json',
        },
      }),
    ]);

    if (!budgetsRes.ok || !transactionsRes.ok || !recurringRes.ok) {
      return res.status(500).json({ error: 'API request failed' });
    }

    const budgets = await budgetsRes.json();
    const transactions = await transactionsRes.json();
    const recurring = await recurringRes.json();

    // Check for errors in responses
    if (budgets.error || transactions.error) {
      return res.status(400).json({ error: 'Data fetch error' });
    }

    // Calculate summary
    const totalBudgeted = budgets.reduce((sum, cat) => {
      const monthData = cat.data[`${start}`];
      return sum + (monthData?.budget_amount || 0);
    }, 0);

    const totalSpent = transactions.reduce((sum, trans) => {
      return sum + Math.abs(parseFloat(trans.amount) || 0);
    }, 0);

    const monthlyRecurring = (Array.isArray(recurring) ? recurring : []).reduce((sum, item) => {
      return sum + (item.amount || 0);
    }, 0);

    const summary = {
      totalBudgeted,
      totalSpent,
      monthlyRecurring,
      remaining: totalBudgeted - totalSpent,
    };

    return res.status(200).json(summary);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}
