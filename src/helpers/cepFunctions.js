const errorMessage = 'CEP não encontrado';

const cepFetch = async (CEP) => {
  let response;
  try {
    response = await Promise.any([
      await (await fetch(`https://cep.awesomeapi.com.br/json/${CEP}`)).json(),
      await (await fetch(`https://brasilapi.com.br/api/cep/v2/${CEP}`)).json(),
    ]);
  } catch (error) {
    return errorMessage;
  }
  const data = await response;
  if (!Object.keys(data).includes('city')) {
    return errorMessage;
  }
  return data;
};

export const getAddress = async (CEP) => {
  if (CEP === '') {
    return errorMessage;
  }
  const address = await cepFetch(CEP);
  if (address === errorMessage) {
    return address;
  }
  let street;
  let neighborhood;
  if (Object.keys(address).includes('street')) {
    street = address.street;
    neighborhood = address.neighborhood;
  } else {
    street = address.address;
    neighborhood = address.district;
  }
  const { city, state } = address;
  return `${street} - ${neighborhood} - ${city} - ${state}`;
};

export const searchCep = async () => {
  const cartAddress = document.querySelector('.cart__address');
  const cepInput = document.querySelector('.cep-input');
  const address = await getAddress(cepInput.value);
  cartAddress.innerHTML = address;
};
