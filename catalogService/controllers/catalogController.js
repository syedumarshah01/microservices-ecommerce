import Product from "../models/productModel.js"


const getAllProducts  = async (req, res) => {

    try{
        const allProducts = await Product.find({})

        if(allProducts.length) {
            return res.status(200).json(allProducts)
        } else {
            return res.status(200).json({message: "No products found..."})
        }
        
    } catch(err) {
        return res.status(500).json({message: "Failed to fetch products...", error: err})
    }
    

    
}

const addNewProduct = async (req, res) => {
    const {title, price, description, imageUrl} = req.body ?? {}

    if(!title || !price || !description) {
        return res.status(400).json({message: "Invalid data passed..."})   
    }
    const newProductObject = {
        title,
        price,
        description,
        imageUrl
    }

    try {
        const product = await Product.create(newProductObject)

        if(!product) {
            return res.status(500).json({message: "Product couldn't be created..."})
        }
        res.status(201).json({message: "Product created successfully..."})        
    } catch(err) {
        return res.status(500).json({message: "Product creation failed..."})
    }
    
}


const updateProduct = async(req, res) => {
    const {title, price, description, imageUrl} = req.body ?? {}
    if(!title || !price || !description) {
        return res.status(400).json({message: "All fields are required..."})
    }

    try {
        const productToBeUpdated = await Product.findOne({title: title})
        productToBeUpdated.title = title
        productToBeUpdated.price = price
        productToBeUpdated.description = description
        productToBeUpdated.imageUrl = imageUrl

        await productToBeUpdated.save()
        return res.json({message: "Product updated...", updatedProduct: productToBeUpdated})
    } catch(err) {
        res.status(500).json({message: "Error updating the product...", error: err})
    }
}


export {
    getAllProducts,
    addNewProduct,
    updateProduct
}