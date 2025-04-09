// const mongoose=require("mongoose")

// const productSchema=new mongoose.Schema({
//   stockCode:String,
//   stock:Number,
//   name:String,
//   description:String,
//   // quantity:Number,
//   price:Number,
//   // weight:Number,
//   //image_url:String,
//   category: 
//   { type: String}, // New field
// //  unit: { type: String, required: true }   ,
// image: { type: String},
// quantity:{
//   type:Number,
//   default:1
// }
// })

// const  productModel=mongoose.models.product || mongoose.model("product",productSchema)
// module.exports=productModel

const mongoose=require("mongoose")
const productSchema = new mongoose.Schema({
  stockCode: String,
  stock: Number,
  name: String,
  description: String,
  price: Number,
  category: String,
  image: String,
  quantity: { type: Number, default: 1 },
  ratings: [{
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'customer' }, // If users are logged in
    rating: { type: Number, required: true, min: 1, max: 5 },
    review: { type: String, trim: true },
    createdAt: { type: Date, default: Date.now }
  }],
  averageRating: { type: Number, default: 0 } // For quick access
});

const  productModel=mongoose.models.product || mongoose.model("product",productSchema)
module.exports=productModel