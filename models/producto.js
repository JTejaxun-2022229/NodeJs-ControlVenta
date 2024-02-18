const { Schema, model} = require('mongoose');

const ProductoSchema = schema({
    nombre:{
        type: String,
        required: [true, 'El nombre es obligatorio']
    },
    descripcion:{
        type: String,
        required: [true, 'La descripcion es obligatoria']
    },
    precio: {
        type: Number,
        required: [true, 'El precio es obligatorio']
    },
    existencia:{
        type: Number,
        required: [true, 'La existencia es obligatoria']
    },
    categoria:{
        type: String,
        required: [true, 'La categoria es obligatoria']
    },
    img:{
        type: String
    },
    estado:{
        type: Boolean,
        default: true
    }
});

module.exports = models('Producto', ProductoSchema)