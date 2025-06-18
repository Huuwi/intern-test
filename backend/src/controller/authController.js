const Users = require("../modelORMs/Users")
const commonHelper = require("../helper/commonHelper")
const jwt = require('jsonwebtoken');


const login = async (req, res) => {
    try {
        const username = req?.body?.username
        const password = req?.body?.password
        if (!username || !password) {
            return res.status(400).json({
                message: "missing data!"
            })
        }

        let hashedPass = commonHelper.md5(password)

        let findedUser = await Users.findOne({
            where: {
                username,
                password: hashedPass
            },
            attributes: {
                // exclude: ['password', 'isDelete']
            }
        })

        if (!findedUser) {
            return res.status(400).json({
                message: "username or password not correct!"
            })
        }

        console.log(findedUser);


        if (findedUser.isDelete) {
            return res.status(400).json({
                message: "your account has been deleted!"
            })
        }

        const token = jwt.sign({
            userId: findedUser.userId,
            nickName: findedUser.nickName,
            isAdmin: findedUser.isAdmin
        }, process.env.JWT_KEY, { expiresIn: 60 * 60 * 24 })

        res.cookie("accessToken", token, {})

        return res.status(200).json({
            message: "ok",
            userData: findedUser,
            refreshToken: jwt.sign({
                userId: findedUser.userId,
                nickName: findedUser.nickName,
                isAdmin: findedUser.isAdmin
            }, process.env.JWT_KEY, { expiresIn: 60 * 60 * 24 })
        })
    } catch (error) {
        console.log("have wrong when login : ", error)
        res.status(500).json({
            message: "have wrong!"
        })
    }
}

const register = async (req, res) => {
    try {
        const { username, password, nickName, phone, email, avatar } = req.body;

        if (!username || !password || !nickName || !phone || !email || !avatar) {
            return res.status(400).json({
                message: "Missing required data!",
                received: { username, password, nickName, phone, email, avatar }
            });
        }

        if (!/^\d{10}$/.test(phone)) {
            return res.status(400).json({ message: "Phone invalid" });
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return res.status(400).json({ message: "Email invalid" });
        }

        const existingUser = await Users.findOne({
            where: { username },
            attributes: {
                exclude: ['password', 'isDelete', "isAdmin"]
            }
        });

        if (existingUser) {
            return res.status(400).json({
                message: "Username already exists!"
            });
        }

        const hashedPass = commonHelper.md5(password);

        const newUser = await Users.create({
            username,
            password: hashedPass,
            nickName,
            isAdmin: false,
            isDelete: false,
            email,
            avatar,
            phone
        });

        const token = jwt.sign({
            userId: newUser.userId,
            nickName: newUser.nickName,
            isAdmin: newUser.isAdmin
        }, process.env.JWT_KEY, { expiresIn: 60 * 60 * 24 })

        res.cookie("accessToken", token, {})

        return res.status(201).json({
            message: "Register success!",
            userData: newUser
        });
    } catch (error) {
        console.log("Error in register: ", error);
        res.status(500).json({
            message: "Something went wrong!"
        });
    }
};



const logout = async (req, res) => {
    try {
        res.clearCookie("accessToken");
        return res.status(200).json({
            message: "logout success!"
        });
    } catch (error) {
        console.log("have wrong when logout : ", error);
        res.status(500).json({
            message: "have wrong!"
        });
    }
}




const authControler = { login, register, logout }

module.exports = authControler
