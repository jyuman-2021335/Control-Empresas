const { Schema, model } = require('mongoose');

const EmpresaSchema = Schema({ 
    nombre: {
        type: String,
        required: [true, 'El nombre es obligatorio']
    },
    correo: {
        type: String,
        required: [true, 'El correo es obligatorio'],
        unique: true
    },
    password: {
        type: String,
        required: [true, 'La contraseña es obligatoria']
    },
    tipo: {
        type: String,
        required: true
    },
    rol: {
        type: String,
        required: true
    },
    sucursales: {
        type: Array,
        default: []
    }
});

module.exports = model('Empresa', EmpresaSchema)