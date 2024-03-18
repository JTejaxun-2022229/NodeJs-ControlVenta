import { Router } from "express";
import { check } from "express-validator";
import { createUser, getUser, updateUser, deleteUser } from "./user.controller.js";
import { existEmail, existUserById } from "../helpers/db-validators.js";
import { validateFields } from "../middlewares/validateFields.js";
import { validateJWT, compareUser } from "../middlewares/validateJWT.js";
import { roleIsAuthorized } from "../middlewares/validateRole.js";

const router = Router();

router.post(
    "/",
    [
        check("name", "Name is neccesary").not().isEmpty(),
        check("email", "This is an invalid email").isEmail(),
        check("email").custom(existEmail),
        check("password", "Password must be have 6 characters").isLength({ min: 6, }),
        validateFields,
    ],
    createUser
)

router.get(
    "/",
    validateJWT,
    roleIsAuthorized("ADMIN_ROLE"),
    getUser
);

router.put(
    "/:id",
    [
        validateJWT,
        check('id', 'No es un id válido').isMongoId(),
        check('id').custom(existUserById),
        validateFields
    ],
    updateUser
)

router.delete(
    "/:id",
    [
        validateJWT,
        check('id', 'No es un id válido').isMongoId(),
        check('id').custom(existUserById),
        validateFields
    ],
    deleteUser
);

export default router;