import { Request, Response } from "express";
import Product from "../models/Product.model";
import colors from "colors";

const getProducts = async (req: Request, res: Response) => {
    try {
        const products = await Product.findAll({
            attributes: ["id", "name", "price", "description"],
        });
        res.status(200).json({
            data: products,
        });
    } catch (error) {
        console.log(error);
    }
};

const getProductById = async (req: Request, res: Response) => {
    const { id } = req.params;

    try {
        const product = await Product.findByPk(id, {
            attributes: ["id", "name", "price", "description"],
        });
        if (!product) {
            return res.status(404).json({
                error: `No existe un producto con el id ${id}`,
            });
        }
        res.status(200).json({
            data: product,
        });
    } catch (error) {
        console.log(error);
    }
};

const createProduct = async (req: Request, res: Response) => {
    console.log(req.body);

    const { name } = req.body;
    //* SE MIGRA LA VALIDACION AL ROUTER Y MIDDLEWARE PARA QUE EL CONTROLADOR SOLO REALICE LO QUE DEBE HACER Y NO MAS TAREAS
    //Validacion
    // await check("name")
    //     .notEmpty()
    //     .withMessage("El nombre del producto no puede ir vacio")
    //     .run(req);

    // await check("price")
    //     .isNumeric()
    //     .withMessage("Valor no válido")
    //     //*reglas personalizadas
    // .custom((value) => {
    //     //value es el valor que ingresamos
    //     if (value <= 0) {
    //         return false;
    //     }
    // })
    // .withMessage("El precio no puede ser menor a 0")
    //     //*con return implicito para reducir codigo
    //     .custom((value) => value <= 0)
    //     .withMessage("El precio no puede ser menor a 0")
    //     .notEmpty()
    //     .withMessage("El precio del producto no puede ir vacio")
    //     .run(req);

    // let errors = validationResult(req);
    // if (!errors.isEmpty()) {
    //     return res.status(400).json({
    //         errors: errors.array(),
    //     });
    // }
    //* SE MIGRA LA VALIDACION AL ROUTER Y MIDDLEWARE PARA QUE EL CONTROLADOR SOLO REALICE LO QUE DEBE HACER Y NO MAS TAREAS

    //*Forma 1 de insertar usando new
    // const product = new Product(req.body);
    // console.log(colors.magenta(`${product}`));
    // const savedProduct = await product.save();
    // res.status(201).json({
    //     msg: `Se creo el producto ${name} exitosamente`,
    //     data: savedProduct,
    // });

    //*Forma 2 de insertar usando create
    try {
        const product = await Product.create(req.body);
        //?En creacion se debe retornar el 201
        res.status(201).json({
            msg: `Se creo el producto ${name} exitosamente`,
            data: product,
        });
    } catch (error) {
        console.log(error);
    }
};

const updateProduct = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        const product = await Product.findByPk(id, {
            attributes: ["id", "name", "price", "description"],
        });
        if (!product) {
            return res.status(404).json({
                error: `No existe un producto con el id ${id}`,
            });
        }
        //*put realiza modificaciones totales con lo que se envie con update te proteje y solo actualiza lo que envies aunque como existe validaciones no llegaria aca pero por seguridad adicional
        await product.update(req.body);
        await product.save();

        res.status(200).json({
            data: product,
        });
    } catch (error) {
        console.log(error);
    }
};

const updateAvailability = async (req: Request, res: Response) => {
    const { id } = req.params;

    try {
        const product = await Product.findByPk(id);
        if (!product) {
            return res.status(404).json({
                error: `No existe un producto con el id ${id}`,
            });
        }

        //*Actualizar con patch
        //? debemos enviar un req.body
        // product.availability = req.body.availability

        //?usando dataValues para no tener que enviar un req.body ya que simplemente pondra el valor contrario al que posee esto debido a que es boolean
        product.availability = !product.dataValues.availability;
        await product.save();

        res.status(200).json({
            data: product,
        });
    } catch (error) {
        console.log(error);
    }
};

const deleteProduct = async (req: Request, res: Response) => {
    const { id } = req.params;

    try {
        const product = await Product.findByPk(id);
        if (!product) {
            return res.status(404).json({
                error: `No existe un producto con el id ${id}`,
            });
        }

        await product.destroy();

        res.status(200).json({
            msg: "Producto eliminado correctamente",
        });
    } catch (error) {
        console.log(error);
    }
};

export {
    getProducts,
    getProductById,
    createProduct,
    updateProduct,
    updateAvailability,
    deleteProduct,
};
