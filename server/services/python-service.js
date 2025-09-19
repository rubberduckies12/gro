import axios from "axios";

const PYTHON_ENGINE_URL = process.env.PYTHON_ENGINE_URL || "http://localhost:8000";

/**
 * Call the Python FastAPI engine.
 * @param {string} endpoint - API path (e.g. "/returns/daily-log")
 * @param {object} payload - JSON body to send
 * @returns {Promise<object>} - Parsed JSON response
 */
export async function callPython(endpoint, payload) {
  try {
    const url = `${PYTHON_ENGINE_URL}${endpoint}`;
    const response = await axios.post(url, payload);
    return response.data;
  } catch (err) {
    throw new Error(
      `Python service error: ${err.response?.data?.error || err.message}`
    );
  }
}