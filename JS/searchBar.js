// searchBar.js
document.addEventListener('DOMContentLoaded', () => {
    const searchInput = document.getElementById('searchInput');
    const searchResults = document.getElementById('searchResults');
  
    searchInput.addEventListener('input', handleSearch);
  
    function handleSearch() {
      const query = searchInput.value.toLowerCase();
      const results = performSearch(query);
      displayResults(results);
    }
  
    function performSearch(query) {
      // Example search logic
      const products = [
        'Product 1',
        'Product 2',
        'Product 3',
        'Another Product',
        'Some Product'
      ];
  
      const results = products.filter(product =>
        product.toLowerCase().includes(query)
      );
  
      return results;
    }
  
    function displayResults(results) {
      searchResults.innerHTML = '';
  
      results.forEach(result => {
        const resultElement = document.createElement('p');
        resultElement.textContent = result;
        searchResults.appendChild(resultElement);
      });
    }
  });
  
