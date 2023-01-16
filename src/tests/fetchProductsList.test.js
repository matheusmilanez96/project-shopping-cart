import './mocks/fetchSimulator';
import { fetchProductsList } from '../helpers/fetchFunctions';
import computadorSearch from './mocks/search';

// implemente seus testes aqui
describe('Teste a função fetchProductsList', () => {
  it('fetchProductsList é uma função', () => {
    expect(typeof fetchProductsList).toBe('function');
  });

  it('fetch é chamado ao executar fetchProductsList', async () => {
    await fetchProductsList('computador');
    expect(fetch).toHaveBeenCalled();
  });

  it('fetch é chamado com o endpoint correto ao executar fetchProductsList', async () => {
    await fetchProductsList('computador');
    expect(fetch).toHaveBeenCalledWith('https://api.mercadolibre.com/sites/MLB/search?q=computador');
  });

  it('retorno da função é igual ao objeto computadorSearch', async () => {
    const expected = computadorSearch;
    const actual = fetchProductsList('computador');
    expect(actual).toEqual(expected);
  });

  it('ao chamar a função sem argumento, retorna um erro com a mensagem', async () => {
    expect(await fetchProductsList()).toThrow(new Error('Termo de busca não informado'));
  });
});
