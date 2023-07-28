function getSavedCartItems() {  
  const itensSalvos = localStorage.getItem('cartItems');
  return itensSalvos;
}

if (typeof module !== 'undefined') {
  module.exports = getSavedCartItems;
}
