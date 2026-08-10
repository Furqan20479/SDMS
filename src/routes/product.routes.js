import productController from "../controller/product.controller.js";
import express from "express";

const router = express.Router();


router.post("/", productController.addProduct);
router.get("/", productController.getProduct);
router.get("/:id",productController.getProductById);
router.put("/:id", productController.updateProduct);
router.delete("/:id", productController.deleteProduct);


export default router;


