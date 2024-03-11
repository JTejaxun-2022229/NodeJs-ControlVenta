import { Router } from "express";
import { check } from "express-validator";
import { createReceipt, getReceipts, getReceiptsByUser, updateReceipt } from '../receipt/receipt.controller.js';
import { validateFields } from "../middlewares/validateFields.js";
import { validateJWT } from "../middlewares/validateJWT.js";
import { roleIsAuthorized } from "../middlewares/validateRole.js";

const router = Router();

router.post('/',
    [
        validateJWT,
        roleIsAuthorized("CLIENT_ROLE"),
        validateFields
    ],
    createReceipt
);

router.get('/',
    getReceipts,
    roleIsAuthorized("ADMIN_ROLE"),
    validateJWT
);


router.get('/:id',

    getReceiptsByUser
);

router.put('/:id',
    updateReceipt
);

export default router;