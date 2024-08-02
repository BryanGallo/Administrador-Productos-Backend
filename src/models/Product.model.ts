import { Table, Model, Column, DataType, Default } from "sequelize-typescript";

@Table({
    tableName: "products",
})
class Product extends Model {
    @Column({
        type: DataType.STRING,
    })
    declare name: string;

    @Column({
        type: DataType.DECIMAL(10, 2),
    })
    declare price: number;

    @Column({
        type: DataType.STRING,
    })
    declare description: string;

    @Default(true)
    @Column({
        type: DataType.BOOLEAN,
        // defaultValue: true,//otra opcion para colocar el valor por default
    })
    declare availability: boolean;
}

export default Product;
