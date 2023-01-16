import { searchCep } from './helpers/cepFunctions';
import { fetchProductsList } from './helpers/fetchFunctions';
import { createProductElement } from './helpers/shopFunctions';
import './style.css';

document.querySelector('.cep-button').addEventListener('click', searchCep);

const products = await fetchProductsList('computador');

const sectionArray = products.map((item) => createProductElement(item));

sectionArray.map((item) => document.querySelector('.products').appendChild(item));
