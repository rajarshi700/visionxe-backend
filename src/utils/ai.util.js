const axios = require('axios');

const GROQ_API_KEY = process.env.GROQ_API_KEY;
const GROQ_MODEL = process.env.GROQ_MODEL;

async function callGroq(prompt) {
  try {
    const response = await axios.post('https://api.groq.com/openai/v1/chat/completions', {
      model: GROQ_MODEL,
      messages: [{ role: "user", content: prompt }]
    }, {
      headers: {
        "Authorization": `Bearer ${GROQ_API_KEY}`,
        "Content-Type": "application/json"
      },
      timeout: 9000, // optional, to auto-cancel if slow
    });

    return response.data.choices[0].message.content.trim();
  } catch (error) {
    console.error('Error calling Groq:', error.response?.data || error.message);
    return "Stay positive and keep moving forward!";
  }
}

async function getQuote() {
    const prompt = "Give me one famous short motivational quote in English in the format: Quote - Person's Name." ;
    const quote = await callGroq(prompt);
    if (!quote) return "Stay positive and keep moving forward!";
    return quote;
}

module.exports = {
    getQuote,
};
