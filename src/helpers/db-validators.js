import Role from '../role/role.model.js';
import Admin from '../admin/admin.model.js';
import Category from '../category/category.model.js';

export const isRoleValid = async (role = '') => {
    const existeRol = await Role.findOne({ role });
    if (!existeRol) {
        throw new Error(`Role ${role} does not exist in the database`);
    }
}

export const existEmailAdmin = async (email = '') => {
    const existeEmail = await Admin.findOne({ email });
    if (existeEmail) {
        throw new Error(`Email ${email} is already registered`);
    }
}

export const existAdminById = async (id = '') => {
    const existAdmin = await Admin.findOne({ id });
    if (existAdmin) {
        throw new Error(`Admin with ${id} does not exist`)
    }
}

export const disableAdmin = async (status = '') => {
    const adminStatus = await Admin.findOne({ id });
    if (adminStatus) {
        throw new Error(`Admin with ${id} is alredy disable`)
    }
}

export const existCategory = async (categoryName = '') => {
    const existName = await Category.findOne({ categoryName });
    if (existName) {
        throw new Error(`Category ${categoryName} already exists.`);
    }
}

export const existCategoryById = async (id = '') => {
    const existCategory = await Category.findOne({ id });
    if (existCategory) {
        throw new Error(`Category with ${id} does not exist`)
    }
}

export const disableCategory = async (status = '') => {
    const categoryStatus = await Category.findOne({ id });
    if (categoryStatus){
        throw new Error (`Category with ${id} is alredy disable`)
    }
}