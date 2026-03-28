    const mongoose = require("mongoose")
    const Order = require("../module/order")
    const User = require("../module/user")
    const sendEmail = require("./emailcontrol")
 
    async function placeOrderCOD(req, res){
        try{
            const {userId, address, items, amount} = req.body

            if(!userId || !address || !items || !amount){
                return res.status(400).send({message: "Missing required fields"})
            }

            const newOrder = await Order.create({
                userId,
                items,
                amount,
                address,
                status: "Order Placed",
                paymentMethod: "COD",
                payment: false,
                date: new Date()
            })
            

            if (newOrder) {
                const user = await User.findById(userId)

                if (user) {
                    user.cart = []
                    await user.save()
                    await sendEmail(
                        user.email,
                        "Order Confirmation",
                        `Hello ${user.name},
                            Your order has been placed successfully.

                    Order ID: ${newOrder._id}
                    Status: ${newOrder.status}
                    Thank you for shopping with us!`
                    );
                }
            }
            
            return res.status(200).send({
                success: true,
                message: "Order placed successfully",
                order: newOrder
            })
        }
        catch(error){
            console.log(error)
            return res.status(500).send({
                success: false, 
                error: error.message
            })
        }
    }




    async function getUserOrders(req, res) {
        try{
            const { userId } = req.body;
            
            if (!userId) {
                return res.status(400).send({ message: "Missing userId" });
            }

            const orders = await Order.aggregate([
                {
                    $match: {
                    userId: new mongoose.Types.ObjectId(userId)
                    }
                },
                {
                    $sort: { date: -1 }
                },
                {
                    $unwind: "$items"
                },
                {
                    $lookup: {
                    from: "products",
                    localField: "items.productId",
                    foreignField: "_id",
                    as: "product"
                    }
                },
                {
                    $unwind: {
                    path: "$product",
                    preserveNullAndEmptyArrays: true
                    }
                },
                {
                    $group: {
                    _id: "$_id",
                    userId: { $first: "$userId" },
                    amount: { $first: "$amount" },
                    address: { $first: "$address" },
                    status: { $first: "$status" },
                    paymentMethod: { $first: "$paymentMethod" },
                    payment: { $first: "$payment" },
                    date: { $first: "$date" },
                    createdAt: { $first: "$createdAt" },
                    updatedAt: { $first: "$updatedAt" },
                    items: {
                        $push: {
                        productId: "$items.productId",
                        size: "$items.size",
                        quantity: "$items.quantity",
                        product: {
                            name: "$product.name",
                            images: "$product.images",
                            price: "$product.price"
                        }
                        }
                    }
                    }
                }
                ]);


            return res.status(200).send({
                success: true,
                data: orders
            });
        }
        catch(error){
            console.log(error)
            return res.status(500).send({
                success: false, 
                error: error.message
            })
        }
    }




    async function allOrders(req, res) {
        try{
            const orders = await Order.aggregate([
                {
                    $sort: { date: -1 }
                },
                {
                    $unwind: "$items"
                },
                {
                    $lookup: {
                    from: "products",
                    localField: "items.productId",
                    foreignField: "_id",
                    as: "product"
                    }
                },
                {
                    $unwind: {
                    path: "$product",
                    preserveNullAndEmptyArrays: true
                    }
                },
                {
                    $group: {
                    _id: "$_id",
                    userId: { $first: "$userId" },
                    amount: { $first: "$amount" },
                    address: { $first: "$address" },
                    status: { $first: "$status" },
                    paymentMethod: { $first: "$paymentMethod" },
                    payment: { $first: "$payment" },
                    date: { $first: "$date" },
                    createdAt: { $first: "$createdAt" },
                    updatedAt: { $first: "$updatedAt" },
                    items: {
                        $push: {
                        productId: "$items.productId",
                        size: "$items.size",
                        quantity: "$items.quantity",
                        product: {
                            name: "$product.name",
                            images: "$product.images",
                            price: "$product.price"
                        }
                        }
                    }
                    }
                }
                ]);
            return res.status(200).send({
                success: true,
                data: orders
            });
        }
        catch(error){
            console.log(error)
            return res.status(500).send({
                success: false, 
                error: error.message
            })
        }
    }




    const updateOrderStatus = async (req, res) => {
    try {
        const { orderId, status } = req.body

        await Order.findByIdAndUpdate(orderId, { status })

        res.status(200).send({
        success: true,
        message: "Order status updated"
        })
    } catch (error) {
        res.status(500).send({
        success: false,
        message: error.message
        })
    }
    }
    async function removeOrder (req, res){
        try{
            const {orderId} = req.body
        
            
            if(!orderId){
                return res.status(400).send({
                    message: "order id is missing"
                })
            }

            const order = await Order.findById(orderId) 

            if(!order){
                return res.status(404).send({
                    message: "Order not found"
                })
            }

        
            await Order.findByIdAndDelete(orderId)
               const user = await User.findById(order.userId)

            if (user) {
                await sendEmail(
                    user.email,
                    "Order Cancelled",
                    `Hello ${user.name},

                    Your order has been cancelled successfully.
                   Order ID: ${order._id}
                   If you did not cancel this order please contact support.`
                )
            }
            return res.status(200).send({
                message: "order deleted successfully"
            })

        }catch(error){
            console.log(error)
            return res.status(500).send({
                success:false,
                error:error.message
            })
        }
    }


    module.exports = { placeOrderCOD, getUserOrders, allOrders, updateOrderStatus,removeOrder }





