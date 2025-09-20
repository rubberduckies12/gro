import { Router } from "express";
import { db } from "../server.js";
import { getPortfolioQuotes } from "../services/priceService.js";

const router = Router();

/**
 * GET /portfolio/performance/:portfolioId
 * Tracks portfolio performance using portfolio-level transactions and current prices.
 * Returns: { currentValue, totalContributions, netGain, netReturnPct, cashFlows, irr }
 */
router.get("/portfolio/performance/:portfolioId", async (req, res) => {
  try {
    const { portfolioId } = req.params;

    // 1. Get all portfolio-level transactions
    const txResult = await db.query(
      `SELECT * FROM portfolio_transactions WHERE portfolio_id = $1 ORDER BY executed_at ASC`,
      [portfolioId]
    );
    const transactions = txResult.rows;

    // 2. Get current holdings
    const holdingsResult = await db.query(
      `SELECT symbol, qty FROM portfolio_holdings WHERE portfolio_id = $1`,
      [portfolioId]
    );
    const holdings = holdingsResult.rows;

    // 3. Get current prices for all held symbols
    const symbols = holdings.map(h => h.symbol);
    const quotes = await getPortfolioQuotes(symbols);

    // 4. Calculate current value
    let currentValue = 0;
    for (const h of holdings) {
      const price = quotes[h.symbol]?.regularMarketPrice || 0;
      currentValue += h.qty * price;
    }

    // 5. Calculate total contributions and withdrawals (sum of amounts)
    const deposits = transactions.filter(tx => tx.type === "deposit");
    const withdrawals = transactions.filter(tx => tx.type === "withdraw");
    const totalContributions = deposits.reduce((sum, tx) => sum + tx.amount, 0);
    const totalWithdrawals = withdrawals.reduce((sum, tx) => sum + tx.amount, 0);

    // 6. Net gain and return %
    const netGain = currentValue + totalWithdrawals - totalContributions;
    const netReturnPct = totalContributions > 0 ? netGain / totalContributions : 0;

    // 7. Prepare cash flows for IRR calculation
    // Deposits: negative cash flow, Withdrawals: positive, Ending value: positive
    const cashFlows = [];
    for (const tx of transactions) {
      if (tx.type === "deposit") cashFlows.push({ amount: -tx.amount, date: tx.executed_at });
      if (tx.type === "withdraw") cashFlows.push({ amount: tx.amount, date: tx.executed_at });
    }
    // Add ending value as final positive cash flow
    cashFlows.push({ amount: currentValue, date: new Date().toISOString() });

    // 8. IRR calculation (money-weighted return)
    function xirr(cashFlows) {
      const maxIter = 100;
      const tol = 1e-6;
      let guess = 0.1;
      for (let iter = 0; iter < maxIter; iter++) {
        let f = 0, df = 0;
        const t0 = new Date(cashFlows[0].date).getTime();
        for (const flow of cashFlows) {
          const t = (new Date(flow.date).getTime() - t0) / (365 * 24 * 3600 * 1000);
          f += flow.amount / Math.pow(1 + guess, t);
          if (guess !== -1) {
            df -= (t * flow.amount) / Math.pow(1 + guess, t + 1);
          }
        }
        if (Math.abs(f) < tol) return guess;
        guess = guess - f / df;
      }
      return null;
    }
    const irr = xirr(cashFlows);

    res.json({
      currentValue,
      totalContributions,
      netGain,
      netReturnPct,
      cashFlows,
      irr
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;