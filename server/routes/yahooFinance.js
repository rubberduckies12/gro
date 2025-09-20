import { Router } from "express";
import { getAllStockData } from "../services/yahooService.js";
import { callPython } from "../services/python-service.js";

const router = Router();

/**
 * POST /yahoo/analyze
 * Expects { symbols: [...], options: {...}, analysisParams: {...} } in body
 * - Fetches stock data from Yahoo Finance
 * - Forwards the data to Python /analysis/run
 * - Returns the analysis JSON from Python
 */
router.post("/analyze", async (req, res) => {
  try {
    const { symbols, options, analysisParams } = req.body;
    // 1. Fetch stock data for all symbols
    const stockData = await getAllStockData(symbols, options);

    // 2. Prepare payload for Python analysis
    // Example: flatten prices for analysis, merge with analysisParams
    // You may want to aggregate/transform stockData as needed
    const prices = Object.values(stockData).flatMap(arr => arr.map(d => d.close));
    const payload = {
      ...analysisParams,
      prices: prices
      // Add other fields as needed (benchmark, eps, etc.)
    };

    // 3. Call Python /analysis/run
    const analysisResult = await callPython("/analysis/run", payload);

    // 4. Return analysis JSON to frontend
    res.json({ analysis: analysisResult, stockData });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;