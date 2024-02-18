const { Schema, model} = require('mongoose');

const CategoriaSchema = Schema({
    nombre:{
        type: String,
        required: [true, 'El nombre es obligatorio']
    },
    estado:{
        type: Boolean,
        default: true
    }
})

modules.exports = model('Categoria',CategoriaSchema);