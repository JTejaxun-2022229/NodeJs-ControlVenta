import { Router } from "express";
import { check } from "express-validator";
import { createCategory, getCategory, updateCategory, deleteCategory } from "./category.controller.js";
import { existCategory, statusCategory, existCategoryById } from "../helpers/db-validators.js";
import { validateFields } from "../middlewares/validateFields.js";
import { validateJWT } from "../middlewares/validateJWT.js";
import { roleIsAuthorized } from "../middlewares/validateRole.js";

const router = Router();

router.get(
    "/",
    validateJWT,
    roleIsAuthorized("ADMIN_ROLE"),
    getCategory
);

router.post(
    "/",
    [
        validateJWT,
        roleIsAuthorized("ADMIN_ROLE"),
        check("categoryName").not().isEmpty(),
        check("categoryName").custom(existCategory),
        validateFields
    ],
    createCategory
);

router.put(
    "/:id",
    [
        validateJWT,
        roleIsAuthorized("ADMIN_ROLE"),
        check("id", "Id is not valid").isMongoId(),
        check("id").custom(existCategoryById),
        validateFields
    ],
    updateCategory
);

router.delete(
    "/:id",
    [
        validateJWT,
        roleIsAuthorized("ADMIN_ROLE"),
        check("id", "Id is not valid").isMongoId(),
        check("id").custom(existCategoryById),
        validateFields
    ],
    deleteCategory
)

export default router;