import yahooFinance from "yahoo-finance2";

/**
 * Fetch current quotes for a list of symbols (portfolio stocks only).
 * @param {string[]} symbols - Array of stock tickers
 * @returns {Promise<object>} - Object mapping symbol to quote data
 */
export async function getPortfolioQuotes(symbols) {
  try {
    const results = await Promise.all(
      symbols.map(async (symbol) => {
        const quote = await yahooFinance.quote(symbol);
        return { symbol, quote };
      })
    );
    return Object.fromEntries(results.map(({ symbol, quote }) => [symbol, quote]));
  } catch (err) {
    throw new Error(`Price service error: ${err.message}`);
  }
}