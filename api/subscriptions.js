export default async function handler(req, res) {
  try {
    const apiKey = process.env.LUNCH_MONEY_API_KEY;
    
    if (!apiKey) {
      return res.status(500).json({ error: 'API key not configured' });
    }

    // Fetch all recurring transactions
    const response = await fetch(
      'https://dev.lunchmoney.app/v1/recurring_expenses',
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

    // Process recurring expenses to extract subscription info
    const subscriptions = (data.recurring_expenses || []).map(expense => ({
      id: expense.id,
      name: expense.payee || 'Unknown',
      amount: Math.abs(expense.amount),
      frequency: expense.recurrence_type || 'monthly',
      category: expense.category || 'Uncategorized',
      nextDate: expense.next_date,
      isActive: !expense.is_income
    })).filter(sub => !sub.isActive === false);

    // Calculate monthly and annual totals
    const monthlyTotal = subscriptions
      .filter(s => s.frequency === 'monthly')
      .reduce((sum, s) => sum + s.amount, 0);

    const annualSubscriptions = subscriptions
      .filter(s => s.frequency === 'yearly' || s.frequency === 'annual')
      .reduce((sum, s) => sum + s.amount, 0);

    const annualTotal = monthlyTotal * 12 + annualSubscriptions;

    res.status(200).json({
      subscriptions,
      summary: {
        monthlyTotal: parseFloat(monthlyTotal.toFixed(2)),
        annualTotal: parseFloat(annualTotal.toFixed(2)),
        count: subscriptions.length
      }
    });
  } catch (error) {
    console.error('Subscriptions API error:', error);
    res.status(500).json({ 
      error: 'Failed to fetch subscriptions',
      details: error.message 
    });
  }
}
