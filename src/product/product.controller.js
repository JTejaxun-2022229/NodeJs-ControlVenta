import { request, response } from 'express';
import Product from './product.model';

export const createProduct = async (res = response, req = request) => {
    const { productName, details, unitPrice, stock, category } = req.body;
    const product = new Product({ productName, details, unitPrice, stock, category });

    await product.save();

    res.status(200).json({ msg: 'Product create successfully', product });
}

export const getProduct = async (res = response, req = request) => {
    const { from, limit, searchKey, ...filters } = req.query;
    const query = { status: true };
    if (category && category !== 'Products') {
        query.category = category;
    } else if (!category) {
        query.category = { $ne: 'Products' };
    }
    let searchQuery = {};

    if (searchKey) {
        searchQuery = { $or: [{ productName: { $regex: new RegExp(searchKey, 'i') } }] };
    }

    Object.keys(filters).forEach((key) => {
        query[key] = { $regex: new RegExp(filters[key], 'i') };
    });

    try {
        const [total, products] = await Promise.all([
            Product.countDocuments({ ...query, ...searchQuery }),
            Product.find({ ...query, ...searchQuery })
                .skip(Number(from))
                .limit(Number(limit))
        ]);
        res.status(200).json({
            total,
            products
        })
    } catch (error) {
        res.status(500).json({ msg: 'Internal Server Error' });
    }
}

export const updateProduct = async (req, res = response) => {
    const {id} = req.params;
    const {_id, status, ...remain} = req.body;

    await Product.findByIdAndUpdate(id, remain);

    const product = await Product.finOne({_id: id});

    res.status(200).json({msg: 'Product was update', product})
}

export const deleteProduct = async (req, res ) => {
    const {id} = req.params;

    const product = await Product.findByIdAndUpdate(id, {status: false});

    res.status(200).json({msg: 'Product has been disable', product})
}