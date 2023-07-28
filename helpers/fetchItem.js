const fetchItem = async ($ItemID) => {
  try {
  const response = await fetch(`https://api.mercadolibre.com/items/${$ItemID}`);
  const itemID = await response.json();
  return itemID;
  } catch (error) {
  return error;
  }
};

if (typeof module !== 'undefined') {
  module.exports = {
    fetchItem,
  };
}
