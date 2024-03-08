import { Router } from "express";
import { check } from "express-validator";
import { categoryPost, categoryGet, categoryPut, categoryDelete } from "./category.controller.js";
import { existCategory, existCategoryById } from "../helpers/db-validators.js";
import { validateFields } from "../middlewares/validateFields.js";
import { validateJWT } from "../middlewares/validateJWT.js";

const router = Router();

router.get(
    "/",
    categoryGet
);

router.post(
    "/",
    [
        check("categoryName").not().isEmpty(),
        check("categoryName").custom(existCategory),
        validateFields
    ],
    categoryPost
);

router.put(
    "/:id",
    [
        check("id", "Id is not valid").isMongoId(),
        check("id").customSanitizer(existCategoryById),
        validateFields
    ],
    categoryPut
);

router.delete(
    "/:id",
    [
        check("id", "Id is not valid").isMongoId(),
        check("id").customSanitizer(existCategoryById),
        validateFields
    ],
    categoryDelete
)

export default router;