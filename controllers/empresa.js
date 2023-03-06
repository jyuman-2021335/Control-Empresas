const { response, request } = require('express');
const bcryptjs = require('bcryptjs');

const empresa = require('../models/empresa');

const getEmpresas = async (req = request, res = response) => {

    const listaEmpresas = await Promise.all([
        empresa.countDocuments(),
        empresa.find()
    ]);

    res.json({
        msg: 'GET Empresas',
        listaEmpresas
    });

}

const postEmpresa = async (req = request, res = response) => {

    const {nombre, correo, password, tipo, rol, sucursales} = req.body;
    const empresaDB = new empresa({nombre, correo, password, tipo, rol, sucursales});



    const salt = bcryptjs.genSaltSync();
    empresaDB.password = bcryptjs.hashSync(password, salt);

    await empresaDB.save();

    res.status(201).json({
        msg: 'POST Empresa',
        empresaDB
    });
}

const putEmpresa = async (req = request, res = response) => {

    const {id} = req.params;

    const {_id, correo, password, rol, ...resto} = req.body;

    const empresaEditada = await empresa.findByIdAndUpdate(id, resto, {new: true});

    res.status(200).json({
        msg: 'PUT Empresa',
        empresaEditada
    });
}


const deleteEmpresa = async (req = request, res = response) => {
    const {id} = req.params;

    const empresaEliminada = await empresa.findByIdAndDelete(id);

    res.json({
        msg: 'DELETE Empresa',
        empresaEliminada
    });
}

const getSucursalesEmpresa= async( req = request, res = response) => {
    const empresa = req.empresa._id;
    const sucursales = req.empresa.sucursales

    res.json({
        msg: 'Tus sucursales',
        sucursales
    })
}

module.exports = {
    getEmpresas,
    postEmpresa,
    putEmpresa,
    deleteEmpresa,
    getSucursalesEmpresa
}