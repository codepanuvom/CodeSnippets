// Sample code snippets
const codeSnippets = [
    'const greeting = "Hello, World!";',
    'for (let i = 0; i < 5; i++) { console.log(i); }',
    'function add(a, b) { return a + b; }',
    '// Your custom code snippets go here...'
];

// Function to display code snippets
function displayCodeSnippets() {
    const codeContainer = document.getElementById('codeContainer');
    codeSnippets.forEach((snippet, index) => {
        const codeElement = document.createElement('pre');
        codeElement.textContent = snippet;
        codeContainer.appendChild(codeElement);
    });
}

// Display code snippets when the page loads
window.onload = displayCodeSnippets;
