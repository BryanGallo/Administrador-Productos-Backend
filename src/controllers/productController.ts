import { Request, Response } from "express";

const createProduct = async (req: Request, res: Response) => {
    console.log(req.body);

    res.status(200).json(req.body);
};

export { createProduct };
