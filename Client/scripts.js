document.addEventListener('DOMContentLoaded', () => {
    const snippetsContainer = document.getElementById('snippets-container');
  
    // Fetch snippets from the server
    fetch('/api/snippets')
      .then(response => response.json())
      .then(snippets => {
        snippets.forEach(snippet => {
          const snippetElement = document.createElement('div');
          snippetElement.innerHTML = `<h2>${snippet.name}</h2><pre>${snippet.content}</pre>`;
          snippetsContainer.appendChild(snippetElement);
        });
      })
      .catch(error => {
        console.error('Error fetching snippets:', error.message);
      });
  });
  