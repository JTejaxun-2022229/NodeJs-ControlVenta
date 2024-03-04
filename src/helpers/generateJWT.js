import jwt from 'jsonwebtoken';

export const generateJWT = (uid = '') => {
    return new Promise((resolve, reject) => {
        const payload = { uid };
        jwt.sign(
            payload,
            process.env.SECRETPRIVATEKEY,
            {
                expiresIn: '24h',
            },
            (err, token) => {
                err ? (console.log(err, reject('Token can not be generated'))) : resolve(token);
            }
        );
    });
};
