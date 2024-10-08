import mongoose from 'mongoose'

const productSchema = new mongoose.Schema(
    {
        id: {type: Number, required: true},
        name: {type: String, required: true, unique: true},
        img: {type: String},
        type: {type: String, required: true},
        price: {type: Number, required: true},
        countInStock: {type: Number, required: true},
        discount: {type: Number, required: true},
        description: {type: Object},
    },
    {
        timestamps: true,
    }
)

const Product = mongoose.model('Product', productSchema);

export default Product;

