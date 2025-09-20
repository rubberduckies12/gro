import { Router } from "express";
import { db } from "../server.js"; // Your pg Pool

const router = Router();

router.post("/confirm", async (req, res) => {
  try {
    const { userId, goal, portfolio } = req.body;
    // 1. Insert goal
    const goalResult = await db.query(
      `INSERT INTO goals (name, target_amount, target_date, risk_tolerance, contribution_amount, contribution_frequency)
       VALUES ($1, $2, $3, $4, $5, $6) RETURNING id`,
      [goal.name, goal.target_amount, goal.target_date, goal.risk_tolerance, goal.contribution_amount, goal.contribution_frequency]
    );
    const goalId = goalResult.rows[0].id;

    // 2. Insert portfolio
    const portfolioResult = await db.query(
      `INSERT INTO portfolios (user_id, goal_id, name, amount_invested)
       VALUES ($1, $2, $3, $4) RETURNING id`,
      [userId, goalId, portfolio.name, portfolio.amount_invested || 0]
    );
    const portfolioId = portfolioResult.rows[0].id;

    // 3. Insert allocations
    for (const allocation of portfolio.allocations) {
      await db.query(
        `INSERT INTO portfolio_allocations (portfolio_id, symbol, target_weight, confirmed)
         VALUES ($1, $2, $3, TRUE)`,
        [portfolioId, allocation.symbol, allocation.target_weight]
      );
    }

    res.json({ success: true, portfolioId });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;