export const fetchData = resource => params => {
  return fetch(`https://static.pxl.ai/problem/data/${resource}`, {
    method: 'GET',
    ...params,
  }).then(res => {
    if (res.status !== 200) {
      throw new Error('Failed to fetch');
    }
    return res.json();
  });
};

export const getProductsData = fetchData('products.json');

export const getRegionsData = fetchData('regions.json');
