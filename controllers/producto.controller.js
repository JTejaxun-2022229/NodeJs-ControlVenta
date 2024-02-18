const Producto = require('../models/producto');
const { response } = require('express');

const productosGet = async (req, res = response) => {
    const { limite, desde } = req.query;
    const query = { estado: true };

    const [total, productos] = await Promise.all([
        Producto.countDocuments(query),
        Producto.find(query)
            .skip(Number(desde))
            .limit(Number(limite))
    ]);

    res.status(200).json({
        total,
        productos
    });
}

const getProductoById = async (req, res) => {
    const { id } = req.params;
    const producto = await Producto.findOne({ _id: id })

    res.status(200).json({
        producto
    })
}

const putProductos = async (req, res = response) => {
    const { id } = req.params;
    await Producto.findByIdAndUpdate(id);
    const producto = producto.findOne({ id });

    res.status(200).json({
        msg: 'Producto Actualizado Exitosamente',
        producto
    })
}

const productosDelete = async (req, res) => {
    const { id } = req.params;
    const producto = await Producto.findByIdAndUpdate(id, { estado: false });

    req.status(200).sjon({
        msg: 'Producto Eliminado'
    })
}

const productosPost = async (req, res) => {
    const { nombre, descripcion, precio, existencia, categoria } = req.body;
    const producto = new Producto({ nombre, descripcion, precio, existencia, categoria });

    await producto.save();
    res.status(202).json({
        producto
    })
}

module.exports = {
    productosPost,
    productosGet,
    getProductoById,
    putProductos,
    productosDelete
}