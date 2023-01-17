const fetchProductByID = (ProductID) => fetch(`https://api.mercadolibre.com/items/${ProductID}`);

export const fetchProduct = async (ProductID) => {
  if (ProductID === undefined) {
    throw new Error('ID não informado');
  }
  const response = await fetchProductByID(ProductID);
  const data = await response.json();
  return data;
};

const fetchSearch = (QUERY) => fetch(`https://api.mercadolibre.com/sites/MLB/search?q=${QUERY}`);

export const fetchProductsList = async (QUERY) => {
  if (QUERY === undefined) {
    throw new Error('Termo de busca não informado');
  }
  const response = await fetchSearch(QUERY);
  const data = await response.json();

  const { results } = data;
  return results;
};
