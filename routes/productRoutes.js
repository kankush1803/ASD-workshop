const express = require("express");

const router = express.Router();

const controller = require("../controllers/productController");
const { cacheMiddleware } = require("../middleware/cache");

// GET routes use caching middleware

router.get(
  "/products",
  cacheMiddleware,
  controller.getProducts
);

router.get(
  "/products/:id",
  cacheMiddleware,
  controller.getProductById
);

// Modification routes

router.post(
  "/products",
  controller.addProduct
);

router.put(
  "/products/:id",
  controller.updateProduct
);

router.patch(
  "/products/:id",
  controller.updateProduct
);

router.delete(
  "/products/:id",
  controller.deleteProduct
);

module.exports = router;
