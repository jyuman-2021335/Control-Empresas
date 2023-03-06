const { request, response  } = require('express');

const esEmpresaRole = ( req = request, res = response, next ) => {

    if ( !req.empresa ) {
        return res.status(500).json({
            msg: 'Se quiere verficar el role sin validar el token primero'
        });
    }

    //Verificación solo el rol de Admin puede realizar la eliminación
    //Si cumple con el rol de admin se envia al controllador deleteUsuario
    const { rol, nombre  } = req.empresa
    if ( rol !== 'ROL_EMPRESA') {
        return res.status(401).json({
            msg: `${ nombre } no es una Empresa registrada, no esta autorizado para realizar esta acción`
        });
    }

    next();

}

module.exports = {
    esEmpresaRole
}