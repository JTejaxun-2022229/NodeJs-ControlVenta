import bcryptjs from 'bcryptjs';
import User from '../user/user.model.js'
import { generateJWT } from '../helpers/generateJWT.js';

export const login = async (req, res) => {
    const { email, password } = req.body;

    try {

        const user = await User.findOne({ email });

        if (!user) {
            return res.status(400).json({
                msg: "Incorrect credentials, Email does not exist in the database",
            });
        }

        if (!user.status) {
            return res.status(400).json({
                msg: "User does not exist in the database",
            });
        }

        const validPassword = bcryptjs.compareSync(password, user.password);
        if (!validPassword) {
            return res.status(400).json({
                msg: "Password is incorrect",
            });
        }

        const token = await generateJWT(user.id);

        res.status(200).json({
            msg: 'Login Successfull, Welcome:',
            user,
            token
        });

    } catch (e) {
        console.log(e);
        res.status(500).json({
            msg: "Contact administrator",
        });
    }
}