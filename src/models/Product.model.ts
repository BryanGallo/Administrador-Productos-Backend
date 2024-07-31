import { Table, Model, Column, DataType } from "sequelize-typescript";

@Table({
    tableName: "products",
})
class Product extends Model {
    @Column({
        type: DataType.STRING,
    })
    name!: string;

    @Column({
        type: DataType.FLOAT(10, 2),
    })
    price!: number;

    @Column({
        type: DataType.STRING,
    })
    description!: string;

    @Column({
        type: DataType.BOOLEAN,
    })
    availability: boolean;
}
