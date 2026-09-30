let products = [
  { id: 1, name: "Laptop", price: 50000 },
  { id: 2, name: "Phone", price: 20000 },
  { id: 3, name: "Headphones", price: 2000 }
];

const getProducts = () => {
  return products;
};

const getProductById = (id) => {
  return products.find((product) => product.id === Number(id));
};

const addProduct = (product) => {
  const newProduct = {
    id: products.length + 1,
    ...product
  };

  products.push(newProduct);
  return newProduct;
};

const updateProduct = (id, data) => {
  const index = products.findIndex(
    (product) => product.id === Number(id)
  );

  if (index === -1) return null;

  products[index] = {
    ...products[index],
    ...data
  };

  return products[index];
};

const deleteProduct = (id) => {
  const index = products.findIndex(
    (product) => product.id === Number(id)
  );

  if (index === -1) return null;

  return products.splice(index, 1)[0];
};

module.exports = {
  getProducts,
  getProductById,
  addProduct,
  updateProduct,
  deleteProduct
};
