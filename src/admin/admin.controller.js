import { response, request } from "express";
import bcryptjs from 'bcryptjs';
import Admin from './admin.model.js';

export const adminPost = async (req = request, res = response) => {
    const { name, email, password, role } = req.body;
    const admin = new Admin({ name, email, password, role });

    const salt = bcryptjs.genSaltSync();
    admin.password = bcryptjs.hashSync(password, salt);

    await admin.save();

    res.status(200).json({ admin });
};

export const adminGet = async (req = request, res = response) => {
    const { searchKey, ...filters } = req.query;
    const query = { status: true };
    let searchQuery = {};

    if (searchKey) {
        searchQuery = { $or: [{ name: { $regex: new RegExp(searchKey, 'i') } }] };
    }

    Object.keys(filters).forEach(key => {
        query[key] = { $regex: new RegExp(filters[key], 'i') }
    });

    try {
        const [total, companies] = await Promise.all([
            Company.countDocuments({ ...query, ...searchQuery }),
            Company.find({ ...query, ...searchQuery })
                .sort(sortQuery)
                .skip(Number(from))
                .limit(Number(limit))
        ]);

        res.status(200).json({
            total,
            companies
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

export const adminPut = async (req, res = response) => {
    const { id } = req.params;
    const { _id, password, email, ...remain } = req.body;

    if (password) {
        const salt = bcryptjs.genSaltSync();
        admin.password = bcryptjs.hashSync(password, salt);
    }

    await Admin.findByIdAndUpdate(id, remain);

    const admin = await Admin.findById({ _id: id });

    res.status(200).json({ msg: 'Admin was update', admin });
};

export const adminDelete = async (req, res) => {
    const { id } = req.params;

    const admin = await Admin.findByIdAndUpdate(id, { status: false });

    res.status(200).json({ msg: 'Admin has been disable', admin })
}