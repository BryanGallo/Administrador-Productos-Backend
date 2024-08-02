import { Table, Model, Column, DataType, Default } from "sequelize-typescript";

@Table({
    tableName: "products",
})
class Product extends Model {
    @Column({
        type: DataType.STRING,
    })
    name!: string;

    @Column({
        type: DataType.DECIMAL(10, 2),
    })
    price!: number;

    @Column({
        type: DataType.STRING,
    })
    description!: string;

    @Default(true)
    @Column({
        type: DataType.BOOLEAN,
        // defaultValue: true,//otra opcion para colocar el valor por default
    })
    availability: boolean;
}

export default Product;
