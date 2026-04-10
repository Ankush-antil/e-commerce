require("dotenv").config()
const express = require("express")
const cors = require("cors")
const dbcc = require("./config/db")
const connectCloudinary = require("./controller/cloudinary")
const {signup, register, adminLogin} = require("./controller/usercontrol")
const authAdmin= require("./middelwares/admiauth")
const authUser = require("./middelwares/authUser")
const authAdminOrUser = require("./middelwares/authAdminOrUser")
const { addProduct,updateProduct, listProducts, getProductById, getProductReviews, addReview, deleteReview, seedDemoReviews, seedAllReviews, removeProduct } = require("./controller/productcontrol")
const {placeOrderCOD,getUserOrders,allOrders,updateOrderStatus, removeOrder} = require("./controller/orderControl")
const upload = require("./middelwares/multer")
const { addToCart, updateCart, getCart } = require("./controller/cartcontrol")
const app = express()  
app.use(express.json())
app.use(cors())


dbcc()  // db file (it is use for coonect DB)
connectCloudinary()
app.post("/admin_login",adminLogin)
app.post("/user_register",register)
app.post("/user_signup",signup)

app.post("/add-product", authAdmin,upload.fields([
    { name: 'image1', maxCount: 1 },
    { name: 'image2', maxCount: 1 },
    { name: 'image3', maxCount: 1 },
    { name: 'image4', maxCount: 1 }
]),addProduct)

app.delete("/delete-product/:productId",authAdmin, removeProduct)
app.delete("/delet-order",authUser,removeOrder)
app.get("/list-product",listProducts)
app.get("/product/:productId", getProductById)
app.get("/product/:productId/reviews", getProductReviews)
app.post("/product/:productId/add-review", authUser, addReview)
app.delete("/product/:productId/review/:reviewId", authAdminOrUser, deleteReview)
app.post("/product/:productId/seed-reviews", authAdmin, seedDemoReviews)
app.post("/seed-all-reviews", authAdmin, seedAllReviews)
app.patch("/products/:productId", authAdmin, upload.fields([
    { name: 'image_0', maxCount: 1 },
    { name: 'image_1', maxCount: 1 },
    { name: 'image_2', maxCount: 1 },
    { name: 'image_3', maxCount: 1 }
]), updateProduct)
app.post("/add-to-cart", authUser, addToCart)
app.post("/update-cart", authUser, updateCart)
app.post("/get-cart", authUser, getCart)

app.post("/placeOrderCOD", authUser, placeOrderCOD)
app.post("/User-orders", authUser, getUserOrders)
app.post("/all-orders", authAdmin, allOrders)
app.put("/update-order-status", authAdmin, updateOrderStatus)



const PORT = process.env.PORT || 9000
app.listen(PORT, function(){
    console.log(` connect ${PORT} port`)
})