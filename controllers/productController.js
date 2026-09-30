const productService = require("../services/productService");
const { setCache, clearCache } = require("../middleware/cache");

const getProducts = (req, res) => {
  const products = productService.getProducts();

  setCache(req.originalUrl, products);

  res.json(products);
};

const getProductById = (req, res) => {
  const product = productService.getProductById(req.params.id);

  if (!product) {
    return res.status(404).json({
      message: "Product not found"
    });
  }

  setCache(req.originalUrl, product);

  res.json(product);
};

const addProduct = (req, res) => {
  const product = productService.addProduct(req.body);

  clearCache();

  res.status(201).json(product);
};

const updateProduct = (req, res) => {
  const product = productService.updateProduct(
    req.params.id,
    req.body
  );

  if (!product) {
    return res.status(404).json({
      message: "Product not found"
    });
  }

  clearCache();

  res.json(product);
};

const deleteProduct = (req, res) => {
  const product = productService.deleteProduct(req.params.id);

  if (!product) {
    return res.status(404).json({
      message: "Product not found"
    });
  }

  clearCache();

  res.json(product);
};

module.exports = {
  getProducts,
  getProductById,
  addProduct,
  updateProduct,
  deleteProduct
};
