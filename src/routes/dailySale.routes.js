import express from "express";
import dailySaleController from "../controller/dailySale.controller.js";

const router = express.Router();

router.post("/", dailySaleController.addSale);
router.get("/",dailySaleController.getSale);
router.get("/:id",dailySaleController.getById);
router.put("/:id", dailySaleController.updateSale);
router.delete("/:id", dailySaleController.deleteSale);

export default router;

