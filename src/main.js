import { searchCep } from './helpers/cepFunctions';
import { fetchProduct, fetchProductsList } from './helpers/fetchFunctions';
import { createProductElement, createCartProductElement } from './helpers/shopFunctions';
import { getSavedCartIDs } from './helpers/cartFunctions';
import './style.css';

document.querySelector('.cep-button').addEventListener('click', searchCep);
const productsDiv = document.querySelector('.products');
const localCart = getSavedCartIDs();
const totalPrice = document.querySelector('.total-price');

const appendLoadingText = () => {
  const loadingText = document.createElement('h4');
  loadingText.innerText = 'carregando...';
  loadingText.className = 'loading';
  productsDiv.appendChild(loadingText);
};

const removeLoadingText = () => {
  const loading = document.querySelector('.loading');
  productsDiv.removeChild(loading);
};

const fillProducts = async () => {
  try {
    const products = await fetchProductsList('computador');
    const sectionArray = products.map((item) => createProductElement(item));
    removeLoadingText();
    sectionArray.map((item) => document.querySelector('.products').appendChild(item));
  } catch (error) {
    removeLoadingText();
    const elementoErro = document.createElement('h1');
    elementoErro.innerText = 'Algum erro ocorreu, recarregue a página e tente novamente';
    elementoErro.className = 'error';
    document.querySelector('.products').appendChild(elementoErro);
  }
};

const fillCart = async () => {
  let priceSum = 0;
  localCart.map((produto) => fetchProduct(produto)
    .then((response) => {
      priceSum += response.price;
      const li = createCartProductElement(response);
      document.querySelector('.cart__products').appendChild(li);
      totalPrice.innerHTML = priceSum;
    }));
};

appendLoadingText();

fillProducts();

fillCart();
