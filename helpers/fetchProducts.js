const fetchProducts = async (produto) => {
  try {
  const response = await fetch(`https://api.mercadolibre.com/sites/MLB/search?q=${produto}`);
  const objeto = await response.json();
  const objectREsult = objeto.results;
  return objectREsult;
  } catch (error) {
    return error;
  }
};

if (typeof module !== 'undefined') {
  module.exports = {
    fetchProducts,
  };
}
