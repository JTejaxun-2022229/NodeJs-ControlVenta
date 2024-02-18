const {Schema, model} = require('mongoose');

const FacturaSchema = Schema({
    usuario:{
        type: String,
        required: [true, 'se requiere del comprador']
    },
    producto:{
        type: String,
        required: [true, 'Se requiere de un producto']
    },
    cantidadProducto:{
        type: Number,
        required: [true, 'Se requiere cantidad de un producto']
    },
    precioUnitario:{
        type: Number,
        required: [true, 'se requiere el precio del producto']
    },
    precioTotal:{
        type: Number,
        requirede: [true, 'se requiere el total']
    }
});

module.exports = model('Factura')