const express = require('express');
const axios = require('axios');

const app = express();
const port = 3000;

app.get('/api/snippets', async (req, res) => {
  try {
    const response = await axios.get('https://api.github.com/repos/codepanuvom/CodeSnippets/contents/snippets');
    const snippets = response.data.map(item => ({
      name: item.name,
      download_url: item.download_url,
    }));

    res.json(snippets);
  } catch (error) {
    console.error('Error fetching snippets:', error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
