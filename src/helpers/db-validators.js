import Role from '../role/role.model.js';
import Category from '../category/category.model.js';

export const isRoleValid = async (role = '') => {
    const existeRol = await Role.findOne({ role });
    if (!existeRol) {
        throw new Error(`Role ${role} does not exist in the database`);
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

export const disableCategory = async (id = '') => {
    const categoryStatus = await Category.findOne({ id });
    if (!categoryStatus.status){
        throw new Error (`Category with ${id} is alredy disable`)
    }
}