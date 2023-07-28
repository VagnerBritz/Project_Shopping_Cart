const priceItem = document.querySelector('.total-price');
const pai = document.querySelector('.cart__items');
const buttonClearCart = document.querySelector('.empty-cart');

// Esta função (saveData)recebi ajuda do colega Eduardo Bazler

// Pega os itens que estão no carrinho e atualiza o localStorage e a funcao de soma do carrinho
function saveData() { 
  const itensCarrinho = document.querySelectorAll('.cart__item');
  const itens = [];
  itensCarrinho.forEach((element) => itens.push(element.innerText));
  objetoData = { itens };
  saveCartItems(objetoData);
  return itensCarrinho;
}

// parte da lógica deste exercício contei com a ajuda de meu irmão Lucas, que me ajudou na parte de extrair o valor do innerText
function sumCart() { // soma o valor do carrinho e mostra na tag  class total-price.
  let totalAPagar = 0;
  const itensCarrinho = saveData();
   itensCarrinho.forEach((element) => {
     const valor = element.innerText
     .split('PRICE: $');// corta o conteudo a partir deste ponto.
     totalAPagar += parseFloat(valor[1]);// valor 1 corresponde a parte após o corte,ou seja, apenas o valor.
    });
    priceItem.innerText = totalAPagar;
}

function createProductImageElement(imageSource) { // Default. Monta a imagem do produto
  const img = document.createElement('img');
  img.className = 'item__image';
  img.src = imageSource;
  return img;
}

function createCustomElement(element, className, innerText) {
  const e = document.createElement(element);
  e.className = className;
  e.innerText = innerText;
  return e;
}

function createProductItemElement({ sku, name, image }) { // Cria os elementos na tela
  const section = document.createElement('section');
  section.className = 'item';  
  section.appendChild(createCustomElement('span', 'item__sku', sku));
  section.appendChild(createCustomElement('span', 'item__title', name));
  section.appendChild(createProductImageElement(image));
  section.appendChild(createCustomElement('button', 'item__add', 'Adicionar ao carrinho!'));
  document.getElementsByClassName('items')[0].appendChild(section);// inserted
  return section;
}

  function cartItemClickListener(event) { // Remove o item ao ser clicado (do carrinho de compras).
    event.target.remove();
    saveData();
    sumCart();
  }
  
  function createCartItemElement({ sku, name, salePrice }) {
    const li = document.createElement('li');
    li.className = 'cart__item';
    li.innerText = `SKU: ${sku} | NAME: ${name} | PRICE: $${salePrice}`;
    li.addEventListener('click', cartItemClickListener);
    return li;
  }
  // (start) pega os dados vindos do fetchProducts manipula e envia para ser criado os itens na tela. chamada assim que abrir o programa.
  async function start() {
    const objectREsult = await fetchProducts('computador');
    const carregando = document.querySelector('.loading');// mensagem inicial de carregando
    carregando.remove('h3');
    objectREsult.forEach((element) => {
      const { id, title, thumbnail } = element;
    const dados = { sku: id, name: title, image: thumbnail };
    createProductItemElement(dados);
  });
}

// Fiz esse requisito com a ajuda do colega Eduardo;

async function addListCard(event) { // Adiciona o item clicado ao carrinho de compras
  const item = event.target.closest('.item');
  const idItem = item.querySelector('.item__sku').innerText;
  const objetoId = await fetchItem(idItem);
  const { id, title, price } = objetoId;
  const data = { sku: id, name: title, salePrice: price };
  createCartItemElement(data);
  pai.appendChild(createCartItemElement(data));
  saveData();
  sumCart();
}

function clearCartFunction() { /// função do botão esvaziar carrinho
  pai.innerHTML = '';
  localStorage.clear();
  sumCart();
}

buttonClearCart.addEventListener('click', clearCartFunction);// escutador

function addToCard() {
  const buttonAdd = document.querySelectorAll('.item__add');
  buttonAdd.forEach((item) => item.addEventListener('click', addListCard));
}

 function getStorageItens() { // busca os itens do localStorage
   const listaSalva = JSON.parse(getSavedCartItems()).itens;
   listaSalva.forEach((element) => {
      const li = document.createElement('li');
      li.className = 'cart__item';
      li.innerText = element;
      li.addEventListener('click', cartItemClickListener);
      pai.appendChild(li);
      sumCart();
   });
 }

window.onload = async () => { 
  await start();
  addToCard();
  getStorageItens();
};
