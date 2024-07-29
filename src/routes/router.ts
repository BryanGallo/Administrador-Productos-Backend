import { Router } from "express";

const router = Router();

router.get("/", (req, res) => {
    res.send("Hola desde Get");
});

export default router;
