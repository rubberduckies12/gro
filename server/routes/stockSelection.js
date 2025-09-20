import { Router } from "express";
import { Configuration, OpenAIApi } from "openai";
import { db } from "../server.js"; // Your pg Pool

const router = Router();

// Set up OpenAI client
const openai = new OpenAIApi(
  new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
  })
);

/**
 * POST /stock-selection
 * Expects { analysis: {...}, userPreferences: {...}, userId: "..." } in body
 * - Fetches user's goals from DB
 * - Uses GPT-4.5 (OpenAI API) to select stocks and build 5 portfolios
 * - Returns the crafted portfolios to the frontend for user selection
 */
router.post("/", async (req, res) => {
  try {
    const { analysis, userPreferences, userId } = req.body;

    // Fetch goals from DB for this user
    const goalsResult = await db.query(
      `SELECT g.* FROM goals g
       JOIN portfolios p ON g.id = p.goal_id
       WHERE p.user_id = $1
       ORDER BY g.created_at DESC
       LIMIT 1`,
      [userId]
    );
    const goals = goalsResult.rows[0] || {};

    // Build prompt for GPT-4.5, including goals
    const prompt = `
You are a financial AI assistant. Based on the following quant analysis, user preferences, and investment goals, select the most suitable stocks and craft 5 custom portfolios. 
Each portfolio should be tailored to the user's goals. Return the portfolios as a JSON array, each with a name, stock symbols, and allocation percentages.

Quant Analysis:
${JSON.stringify(analysis, null, 2)}

User Preferences:
${JSON.stringify(userPreferences, null, 2)}

User Goals:
${JSON.stringify(goals, null, 2)}
`;

    // Call OpenAI GPT-4.5
    const completion = await openai.createChatCompletion({
      model: "gpt-4-1106-preview",
      messages: [
        { role: "system", content: "You are a financial AI assistant." },
        { role: "user", content: prompt }
      ],
      max_tokens: 1000,
      temperature: 0.7,
    });

    // Parse and return the portfolios
    const aiResponse = completion.data.choices[0].message.content;
    let portfolios;
    try {
      portfolios = JSON.parse(aiResponse);
    } catch {
      portfolios = { error: "AI response could not be parsed as JSON.", raw: aiResponse };
    }

    // Present the five portfolios to the user for selection
    // The frontend should display these and POST the user's selection to another endpoint
    res.json({
      message: "Select one of the five portfolios below.",
      portfolios: portfolios
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;