const express = require("express");
const app = express() 
const mongoose = require("mongoose");
const Product = require('./models/productModel')
app.use(express.json())
// routes 
app.get('/',(req,res)=>{
    res.send('Hello node Api')
})
app.get('/blog',(req,res)=>{
    res.send('Hello Blog from node Api')
})
// post data to db
app.post('/products',async(req,res)=>{
    try{
        const product = await Product.create(req.body)
        res.status(200).json(product)
    }
    catch(error){
        console.log(error.message)
        res.status(500).json({message:error.message})
    }
})
// get data from db 
app.get('/products',async(req,res)=>{
    try{
        const products = await Product.find({})
        res.status(200).json(products)
    }
    catch(error){
        res.status(500).json({message:error.message})
    }
})
// get specific product 
app.get('/products/:id',async(req,res)=>{
    try{
        const {id} = req.params
        const product = await Product.findById(id)
        res.status(200).json(product)
    }
    catch(error){
        res.status(500).json({message:error.message})
    }
})

// update or edit data
app.put("/products/:id",async(req,res)=>{
    try{
        const {id} = req.params
        const product = await Product.findByIdAndUpdate(id,req.body)
        if(!product){
            // can't find product in database
            return res.status(404).json({message:`can't find product with id - ${id}`})
        }
        const updatedProduct = await Product.findById(id)
        res.status(200).json(updatedProduct);
    }
    catch(error){
        res.status(500).json({message:error.message})
    }
})
// delete a product 
app.delete('/products/:id',async(req,res)=>{
    try{
        const {id} = req.params
        const product = await Product.findByIdAndDelete(id);
        if(!product){
            return res.status(404).json({message:`can't find any product with id - ${id}`})
        }
        res.status(200).json(product)
    }
    catch(error){
        res.status(500).json({message:error.message})
    }
})
mongoose.connect('mongodb+srv://guptashatmanyu:7jJWdrDPqCN0U0CZ@cluster0.ppfzd0i.mongodb.net/Node-Api?retryWrites=true&w=majority')
.then(() => {
    app.listen(3000,()=>{
        console.log("server is running on 3000") 
    })
    console.log("mongo db connected")
}).catch((err)=>{
    console.log("error",err)
})