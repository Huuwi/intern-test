const adminApi = require("express").Router()
const adminControler = require("../controller/adminController")
const authMiddleware = require("../middleware/authMiddleware")

adminApi.use("/admin", authMiddleware.checkAdminToken)


//admin

adminApi.get("/admin/getAllUser", adminControler.getAllUser)
adminApi.put("/admin/updateUserById", adminControler.updateUserById)
adminApi.delete("/admin/deleteUserById", adminControler.deleteUserById)

module.exports = { adminApi }
