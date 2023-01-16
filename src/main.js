import { searchCep } from './helpers/cepFunctions';
import { fetchProductsList } from './helpers/fetchFunctions';
import { createProductElement } from './helpers/shopFunctions';
import './style.css';

document.querySelector('.cep-button').addEventListener('click', searchCep);
const productsDiv = document.querySelector('.products');
console.log(productsDiv);

const appendLoadingText = () => {
  const loadingText = document.createElement('h1');
  loadingText.innerText = 'carregando...';
  loadingText.className = 'loading';
  console.log(loadingText);
  productsDiv.appendChild(loadingText);
};

const removeLoadingText = () => {
  const loading = document.querySelector('.loading');
  console.log(loading);
  productsDiv.removeChild(loading);
};

appendLoadingText();

const products = await fetchProductsList('computador');

const sectionArray = products.map((item) => createProductElement(item));

sectionArray.map((item) => document.querySelector('.products').appendChild(item));

removeLoadingText();
