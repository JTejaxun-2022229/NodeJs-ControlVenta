import { request, response } from "express";
import Receipt from './receipt.model.js';
import User from '../user/user.model.js'
import Product from '../product/product.model.js';

export const createReceipt = async (req = request, res = response) => {

    try {

        const { productName, quantity, userEmail } = req.body;

        const product = await Product.findOne({ productName });

        if (!product) {
            return res.status(404).json({ msg: "Product not found" });
        }

        const subtotal = product.unitPrice * quantity;

        if (product.stock < quantity) {
            return res.status(400).json({ msg: "Insufficient stock" });
        }

        const user = await User.findOne({ email: userEmail });

        if (!user) {
            return res.status(404).json({ msg: "User not found" });
        }

        const receipt = new Receipt({
            user: user._id,
            products: [{
                product: product._id,
                quantity,
                subtotal
            }],
            totalAmount: subtotal
        });

        await receipt.save();

        product.stock -= quantity;
        await product.save();

        res.status(201).json(receipt);
        
    } catch (error) {
        res.status(500).json({ msg: error.msg });
    }
};

export const getReceipts = async (req, res) => {
    try {
        const receipts = await Receipt.find().populate({
            path: 'user',
            select: 'email'
        }).populate({
            path: 'products.product',
            select: ['productName', 'unitPrice']
        });

        const total = receipts.length;

        res.status(200).json({
            total: total,
            data: receipts,
        });

    } catch (err) {
        console.error(err);
        res.status(500).json({ msg: 'Server Error' });
    }
};

export const getReceiptsByUser = async (req, res) => {
    try {
        const { id } = req.params

        const receipts = await Receipt.find({ user: id }).populate({
            path: 'user',
            select: 'email'
        }).populate({
            path: 'products.product',
            select: ['productName', 'unitPrice']
        });

        const total = receipts.length;

        res.status(200).json({
            total: total,
            data: receipts,
        });

    } catch (err) {
        console.error(err);
        res.status(500).json({ msg: 'Server Error' });
    }
};