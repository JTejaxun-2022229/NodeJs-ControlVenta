import Role  from '../role/role.model.js';
import Admin from '../admin/admin.model.js';

export const isRoleValid = async (role = '') => {
    const existeRol = await Role.findOne({role});
    if(!existeRol){
        throw new Error(`Role ${ role } does not exist in the database`);
    }
}

export const existEmailAdmin = async (email = '') => {
    const existeEmail = await Admin.findOne({email});
    if(existeEmail){
        throw new Error(`Email ${ email } is already registered`);
    }
}

export const existAdminById = async (id = '') => {
    const existAdmin = await Admin.findOne({id});
    if(existAdmin){
        throw new Error(`Admin with ${ id } does not exist`)
    }
}