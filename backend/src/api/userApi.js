const userApi = require("express").Router()
const userControler = require("../controller/userController")
const authMiddleware = require("../middleware/authMiddleware")

userApi.use("/user", authMiddleware.checkUserToken)

//user

userApi.get("/user/getInforOwn", userControler.getInforOwn)
userApi.put("/user/updateInforOwn", userControler.updateInforOwn)
userApi.delete("/user/deleteOwn", userControler.deleteOwn)

module.exports = { userApi }
