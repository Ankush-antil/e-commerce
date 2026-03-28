
const Product = require("../module/product")
const cloudinary = require("cloudinary").v2;
    

async function addProduct(req , res) {
  try{
      const {name, description, price, category, subCategory, sizes, bestSeller } = req.body

    if(!name || !description || !price || !category || !subCategory || !sizes || !bestSeller){
            return res.status(400).send({message: "product details are missing"
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
 return res.status(200).send({
           
            message: "product added successfully",
            data: product
        })
} catch(error){
        console.log(error)
        return res.status(400).send({
            success: false,
            error: error.message
    
}
  )}}



async function listProducts(_req, res){
    try{
        const products = await Product.find().sort({createdAt: -1})
        return res.status(200).send({
            message: "products fetched successfully",
            data: products
        })
    } catch(error){
        console.log(error)
        return res.status(404).send({   
            success: false,
            error: error.message
        })
    }
}
async function removeProduct(req, res){
    try{
        const { productId } = req.params 
        
        if(!productId){
            return res.status(400).send({
                message: "product id is missing"
            })
        }

        const product = await Product.findById(productId)

        if(!product){
            return res.status(404).send({
                message: "product not found"
            })
        }

        await Promise.all(
            product.images.map((img) => 
                cloudinary.uploader.destroy(img.public_id)
            )
        )

        await Product.findByIdAndDelete(productId)

        return res.status(200).send({
            message: "product and images deleted successfully"
        })

    }catch(error){
        console.log(error)
        return res.status(500).send({
            success:false,
            error:error.message
        })
    }
}

  module.exports = {addProduct ,listProducts,removeProduct}