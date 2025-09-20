import yahooFinance from "yahoo-finance2";

/**
 * Fetch historical OHLCV data for a given symbol.
 * @param {string} symbol - Stock ticker (e.g. "AAPL")
 * @param {object} options - { period1, period2, interval }
 * @returns {Promise<object>} - Historical price data
 */
export async function getStockData(symbol, options = {}) {
  try {
    // Example options: { period1: "2023-01-01", period2: "2024-01-01", interval: "1d" }
    const result = await yahooFinance.historical(symbol, options);
    return result; // Array of { date, open, high, low, close, volume, adjClose }
  } catch (err) {
    throw new Error(`Yahoo Finance error: ${err.message}`);
  }
}

/**
 * Fetch current quote for a given symbol.
 * @param {string} symbol - Stock ticker
 * @returns {Promise<object>} - Quote data
 */
export async function getQuote(symbol) {
  try {
    const result = await yahooFinance.quote(symbol);
    return result;
  } catch (err) {
    throw new Error(`Yahoo Finance error: ${err.message}`);
  }
}

/**
 * Fetch historical OHLCV data for multiple symbols.
 * @param {string[]} symbols - Array of stock tickers (e.g. ["AAPL", "MSFT"])
 * @param {object} options - { period1, period2, interval }
 * @returns {Promise<object>} - Object mapping symbol to historical price data
 */
export async function getAllStockData(symbols, options = {}) {
  try {
    const results = await Promise.all(
      symbols.map(async (symbol) => {
        const data = await yahooFinance.historical(symbol, options);
        return { symbol, data };
      })
    );
    // Convert array to object: { AAPL: [...], MSFT: [...] }
    return Object.fromEntries(results.map(({ symbol, data }) => [symbol, data]));
  } catch (err) {
    throw new Error(`Yahoo Finance error: ${err.message}`);
  }
}

/**
 * Fetch current quotes for multiple symbols.
 * @param {string[]} symbols - Array of stock tickers
 * @returns {Promise<object>} - Object mapping symbol to quote data
 */
export async function getAllQuotes(symbols) {
  try {
    const results = await Promise.all(
      symbols.map(async (symbol) => {
        const quote = await yahooFinance.quote(symbol);
        return { symbol, quote };
      })
    );
    return Object.fromEntries(results.map(({ symbol, quote }) => [symbol, quote]));
  } catch (err) {
    throw new Error(`Yahoo Finance error: ${err.message}`);
  }
}