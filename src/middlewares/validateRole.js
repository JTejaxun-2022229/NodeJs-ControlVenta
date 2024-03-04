import { response } from "express";

export const isAdminRole = (req, res, next) => {
    if (!req.admin) {
        return res.status(500).json({
            msg: "You want to validate a user without validating token first"
        });
    }

    const { role, name } = req.usuario;

    if (role !== "ADMIN_ROLE") {
        return res.status(401).json({
            msg: `${name} is not an admin, you can not use this endpoint`
        });
    };
    next();
}

export const roleIsAuthorized = (...roles) => {
    return (req = request, res = response, next) => {
        if (!req.admin) {
            return res.status(500).json({
                msg: "You want to validate a user without validating token first"
            });
        }

        if (!roles.includes(req.admin.role)) {
            return res.status(401).json({
                msg: `Service require one of this authorized roles ${roles}`
            });
        }
        next();
    }
}
