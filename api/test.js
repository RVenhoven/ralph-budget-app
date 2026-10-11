export default async function handler(req, res) {
  console.log('[TEST] Starting test endpoint');
  const apiKey = process.env.LUNCH_MONEY_API_KEY;

  if (!apiKey) {
    console.error('[TEST] API key not found in environment');
    return res.status(500).json({
      error: 'API key not configured',
      message: 'LUNCH_MONEY_API_KEY environment variable is not set',
    });
  }

  console.log('[TEST] API key found, length:', apiKey.length);

  try {
    // Test actual API call with detailed logging
    const testUrl = `https://api.lunchmoney.dev/v1/budgets?start_date=2026-10-01&end_date=2026-10-31`;
    console.log('[TEST] Making request to:', testUrl);

    const response = await fetch(testUrl, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
    });

    console.log('[TEST] Response status:', response.status);
    console.log('[TEST] Response ok:', response.ok);

    if (!response.ok) {
      const errorText = await response.text();
      console.error('[TEST] API error response:', errorText);
      return res.status(response.status).json({
        error: `API returned ${response.status}`,
        details: errorText,
      });
    }

    const data = await response.json();
    console.log('[TEST] Response data received, items:', data.budgets?.length || 0);

    return res.status(200).json({
      message: "Test endpoint - API is working",
      hasApiKey: true,
      apiKeyLength: apiKey.length,
      apiKeyStart: apiKey.substring(0, 10) + '...',
      apiResponseStatus: response.status,
      budgetCount: data.budgets?.length || 0,
      sampleBudget: data.budgets?.[0],
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error('[TEST] Caught error:', error.message);
    console.error('[TEST] Error stack:', error.stack);
    return res.status(500).json({
      error: 'Test failed',
      message: error.message,
      stack: error.stack,
    });
  }
}
