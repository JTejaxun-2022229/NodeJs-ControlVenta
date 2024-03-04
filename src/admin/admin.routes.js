import { Router } from "express";
import { check } from "express-validator";
import { adminPost, adminGet, adminPut, adminDelete } from './admin.controller.js';
import { existEmailAdmin, existAdminById, isRoleValid } from '../helpers/db-validators.js';
import { validateFields } from "../middlewares/validateFields.js";
import { isAdminRole } from "../middlewares/validateRole.js";
import { validateJWT } from "../middlewares/validateJWT.js";

const router = Router();

router.get("/", adminGet);

router.post(
    "/",
    [
        check("name", "Name is neccesary").not().isEmpty(),
        check("email", "This is not a valid Email").isEmail(),
        check("email").custom(existEmailAdmin),
        check("password", "Password must have 6 characters"),
        validateFields
    ],
    adminPost
);

router.put(
    ":/id",
    [
        validateJWT,
        isAdminRole,
        check("id", "Id is not valid").isMongoId(),
        check("id").custom(existAdminById),
        validateFields
    ],
    adminPut
);

router.delete(
    "/:id",
    [
        validateJWT,
        isAdminRole,
        check("id", "Id is not valid").isMongoId(),
        check("id").custom(existAdminById),
        validateFields
    ],
    adminDelete
)

export default router;