const z = require("zod")

const userRegisterType = z.object({
  name: z.string().min(2, "Name must be at least 2 characters").max(50, "Name must be less than 50 characters").trim(),
  email: z.string().email("Invalid email format").transform(val => val.toLowerCase()),
  password: z.string().min(6, "Password must be at least 6 characters").max(100, "Password is too long")
});


const userLoginType = z.object({
    email: z.string().email("Invalid email format").transform(val => val.toLowerCase()),
   password: z.string().min(1, "Password is required")
})



module.exports = {userRegisterType, userLoginType}