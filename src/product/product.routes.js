import { Router } from "express";
import { check } from "express-validator";
import { createProduct, getProduct, updateProduct, deleteProduct } from "./product.controller.js";
import { existProduct, existProductById } from "../helpers/db-validators.js"
import { validateFields } from "../middlewares/validateFields.js";
import { validateJWT } from "../middlewares/validateJWT.js";
import { roleIsAuthorized } from "../middlewares/validateRole.js"

const router = Router();

router.get(
    "/",
    getProduct
);

router.post(
    "/",
    [
        validateJWT,
        roleIsAuthorized("ADMIN_ROLE"),
        check("productName", "Product name is neccessary").not().isEmpty(),
        check("productName").custom(existProduct),
        check("unitPrice", "Unit price is neccessary").not().isEmpty(),
        check("stock", "Stock is neccessary").not().isEmpty(),
        validateFields
    ],
    createProduct
)

router.put(
    "/:id",
    [
        validateJWT,
        roleIsAuthorized("ADMIN_ROLE"),
        check("id", "This is an invalid id").isMongoId(),
        check("id").custom(existProductById),
        validateFields
    ],
    updateProduct
);

router.delete(
    "/:id",
    [
        validateJWT,
        roleIsAuthorized("ADMIN_ROLE"),
        check("id", "This is an invalid id").isMongoId(),
        check("id").custom(existProductById),
        validateFields
    ],
    deleteProduct
);

export default router;
