import { searchCep } from './helpers/cepFunctions';
import { fetchProductsList } from './helpers/fetchFunctions';
import { createProductElement } from './helpers/shopFunctions';
import './style.css';

document.querySelector('.cep-button').addEventListener('click', searchCep);
const productsDiv = document.querySelector('.products');

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

appendLoadingText();

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

fillProducts();
