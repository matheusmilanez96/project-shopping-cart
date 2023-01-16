export const fetchProduct = () => {
  // seu código aqui
};

const fetchProductByQuery = (QUERY) => fetch(`https://api.mercadolibre.com/sites/MLB/search?q=${QUERY}`);

export const fetchProductsList = async (QUERY) => {
  if (QUERY === undefined) {
    throw new Error('Termo de busca não informado');
  }
  const response = await fetchProductByQuery(QUERY);
  const data = await response.json();

  const { results } = data;
  return results;
};
