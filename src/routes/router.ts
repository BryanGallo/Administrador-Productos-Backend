import { Router } from "express";
import { createProduct } from "../controllers/productController";

const router = Router();

router.get("/", (req, res) => {
    res.send("Hola desde Get");
});

router.post("/", createProduct);

export default router;
