require('../mocks/fetchSimulator');
const { fetchProducts } = require('../helpers/fetchProducts');
const computadorSearch = require('../mocks/search');

describe('1 - Teste a função fecthProducts', () => {
  test('1. Teste se `fetchProducts` é uma função', ()=> {
    expect(typeof fetchProducts).toBe('function');
  });
  
  test('2. Execute a função `fetchProducts` com o argumento "computador" e teste se `fetch` foi chamada;', async () => {
    const teste2 = await fetchProducts('computador');
    expect(fetch).toHaveBeenCalled()
  });

  test('3. Ao chamar a função `fetchProducts` com o argumento "computador", a função `fetch` utiliza o endpoint "https://api.mercadolibre.com/sites/MLB/search?q=computador', async () => {
    const teste3 =  await fetchProducts('computador');
    expect(fetch).toHaveBeenLastCalledWith('https://api.mercadolibre.com/sites/MLB/search?q=computador')
  });

  test('4. Retorno da função `fetchProducts` com o argumento "computador" é uma estrutura de dados igual ao objeto `computadorSearch`, que já está importado no arquivo.', async () => {
    const teste4 = await fetchProducts('computador');
    expect(teste4).toEqual(computadorSearch.results);
  });

  test('5. Teste se, ao chamar a função `fetchProducts` sem argumento, retorna um erro com a mensagem: `You must provide an url`', async () => {
    const teste5 = await fetchProducts();
    expect(teste5).toEqual(new Error('You must provide an url'));
  });
});
