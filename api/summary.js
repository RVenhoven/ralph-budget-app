export default async function handler(req, res) {
  try {
    const apiKey = process.env.LUNCH_MONEY_API_KEY;
    
    if (!apiKey) {
      return res.status(500).json({ error: 'API key not configured' });
    }

    // Fetch budgets and transactions in parallel
    const [budgetsRes, transactionsRes] = await Promise.all([
      fetch('https://dev.lunchmoney.app/v1/budgets', {
        headers: {
          'Authorization': `Bearer ${apiKey}`,
          'Content-Type': 'application/json'
        }
      }),
      fetch('https://dev.lunchmoney.app/v1/transactions', {
        headers: {
          'Authorization': `Bearer ${apiKey}`,
          'Content-Type': 'application/json'
        }
      })
    ]);

    if (!budgetsRes.ok || !transactionsRes.ok) {
      throw new Error('Failed to fetch data from Lunch Money');
    }

    const budgetsData = await budgetsRes.json();
    const transactionsData = await transactionsRes.json();

    // Process budgets with actual spending
    const budgets = (budgetsData.budgets || []).map(budget => {
      const spent = transactionsData.transactions
        .filter(t => t.category === budget.category)
        .reduce((sum, t) => sum + Math.abs(t.amount), 0);

      return {
        id: budget.id,
        category: budget.category,
        targetAmount: budget.target,
        spent: parseFloat(spent.toFixed(2)),
        remaining: parseFloat((budget.target - spent).toFixed(2)),
        percentage: parseFloat(((spent / budget.target) * 100).toFixed(1)),
        status: spent > budget.target ? 'over' : spent > (budget.target * 0.8) ? 'warning' : 'on-track'
      };
    });

    // Calculate totals
    const totalBudget = budgets.reduce((sum, b) => sum + b.targetAmount, 0);
    const totalSpent = budgets.reduce((sum, b) => sum + b.spent, 0);
    const totalRemaining = totalBudget - totalSpent;

    res.status(200).json({
      budgets,
      summary: {
        totalBudget: parseFloat(totalBudget.toFixed(2)),
        totalSpent: parseFloat(totalSpent.toFixed(2)),
        totalRemaining: parseFloat(totalRemaining.toFixed(2)),
        percentageSpent: parseFloat(((totalSpent / totalBudget) * 100).toFixed(1)),
        budgetCount: budgets.length
      }
    });
  } catch (error) {
    console.error('Summary API error:', error);
    res.status(500).json({ 
      error: 'Failed to fetch summary data',
      details: error.message 
    });
  }
}
