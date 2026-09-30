const db = require("../database/productDatabase");

const getProducts = () => {
  return db.getProducts();
};

const getProductById = (id) => {
  return db.getProductById(id);
};

const addProduct = (product) => {
  return db.addProduct(product);
};

const updateProduct = (id, data) => {
  return db.updateProduct(id, data);
};

const deleteProduct = (id) => {
  return db.deleteProduct(id);
};

module.exports = {
  getProducts,
  getProductById,
  addProduct,
  updateProduct,
  deleteProduct
};
