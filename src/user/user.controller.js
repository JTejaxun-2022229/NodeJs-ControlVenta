import { request, response } from "express";
import { compareUser } from "../middlewares/validateJWT.js";
import bcryptjs from "bcryptjs";
import User from "../user/user.model.js";

export const createUser = async (req = request, res = response) => {
    const { name, email, password, role } = req.body;
    const user = new User({ name, email, password, role });

    const salt = bcryptjs.genSaltSync();
    user.password = bcryptjs.hashSync(password, salt);

    await user.save();

    res.status(200).json({ msg: 'User create successfully', user });
}

export const getUser = async (req = request, res = response) => {
    const { from, limit, searchKey, ...filters } = req.query;
    const query = { status: true };
    let searchQuery = {};

    if (searchKey) {
        searchQuery = { $or: [{ name: { $regex: new RegExp(searchKey, 'i') } }] };
    }

    Object.keys(filters).forEach((key) => {
        query[key] = { $regex: new RegExp(filters[key], 'i') };
    });

    try {
        const [total, users] = await Promise.all([
            User.countDocuments({ ...query, ...searchQuery }),
            User.find({ ...query, ...searchQuery })
                .skip(Number(from))
                .limit(Number(limit))
        ]);
        res.status(200).json({
            total,
            users
        })
    } catch (error) {
        res.status(500).json({ msg: 'Internal Server Error' });
    }
}

export const updateUser = async (req, res = response) => {
    const { id } = req.params;
    const token = req.header('x-token');

    const match = await compareUser(id, token);

    if (!match) {
        return res.status(401).json({ msg: "This user is not yours, you can not modify" });
    }

    const { _id, password, email, role, ...remain } = req.body;

    if (password) {
        const salt = bcryptjs.genSaltSync();
        remain.password = bcryptjs.hashSync(password, salt);
    }

    await User.findByIdAndUpdate(id, remain);

    const user = await User.findOne({ _id: id });

    res.status(200).json({ msg: 'User was update', user })
}

export const deleteUser = async (req, res) => {
    const { id } = req.params;
    const token = req.header('x-token');

    const match = await compareUser(id, token);

    if (!match) {
        return res.status(401).json({ msg: "This user is not yours, you can not modify" });
    }
    
    const user = await User.findByIdAndUpdate(id, { status: false });

    res.status(200).json({ msg: 'User has been disable', user })
}