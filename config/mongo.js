'use strict'

import mongoose from "mongoose";
import Role from '../src/role/role.model.js'
import Category from '../src/category/category.model.js'

export const dbConnection = async () => {
    try {
        mongoose.connection.on('error', () => {
            console.log('MongoDB | could not be connect to mongodb')
            mongoose.disconnect();
        });
        mongoose.connection.on('connecting', () => {
            console.log('MongoDB | Try connecting');
        });
        mongoose.connection.on('connected', () => {
            console.log('MongoDB | connected to mongoDB');
        });
        mongoose.connection.on('open', () => {
            console.log('MongoDB | connected to database')
        });
        mongoose.connection.on('reconnected', () => {
            console.log('MongoDB | reconnected to MongoDB')
        });
        mongoose.connection.on('disconnected', () => {
            console.log('MongoDB | disconnected')
        });

        await mongoose.connect(process.env.URI_MONGO, {
            serverSelectionTimeoutMS: 5000,
            maxPoolSize: 100
        });

        const existingRoles = await Role.find({});

        const rolesToInsert = [
            { role: 'ADMIN_ROLE' },
            { role: 'CLIENT_ROLE' }
        ].filter(newRole => !existingRoles.some(existingRole => existingRole.role === newRole.role));

        if (rolesToInsert.length > 0) {
            await Role.insertMany(rolesToInsert);
            console.log('Roles inserted:', rolesToInsert);
        } else {
            console.log('No new roles to insert');
        };

        const existingCategory = await Category.findOne({ categoryName: 'Products' });

        if (!existingCategory) {
            const defaultCategory = new Category({ categoryName: 'Products' });
            await defaultCategory.save();
            console.log('Category inserted:', defaultCategory);
        } else {
            console.log('Default category is already insert');
        };

    } catch (e) {
        console.log('Database connection failed', e);
    };
};