document.addEventListener('DOMContentLoaded', function (e) {
    console.log('Saluton mondo');

    // Insert the current year in the footer
    var dateSpan = document.getElementById('currentYear');
    dateSpan.textContent = new Date().getFullYear();

    // Initialize highlight.js for syntax highlighting.
    // hljs.initHighlighting();
});
