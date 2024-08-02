import { Request, Response } from "express";
import Product from "../models/Product.model";
import colors from "colors";

const createProduct = async (req: Request, res: Response) => {
    console.log(req.body);
    
    const { name } = req.body;

    const product = new Product(req.body);
    console.log(colors.magenta(`${product}`));
    product.save();

    res.status(200).json({ msg: `Se creo el producto ${name} exitosamente` });
};

export { createProduct };
