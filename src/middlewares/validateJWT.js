import jwt from "jsonwebtoken";
import User from "../user/user.model.js";
import { request, response } from "express";

export const validateJWT = async (req = request, res = response, next) => {
    const token = req.header('x-token');

    if (!token) {
        return res.status(401).json({ msg: 'There are not token in request' });
    }

    try {
        const { uid } = jwt.verify(token, process.env.SECRETPRIVATEKEY);
        const user = await User.findById(uid);

        if (!user) {
            return res.status(401).json({ msg: "User does not exist in the database" });
        }

        if (!user.status) {
            return res.status(401).json({ msg: "Invalid Token, user with status false" });
        }

        req.user = user;
        next();

    } catch (e) {
        console.log(e);
        res.status(401).json({ msg: "Invalid Token" })
    }
}