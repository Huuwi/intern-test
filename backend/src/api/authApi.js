const authApi = require("express").Router()
const authControler = require("../controller/authController")

//test api
authApi.get("/", (req, res) => {
    const forwardedIp = req.headers['x-forwarded-for'] || req.ip
    res.cookie("test", "test")
    res.status(200).json(
        {
            message: "your ip address : " + forwardedIp
        }
    )
})


//auth
authApi.post("/login", authControler.login)
authApi.post("/register", authControler.register)
authApi.post("/logout", authControler.logout)


module.exports = { authApi }
