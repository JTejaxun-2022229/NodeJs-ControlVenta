import { request, response } from "express";
import Receipt from './receipt.model.js';
import Product from '../product/product.model.js';
import User from '../user/user.model.js';


export const createReceipt = async (req, res) => {
    try {
        const { userName, products } = req.body;

        let user = await User.findOne({ name: userName });
        if (!user) {
            return res.status(404).json({ msg: 'User not found' });
        }

        for (const productItem of products) {
            const product = await Product.findOne({ productName: productItem.productName });
            if (!product) {
                return res.status(400).json({ msg: `Product ${productItem.productName} not found` });
            }

            if (productItem.quantity > product.stock) {
                return res.status(400).json({ msg: `Insufficient stock for product ${productItem.productName}` });
            }
        }

        let totalAmount = 0;
        for (const productItem of products) {
            const product = await Product.findOne({ productName: productItem.productName });
            totalAmount += product.unitPrice * productItem.quantity;
        }

        const receipt = new Receipt({
            user: user._id,
            products,
            totalAmount
        });

        await receipt.save();

        for (const productItem of products) {
            const product = await Product.findOne({ productName: productItem.productName });
            product.stock -= productItem.quantity;
            await product.save();
        }

        user.receipts.push(receipt._id);
        await user.save();

        res.status(201).json({ msg: 'Receipt created successfully', receipt });
        
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: 'Internal server error' });
    }
};

export const getReceipts = async (req, res) => {
    try {
        const [total, receipts] = await Promise.all([
            Receipt.countDocuments(),
            Receipt.find()
        ]);
        res.status(200).json({ total, receipts });
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: 'Internal server error' });
    }
};

export const getReceiptsByUser = async (req, res) => {
    try {
        const { userId } = req.params;

        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ msg: 'User not found' });
        }

        const receipts = await Receipt.find({ user: userId });

        res.status(200).json({ receipts });

    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: 'Internal server error' });
    }
};

export const updateReceipt = async (req, res) => {
    try {
        const { receiptId } = req.params;
        const updateData = req.body;

        const updatedReceipt = await Receipt.findByIdAndUpdate(receiptId, updateData, { new: true });

        if (!updatedReceipt) {
            return res.status(404).json({ msg: 'Receipt not found' });
        }

        res.status(200).json({ msg: 'Receipt updated successfully', receipt: updatedReceipt });

    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: 'Receipt can not be update' });
    }
};
