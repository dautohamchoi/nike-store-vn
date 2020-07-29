import mongoose from 'mongoose';



const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: Number, default: 0, required: true },
  image: { type: String, required: true },
  category: { type: String, required: true },
  description: { type: String, required: true },
  inventory: { 
    colorList: { type: Array, required: true},
    details: { type: Array, required: true},
    imagesList : { type: Array, required: true} 
  }
});

const productModel = mongoose.model("Product", productSchema);


export default productModel;
