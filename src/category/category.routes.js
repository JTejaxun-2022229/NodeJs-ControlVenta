import { Router } from "express";
import { check } from "express-validator";
import { createCategory, getCategory, updateCategory, deleteCategory } from "./category.controller.js";
import { existCategory, existCategoryById } from "../helpers/db-validators.js";
import { validateFields } from "../middlewares/validateFields.js";
import { validateJWT } from "../middlewares/validateJWT.js";

const router = Router();

router.get(
    "/",
    getCategory
);

router.post(
    "/",
    [
        check("categoryName").not().isEmpty(),
        check("categoryName").custom(existCategory),
        validateFields
    ],
    createCategory
);

router.put(
    "/:id",
    [
        check("id", "Id is not valid").isMongoId(),
        check("id").custom(existCategoryById),
        validateFields
    ],
    updateCategory
);

router.delete(
    "/:id",
    [
        check("id", "Id is not valid").isMongoId(),
        check("id").custom(existCategoryById),
        validateFields
    ],
    deleteCategory
)

export default router;