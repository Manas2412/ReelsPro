import mongoose, { Schema, model, models } from "mongoose";

export interface IProduct {
    _id?: mongoose.Types.ObjectId;
    name: string;
    description: string;
    imageUrl: string;
    price?: number;
    createdAt?: Date;
    updatedAt?: Date;
}

const productSchema = new Schema<IProduct>({
    name: { type: String, required: true },
    description: { type: String, required: true },
    imageUrl: { type: String, required: true },
    price: { type: Number, min: 0 }
}, { timestamps: true });

const Product = models?.Product || model<IProduct>("Product", productSchema);

export default Product;
