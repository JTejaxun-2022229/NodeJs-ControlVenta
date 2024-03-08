import { response } from "express";

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
