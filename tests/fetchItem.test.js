require('../mocks/fetchSimulator');
const { fetchItem } = require('../helpers/fetchItem');
const item = require('../mocks/item');

describe('2 - Teste a função fecthItem', () => {
  test('1. Teste se `fetchItem` é uma função', ()=> {
    expect(typeof fetchItem).toBe('function');
  });

  test('2. Execute a função `fetchItem` com o argumento do item "MLB1615760527" e teste se `fetch` foi chamada', async () => {
    const teste2 = await fetchItem('MLB1615760527');
    expect(fetch).toHaveBeenCalled();
  });

  test('3. Teste se, ao chamar a função `fetchItem` com o argumento do item "MLB1615760527", a função `fetch` utiliza o endpoint "https://api.mercadolibre.com/items/MLB1615760527"', async () => {
    const teste3 =  await fetchItem('MLB1615760527');
    expect(fetch).toHaveBeenLastCalledWith('https://api.mercadolibre.com/items/MLB1615760527');
  });

  test('4. Teste se o retorno da função `fetchItem` com o argumento do item "MLB1615760527" é uma estrutura de dados igual ao objeto `item` que já está importado no arquivo.', async () => {
    const teste4 = await fetchItem('MLB1615760527');
    expect(teste4).toEqual(item);
  });

  test('5.  Teste se, ao chamar a função `fetchItem` sem argumento, retorna um erro com a mensagem: `You must provide an url`', async () => {
    const teste5 = await fetchItem();
    expect(teste5).toEqual(new Error('You must provide an url'));
  });
});
