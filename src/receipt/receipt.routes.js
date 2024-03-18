import { Router } from "express";
import { check } from "express-validator";
import { createReceipt, getReceipts, getReceiptsByUser } from '../receipt/receipt.controller.js';
import { existUserById } from "../helpers/db-validators.js";
import { validateFields } from "../middlewares/validateFields.js";
import { validateJWT } from "../middlewares/validateJWT.js";
import { roleIsAuthorized } from "../middlewares/validateRole.js";

const router = Router();

router.post(
    '/',
    validateJWT,
    validateFields,
    createReceipt
);

router.get(
    '/',
    validateJWT,
    roleIsAuthorized("ADMIN_ROLE"),
    getReceipts
);


router.get(
    '/:id',
    [
        validateJWT,
        check('id', 'No es un id válido').isMongoId(),
        check('id').custom(existUserById)
    ],
    getReceiptsByUser
);

export default router;