const themeToggleButton = document.getElementById('theme-toggle');
  themeToggleButton.addEventListener('click', () => {
    if (document.documentElement.getAttribute('data-theme') === 'dark') {
      document.documentElement.removeAttribute('data-theme');
      themeToggleButton.textContent = 'Toggle Dark Mode';
    } else {
      document.documentElement.setAttribute('data-theme', 'dark');
      themeToggleButton.textContent = 'Toggle Light Mode';
    }
  });

  document.addEventListener('DOMContentLoaded', async function () {
    try {
      const response = await fetch('/api/snippets');
      const snippets = await response.json();
      const snippetList = document.getElementById('snippet-list');

      snippets.forEach(snippet => {
        const listItem = document.createElement('li');
        const codeBlock = document.createElement('pre');
        const codeElement = document.createElement('code');
        codeElement.classList.add('c++');
        codeElement.textContent = snippet.content;

        codeBlock.appendChild(codeElement);
        listItem.appendChild(document.createElement('strong').appendChild(document.createTextNode(snippet.name.replace('.md', '.cpp'))));
        listItem.appendChild(codeBlock);

        const copyButton = document.createElement('button');
        copyButton.textContent = 'Copy';
        copyButton.addEventListener('click', () => {
          navigator.clipboard.writeText(snippet.content).then(() => {
            copyButton.textContent = 'Copied!';
            setTimeout(() => {
              copyButton.textContent = 'Copy';
            }, 2000);
          }).catch(err => {
            console.error('Error copying text: ', err);
          });
        });

        listItem.appendChild(copyButton);
        snippetList.appendChild(listItem);

        // Apply syntax highlighting
        hljs.highlightBlock(codeElement);
      });
    } catch (error) {
      console.error('Error fetching snippets:', error.message);
    }
  });