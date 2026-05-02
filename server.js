const express = require('express');
const path = require('path');
const cors = require('cors');
const dotenv = require('dotenv');
const { GoogleGenerativeAI } = require('@google/generative-ai');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 8080;

app.use(cors());
app.use(express.json());

const genAI = new GoogleGenerativeAI(process.env.REACT_APP_GEMINI_API_KEY || '');

app.post('/api/gemini/suggest', async (req, res) => {
  try {
    const { prompt } = req.body;
    if (!prompt) {
      return res.status(400).json({ error: 'Prompt is required' });
    }

    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    
    const systemPrompt = `You are an AI assistant for a project management tool called Collabo. 
    The user will describe a project or feature goal. 
    You must respond with a JSON array of tasks needed to complete this goal.
    Each task should have the following properties:
    - title (string)
    - description (string)
    - priority (string: 'High', 'Medium', or 'Low')
    - label (string)
    Do not wrap the JSON in markdown code blocks, just return the raw JSON array.`;

    const result = await model.generateContent(systemPrompt + "\n\nUser request: " + prompt);
    const response = await result.response;
    const text = response.text();
    
    // Parse the JSON array
    let tasks = [];
    try {
      tasks = JSON.parse(text.replace(/```json/g, '').replace(/```/g, '').trim());
    } catch (e) {
      console.error('Failed to parse AI response as JSON:', text);
      return res.status(500).json({ error: 'AI produced invalid format' });
    }

    res.json({ tasks });
  } catch (error) {
    console.error('Gemini API Error:', error);
    res.status(500).json({ error: 'Failed to generate tasks' });
  }
});

// Serve static files from the React app
app.use(express.static(path.join(__dirname, 'dist')));

// The "catchall" handler: for any request that doesn't
// match one above, send back React's index.html file.
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
