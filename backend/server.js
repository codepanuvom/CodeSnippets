const axios = require('axios');
const express = require('express');

const app = express();
const port = process.env.PORT || 3000;

// Set your GitHub token here
const githubToken = 'solla_maaten'; // Replace with your actual GitHub token

app.get('/api/snippets', async (req, res) => {
  const repoOwner = 'codepanuvom';
  const repoName = 'CodeSnippets';
  const folderPath = 'snippets';

  try {
    const response = await axios.get(`https://api.github.com/repos/${repoOwner}/${repoName}/contents/${folderPath}`, {
      headers: {
        Authorization: `Bearer ${githubToken}`,
      },
    });

    const snippets = await Promise.all(response.data.map(async item => {
      const contentResponse = await axios.get(item.download_url, {
        headers: {
          Authorization: `Bearer ${githubToken}`,
        },
      });
      return { name: item.name, content: contentResponse.data };
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
