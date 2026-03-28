const User = require("../module/user")

async function addToCart(req, res){
   try{
       const {userId, productId, size} = req.body

       if(!userId || !productId || !size){
        return res.status(400).send({message: "Missing required fields"})
       }
      const user = await User.findById(userId)
       if(!user){
        return res.status(400).send({message: "User not found"})
       }
       
       // find product with same productId and size
       const existingCartItem = user.cart.find(item => item.productId.toString() === productId && item.size === size)

       // if found, increment quantity else add new item
       if(existingCartItem){
        existingCartItem.quantity += 1
       } 
       else{
        user.cart.push({productId, size, quantity: 1})
       }

       await user.save()

       return res.status(200).send({
        message: "Item added to cart",
        cart: user.cart
       })
   } catch(error){
        console.log(error)
        return res.status(500).send({
            success: false, 
            error: error.message
        })
    }
}

async function updateCart(req, res){
    try{
    const {userId, productId, size, quantity} = req.body
    if(!userId || !productId || !size || quantity === undefined){
        return res.status(400).send({message: "Missing required fields"})
    }
    
    const user = await User.findById(userId)
       if(!user){
        return res.status(400).send({message: "User not found"})
    }
    
     // find product with same productId and size
    const existingCartItem = user.cart.find(item => item.productId.toString() === productId && item.size === size)

    if(!existingCartItem){
        return res.status(400).send({message: "cart item not found"})
    }

    const existingCartItemIndex = user.cart.indexOf(existingCartItem)

    if(quantity <= 0){
        user.cart.splice(existingCartItemIndex, 1)
    }
    else{
        existingCartItem.quantity = quantity
    }

    await user.save()

    return res.status(200).send({
        message: "Cart updated successfully",
        cart: user.cart
    })

    } catch(error){
        console.log(error)
        return res.status(500).send({
            success: false, 
            error: error.message
        })
    }
}

async function getCart(req, res){
    try{
        const {userId} = req.body
        if(!userId){
            return res.status(400).send({message: "User id is missing"})
        }

        const user = await User.findById(userId)
        if(!user){
            return res.status(400).send({message: "User not found"})
        }

        return res.status(200).send({
            message: "Cart fetched successfully",
            cart: user.cart
        })
    } catch(error){
        console.log(error)
        return res.status(500).send({
            success: false, 
            error: error.message
        })
    }
}


module.exports = {addToCart, updateCart, getCart}