
const Product = require("../module/product")
const cloudinary = require("cloudinary").v2;
    

async function addProduct(req , res) {
  try{
      const {name, description, price, category, subCategory, sizes, bestSeller } = req.body

    if(!name || !description || !price || !category || !subCategory || !sizes || !bestSeller){
            return res.status(400).json({message: "product details are missing"
            })
        }
   
      let image1, image2, image3, image4
    

      if (req.files.image1) {
          image1 = req.files.image1[0]
      }

      if (req.files.image2) {
          image2 = req.files.image2[0]
      }

      if (req.files.image3) {
          image3 = req.files.image3[0]
      }

      if (req.files.image4) {
          image4 = req.files.image4[0]
      }
        const image = [image1 , image2, image3, image4].filter((itma)=> itma !== undefined)
        let imagesUrl = await Promise.all(
            image.map(async (item) => {
                let result = await cloudinary.uploader.upload(item.path, {resource_type: "image"})
                
                return {url: result.secure_url,
                       public_id: result.public_id}
                
                  
            })
        )
   
        const product = await Product.create({
            name, 
            description,
            price: Number(price),
            category,
            subCategory,
            sizes: JSON.parse(sizes),
            bestSeller: bestSeller === "true" ? true : false,
            images: imagesUrl,
            
        })
 return res.status(200).json({
           
            message: "product added successfully",
            data: product
        })
} catch(error){
        console.log(error)
        return res.status(500).json({
            success: false,
            message: "Error adding product",
            error: error.message
        })
    }
}



async function listProducts(_req, res){
    try{
        const products = await Product.find().sort({createdAt: -1})
        return res.status(200).json({
            message: "products fetched successfully",
            data: products
        })
    } catch(error){
        console.log(error)
        return res.status(500).json({   
            success: false,
            error: error.message
        })
    }
}

async function getProductById(req, res){
    try{
        const { productId } = req.params
        if(!productId){
            return res.status(400).json({message: "Product id is missing"})
        }

        const product = await Product.findById(productId)
        if(!product){
            return res.status(404).json({message: "Product not found"})
        }

        return res.status(200).json({
            message: "Product fetched successfully",
            data: product
        })
    } catch(error){
        console.log(error)
        return res.status(500).json({success: false, error: error.message})
    }
}

async function addReview(req,res){
    try{
        const { productId } = req.params
        const { rating, text } = req.body

        if(!productId || !rating || !text){
            return res.status(400).json({message: "Missing review data"})
        }
        
        if(rating < 1 || rating > 5){
            return res.status(400).json({message: "Rating must be between 1 and 5"})
        }

        const product = await Product.findById(productId)
        if(!product){
            return res.status(404).json({message: "Product not found"})
        }

        const userId = req.user?.id
        if(!userId){
            return res.status(401).json({message: "Unauthorized"})
        }

        const user = await require("../module/user").findById(userId)
        if(!user){
            return res.status(404).json({message: "User not found"})
        }

        const review = {
            userId: user._id,
            userName: user.name,
            rating,
            text,
            date: new Date()
        }

        product.reviews.push(review)
        await product.save()

        return res.status(200).json({
            message: "Review added successfully",
            data: product.reviews
        })
    } catch(error){
        console.log(error)
        return res.status(500).json({success: false, error: error.message})
    }
}

async function deleteReview(req,res){
    try{
        const { productId, reviewId } = req.params
        if(!productId || !reviewId){
            return res.status(400).json({message: "Missing params"})
        }

        const product = await Product.findById(productId)
        if(!product){
            return res.status(404).json({message: "Product not found"})
        }

        const initialLength = product.reviews.length
        product.reviews = product.reviews.filter((review) => review._id.toString() !== reviewId)

        if(product.reviews.length === initialLength){
            return res.status(404).json({message: "Review not found"})
        }

        await product.save()

        return res.status(200).json({
            message: "Review deleted successfully",
            data: product.reviews
        })
    } catch(error){
        console.log(error)
        return res.status(500).json({success: false, error: error.message})
    }
}

async function getProductReviews(req, res){
    try {
        const { productId } = req.params
        if (!productId) {
            return res.status(400).json({ message: "Product id is missing" })
        }

        const product = await Product.findById(productId)
        if (!product) {
            return res.status(404).json({ message: "Product not found" })
        }

        return res.status(200).json({
            message: "Product reviews fetched successfully",
            data: product.reviews
        })
    } catch (error) {
        console.log(error)
        return res.status(500).json({ success: false, error: error.message })
    }
}

async function removeProduct(req, res){
    try{
        const { productId } = req.params 
        
        if(!productId){
            return res.status(400).json({
                message: "product id is missing"
            })
        }

        const product = await Product.findById(productId)

        if(!product){
            return res.status(404).json({
                message: "product not found"
            })
        }

        await Promise.all(
            product.images.map((img) => 
                cloudinary.uploader.destroy(img.public_id)
            )
        )

        await Product.findByIdAndDelete(productId)

        return res.status(200).json({
            message: "product and images deleted successfully"
        })

    }catch(error){
        console.log(error)
        return res.status(500).json({
            success:false,
            error:error.message
        })
    }
}

module.exports = {addProduct, listProducts, getProductById, getProductReviews, addReview, deleteReview, removeProduct}