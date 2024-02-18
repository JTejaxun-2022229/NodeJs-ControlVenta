const {Schema, model} = require('mongoose');

const CarritoSchema = Schema({
    producto:{
        type: String,
    },
    cantidadProducto:{
        type: Number
    }
});

module.exports = model('Carrito', CarritoSchema)