import { response, request } from "express";
import Category from './category.model.js';

export const categoryPost = async (req = request, res = response) => {
    const { categoryName } = req.body;
    const category = new Category({ categoryName });

    await category.save();

    res.status(200).json({ category });
};

export const categoryGet = async (req = request, res = response) => {
    const { from, limit, searchKey, ...filters } = req.query;
    const query = { status: true };
    let searchQuery = {};

    if (searchKey) {
        searchQuery = { $or: [{ categoryName: { $regex: new RegExp(searchKey, 'i') } }] };
    }

    Object.keys(filters).forEach((key) => {
        query[key] = { $regex: new RegExp(filters[key], 'i') };
    });

    try {
        const [total, categories] = await Promise.all([
            Category.countDocuments({ ...query, ...searchQuery }),
            Category.find({ ...query, ...searchQuery })
                .skip(Number(from))
                .limit(Number(limit))
        ]);
        res.status(200).json({
            total,
            categories
        })
    } catch (error) {
        res.status(500).json({ msg: 'Internal Server Error' });
    }
};

export const categoryPut = async (req, res = response) => {
    const { id } = req.params;
    const { _id, status, ...remain } = req.body;

    await Category.findByIdAndUpdate(id, remain);

    const category = await Category.findById({ _id: id });

    res.status(200).json({ msg: 'Category was udpate', category });
}

export const categoryDelete = async (req, res) => {
    const { id } = req.params;

    const category = await Category.findByIdAndUpdate(id, { status: false });

    res.status(200).json({ msg: 'Category has been disbale', category });
}