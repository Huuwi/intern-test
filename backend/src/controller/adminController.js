const Users = require("../modelORMs/Users")


const getAllUser = async (req, res) => {
    try {
        const users = await Users.findAll({
            where: {
                isDelete: false
            },
            attributes: {
                // exclude: ['password', 'isDelete', "isAdmin"]
            }
        });
        res.status(200).json(users);
    } catch (error) {
        console.error('Error fetching users:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
}


const updateUserById = async (req, res) => {

    try {
        const userId = req.body.userId;
        const { nickName, email, phone, avatar, status } = req.body || {};
        if (!nickName && !email && !phone && !avatar && !status) {
            return res.status(400).json({ message: 'No fields to update' });
        }
        if (!userId) {
            return res.status(400).json({ message: "User ID is required" });
        }

        const user = await Users.findOne({ where: { id: userId, isDelete: false } });
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        if (!Number(phone) && phone.length != 10 && phone) {
            return res.status(400).json({ message: "Phone invalid" });
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (email && !emailRegex.test(email)) {
            return res.status(400).json({ message: "Email invalid" });
        }

        const validStatuses = ['single', 'married'];
        if (status && !validStatuses.includes(status)) {
            return res.status(400).json({ message: "Status invalid" });
        }

        user.nickName = nickName !== undefined ? nickName : user.nickName;
        user.email = email !== undefined ? email : user.email;
        user.phone = phone !== undefined ? phone : user.phone;
        user.avatar = avatar !== undefined ? avatar : user.avatar;
        user.status = status !== undefined ? status : user.status;

        await user.save();

        const { password, isDelete, isAdmin, ...userData } = user.toJSON();
        res.status(200).json(userData);
    } catch (error) {
        console.error('Error updating user info:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
}


const deleteUserById = async (req, res) => {

    try {
        const userId = req.body.userId;

        const user = await Users.findOne({ where: { id: userId, isDelete: false } });
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        user.isDelete = true;
        await user.save();

        res.status(200).json({ message: "User deleted successfully" });
    } catch (error) {
        console.error('Error deleting user:', error);
        res.status(500).json({ message: 'Internal server error' });
    }

}


const adminControler = {
    getAllUser, updateUserById, deleteUserById
}


module.exports = adminControler
