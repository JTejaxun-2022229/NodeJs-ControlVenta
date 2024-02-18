const { Router } = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares')
const { productosPost,
    productosGet,
    getProductoById,
    putProductos,
    productosDelete } = require('../controllers/producto.controller');
const { usuariosDelete } = require('../controllers/usuario.controller');
const router = Router();

router.get("/", productosGet);

router.get(
    "/:id",
    [
        check('id', 'No es un id valido').isMongoId(),
        validarCampos
    ]
), getProductoById;

router.put(
    "/id:",
    [
        check('id', 'No es un id valido').isMongoId(),
        validarCampos
    ]
), putProductos;

router.post(
    "/",
    [
        check("nombre", "El nombre no puede estar vacío").not().isEmpty(),
        check("descripcion", ";a descripcion no puede estar vacío").not().isEmpty(),
        check("precio", "El precio no puede estar vacío").not().isEmpty(),
        check("existencia", "La existencia no puede estar vacío").not().isEmpty(),
        check("categoria", "La categoria no puede estar vacío").not().isEmpty(),
        validarCampos
    ]
), productosPost;

router.delete(
    "/:id",
    [
        check('id', 'No es un id válido').isMongoId(),
    ]
), usuariosDelete;

module.exports = router;