import Box from "./Box";
import ItemModel from "./ItemModel";

export default interface BoxItems {
    id: number,
    boxId: number,
    itemId: number,
    amount: number,

    box?: Box,
    item?: ItemModel
}