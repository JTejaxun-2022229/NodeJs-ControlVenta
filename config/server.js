'use strict'

import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import { dbConnection } from './mongo.js';
import authRoutes from '../src/auth/auth.routes.js';
import userRoutes from '../src/user/user.router.js';
import categoryRoutes from '../src/category/category.routes.js';
import productRoutes from '../src/product/product.routes.js';
import receiptRoutes from '../src/receipt/receipt.routes.js';

class Server {
    constructor() {
        this.app = express();
        this.port = process.env.PORT;
        this.authPath = '/api/v1/auth';
        this.userPath = '/api/v1/users'; 
        this.categoryPath = '/api/v1/categories';
        this.productPath = '/api/v1/products';
        this.receiptPath = '/api/v1/receipts'

        this.middlewares();
        this.conectarDB();
        this.routes();
    };

    async conectarDB() {
        await dbConnection();
    };

    middlewares() {
        this.app.use(express.urlencoded({ extended: false }));
        this.app.use(cors());
        this.app.use(express.json());
        this.app.use(helmet());
        this.app.use(morgan('dev'));
    };

    routes() {
        this.app.use(this.authPath, authRoutes);
        this.app.use(this.userPath, userRoutes);
        this.app.use(this.categoryPath, categoryRoutes);
        this.app.use(this.productPath, productRoutes);
        this.app.use(this.receiptPath, receiptRoutes);
    };

    listen() {
        this.app.listen(this.port, () => {
            console.log('Server running on port', this.port);
        });
    };
};

export default Server;