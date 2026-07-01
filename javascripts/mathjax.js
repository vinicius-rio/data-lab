window.MathJax = {
  tex: {
    inlineMath: [['$', '$'], ['\\(', '\\)']],
    displayMath: [['$$', '$$'], ['\\[', '\\]']],
    processEscapes: true,
    processEnvironments: true
  }
};

document$.subscribe(() => {
  if (window.MathJax?.typesetPromise) {
    MathJax.typesetPromise();
  }
});