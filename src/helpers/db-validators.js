import Role from '../role/role.model.js';
import Category from '../category/category.model.js';
import User from '../user/user.model.js'
import Product from '../product/product.model.js';
import Receipt from '../receipt/receipt.model.js';

export const isRoleValid = async (role = '') => {
    const existeRol = await Role.findOne({ role });
    if (!existeRol) {
        throw new Error(`Role ${role} does not exist in the database`);
    }
}

export const existUserById = async (id = '') => {
    const existUser = await User.findOne({ id });
    if (existUser) {
        throw new Error(`User with ${id} does not exit in the database`);
    }
}

export const statusUser = async (id = '') => {
    try {
        const user = await User.findById(id);

        if (!user.status) {
            throw new Error(`User with ${id} is alredy disable`);
        }
    } catch (error) {
        throw new Error("Error:", error.message);
    }
}

export const existEmail = async (email = '') => {
    const emailExist = await User.findOne({ email });
    if (emailExist) {
        throw new Error(`Email ${email} is already registered`);
    }
}

export const existCategoryById = async (id = '') => {
    const existCategory = await Category.findOne({ id });
    if (existCategory) {
        throw new Error(`Category with ${id} does not exist`)
    }
}

export const statusCategory = async (id = '') => {
    try {
        const category = await Category.findById(id);

        if (!category.status) {
            throw new Error(`Category with ${id} is alredy disable`);
        }
    } catch (error) {
        throw new Error("Error:", error.message);
    }
}

export const existCategory = async (categoryName = '') => {
    const existName = await Category.findOne({ categoryName });
    if (existName) {
        throw new Error(`Category ${categoryName} already exists.`);
    }
}

export const existProductById = async (id = '') => {
    const existProduct = await Product.findOne({ id });
    if (existProduct) {
        throw new Error(`Producto with ${id} does not exit in the database`);
    }
}

export const statusProduct = async (id = '') => {
    try {
        const product = await Product.findById(id);

        if (!product.status) {
            throw new Error(`Product with ${id} is alredy disable`);
        }
    } catch (error) {
        throw new Error("Error:", error.message);
    }
}

export const existProduct = async (productName = '') => {
    const existName = await Product.findOne({ productName });
    if (existName) {
        throw new Error(`Product ${productName} already exist`)
    }
}

export const productStock = async (id = '') => {
    const stockProduct = await Product.findOne({ id });
    if (stockProduct.stock === 0) {
        throw new Error(`Product with id ${id} has a stock of 0`);
    }
}

export const existReceiptById = async(id = '') => {
    const existReceipt = await Receipt.finOne({id});
    if(existReceipt){
        throw new Error(`Receipt with ${id} does not exit in the database`);
    }
}