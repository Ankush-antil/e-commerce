const z = require("zod")

const userRegisterType = z.object({
  name: z.string(),
  email: z.string(),
  password: z.string()
});


const userLoginType = z.object({
    email: z.string(),
   password : z.string()
})



module.exports = {userRegisterType, userLoginType}