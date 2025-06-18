const Users = require("../modelORMs/Users")


const getInforOwn = async (req, res) => {
    try {
        const userIdOwn = req.decodeAccessToken.userId;
        const user = await Users.findOne({
            where: {
                userId: userIdOwn,
                isDelete: false
            },
            attributes: {
                exclude: ['password', 'isDelete', "isAdmin"]
            }
        })
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json(user);
    } catch (error) {
        console.error('Error fetching user information:', error);

        res.status(500).json({ message: 'Internal server error' });
    }
}


const updateInforOwn = async (req, res) => {
    try {
        const userIdOwn = req.decodeAccessToken.userId;
        const { nickName, phone, avatar, status } = req.body;

        if (!nickName && !phone && !avatar && !status) {
            return res.status(400).json({ message: 'No fields to update' });
        }


        const user = await Users.findOne({
            where: {
                userId: userIdOwn,
                isDelete: false
            },
            attributes: {
                exclude: ['password', 'isDelete', "isAdmin"]
            }
        })
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
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

        const updateFields = {};
        updateFields.nickName = nickName;
        if (phone !== undefined) updateFields.phone = phone;
        if (avatar !== undefined) updateFields.avatar = avatar;
        if (status !== undefined) updateFields.status = status;

        const [updatedRows] = await Users.update(updateFields, {
            where: {
                userId: userIdOwn,
                isDelete: false
            }
        });

        if (updatedRows === 0) {
            return res.status(404).json({ message: 'User not found or no changes made' });
        }


        res.json({
            message: 'User information updated successfully',
        })

    } catch (error) {
        console.error('Error updating user information:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};


const deleteOwn = async (req, res) => {
    try {
        const userIdOwn = req.decodeAccessToken.userId;
        const user = await Users.findOne({
            where: {
                userId: userIdOwn,
                isDelete: false
            },
            attributes: {
                exclude: ['password', 'isDelete', "isAdmin"]
            }
        });

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        const [affectedRows] = await Users.update(
            { isDelete: true },
            {
                where: {
                    userId: userIdOwn,
                    isDelete: false
                }
            }
        );

        console.log("Rows updated:", affectedRows);

        if (affectedRows === 0) {
            return res.status(400).json({ message: 'No user updated' });
        }


        res.json({ message: 'User deleted successfully' });
    } catch (error) {
        console.error('Error deleting user:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

const userControler = {
    getInforOwn, updateInforOwn, deleteOwn
}


module.exports = userControler

