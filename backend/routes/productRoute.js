import express from 'express';
import data from '../data';
import Product from '../models/productModel';
import { isAdmin, isAuth } from '../util';



const router = express.Router();

// router.get("/", (req, res) => {
//   res.send(data.products);
// })

// router.get("/:id", (req, res) => { 
//   const productId = req.params.id;
//   const product = data.products.find(product => product._id == productId)
//   if (product) {
//     res.send(product);
//   } else {
//     res.status(404).send({ message: 'Product Not Found'});
//   }
// })

router.get("/:id", async (req, res) => { 
  const productId = req.params.id;
  const products = await Product.find({});
  const product = products.find(product => product._id == productId)
  if (product) {
    res.send(product);
  } else {
    res.status(404).send({ message: 'Product Not Found'});
  }
})


router.get("/", async (req, res) => {
  const category = req.query.category ? { category: req.query.category} : {};
  const searchKeyWord = req.query.searchKeyWord
                    ? {
                      name: {
                        $regex: req.query.searchKeyWord,
                        $options: 'i'
                      }
                    } : {};
  const products = await Product.find({ ...category, ...searchKeyWord});
  res.send(products);
})

router.post('/', async (req, res) => {
  const product = new Product({
    name: req.body.name,
    price: req.body.price,
    image: req.body.image,
    category: req.body.category,
    description: req.body.description,
    inventory: {
      colorList: req.body.colorList,
      details: req.body.inventory,
      imagesList: req.body.imagesList
    }
  });
  const newProduct = await product.save();
  if (newProduct) {
    return res.status(201).send({ message: 'New Product Created', data: newProduct });
  } 
  return res.status(500).send({ message: 'Error in creating products.'})
})

router.put('/:id', async (req, res) => {
  const productId = req.params.id;
  const product = await Product.findOne({_id: productId});
  if (product) {
    product.name = req.body.name,
    product.price = req.body.price,
    product.image = req.body.image,
    product.category = req.body.category,
    product.description = req.body.description,
    product.inventory.colorList = req.body.colorList,
    product.inventory.details = req.body.inventory,
    product.inventory.imagesList = req.body.imagesList 
  }

  const updatedProduct = product.save();
  if (updatedProduct) {
    return res.status(200).send({ message: 'A product updated', data: updatedProduct });
  } 
  return res.status(500).send({ message: 'Error in updating products.'})
})

router.delete("/:id", async (req, res) => {
  const deletedProduct = await Product.findById(req.params.id);
  if (deletedProduct) {
    await deletedProduct.remove();
    res.send({ msg: 'The product deleted'})
  } else {
    res.send({ msg: 'Error in deleting the product.'})
  }
})

export default router;