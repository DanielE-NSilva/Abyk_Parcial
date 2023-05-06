const Cproductos = {};
const { randomNumber } = require('../../helpers/libs');
const path = require('path')
const fs = require('fs-extra');
const { Console } = require('console');
var Datos = [];

Cproductos.listproductos = (reqPagina, resPagina) => { 
    if (reqPagina.user) {
        Datos.Usuario = { user: true, Nombre: reqPagina.user.Nombre, perfil: reqPagina.user.Perfil }
    } else
        Datos.Usuario = { user: false }
    Datos.productos = []
    Datos.Alert = {
        alert: true,
        alertTitle: 'Administrador Del Sitio    ',
        alerMessage: 'No eresPagina administrador para entrar a esta pagina',
        alertIcon: 'error',
        showConfirmButton: false,
        time: 4000,
        ruta: '/',
        Script: 'script'
    }
    jsonList = {
        "status": 200,
        "mensaje": 'No eresPagina administrador para entrar a esta pagina'
    }

    if (reqPagina.user) {
        if (reqPagina.user.Perfil == "administrador")
            reqPagina.getConnection((err, conn) => {
                conn.query('SELECT * FROM producto', (err, productos) => {
                    if (err) {
                        resPagina.json(err);
                    }
                    Datos.Alert = []
                    if (reqPagina.user) {
                        Datos.Usuario = { user: true, Nombre: reqPagina.user.Nombre, perfil: reqPagina.user.Perfil }
                    } else
                        Datos.Usuario = { user: false }
                    Datos.productos = productos;
                    jsonList = { "Datos:" :{"Categoria" : Datos.Categoria, "Productos": [Datos.productos]}}
                    resPagina.json(jsonList)
                });
            });
        else
            resPagina.json(jsonList)
    } else {
        resPagina.json(jsonList)
    }
};

Cproductos.listproductosBasicoAPI = (reqPagina, resPagina) => {
    var Categoria

    if (reqPagina.params.Categoria == 'Femenino')
        Categoria = 1;
    if (reqPagina.params.Categoria == 'Masculino')
        Categoria = 2;

    reqPagina.getConnection((err, conn) => {
        if (err)
            resPagina.json(err);
        else {
            conn.query('SELECT * FROM producto WHERE Categoria = ?', Categoria, (err, productos) => {
                if (err) {
                    resPagina.json(err);
                }
                Datos.Categoria = reqPagina.params.Categoria;
                Datos.Alert = []
                if (reqPagina.user)
                    Datos.Usuario = { user: true, Nombre: reqPagina.user.Nombre, perfil: reqPagina.user.Perfil }
                else
                    Datos.Usuario = { user: false, Nombre: "Anonimo" }
        
                Datos.productos = productos;
                jsonList = { 
                    "Usuario" : {"Nombre": Datos.Usuario.Nombre,"Perfil": Datos.Usuario.perfil},
                    "Datos:" :{"Categoria" : Datos.Categoria, "Productos": [Datos.productos]}
                }
                resPagina.json(jsonList)
            });
        }
    });
}

Cproductos.SaveProducto = async (reqPagina, resPagina) => { //FUNCION PRA SALVAR 
    const saveImage = async () => {
        const imgUrl = randomNumber();
        await reqPagina.getConnection((err, connection) => {
            connection.query('SELECT * FROM  producto WHERE nombreImagen = ? ', imgUrl, async (err, producto) => {
                if (producto.length >= 1)
                    saveImage()
                else {
                    const imageTempPath = reqPagina.file.path;
                    const ext = path.extname(reqPagina.file.originalname).toLowerCase();
                    // 1 es categoria de mujer
                    var targetPath
                    if (reqPagina.body.categoria == 1)
                        targetPath = path.resolve(`src/public/image/Mujer/${imgUrl}${ext}`);
                    else
                        targetPath = path.resolve(`src/public/image/Hombre/${imgUrl}${ext}`);
                        
                    if (ext === '.png' || ext === '.jpg' || ext === '.jpeg' || ext === '.gif') {
                        await fs.rename(imageTempPath, targetPath);
                        var data = [imgUrl + ext, reqPagina.body.nombre, reqPagina.body.descripcion, reqPagina.body.caracteristicas, reqPagina.body.referencia, reqPagina.body.cantidad, reqPagina.body.precio, reqPagina.body.categoria];
                        reqPagina.getConnection((err, connection) => {
                            connection.query('INSERT INTO producto (nombreImagen,nombre,descripcion,caracteristicas,referencia,cantidad,precio,categoria) value (?,?,?,?,?,?,?,?)', data, (err, producto) => {
                                if (err)
                                    console.log(err)
                                else {
                                    Datos.Alert = {
                                        alert: true,
                                        alertTitle: 'Gestion de Producto',
                                        alerMessage: 'Producto Creado Correctamente',
                                        alertIcon: 'success',
                                        showConfirmButton: false,
                                        time: 4000,
                                        ruta: '/productos',
                                        Script: 'script'
                                    }
                
                                    if (reqPagina.user) {
                                        Datos.Usuario = { user: true, Nombre: reqPagina.user.Nombre, perfil: reqPagina.user.Perfil }
                                    } else
                                        Datos.Usuario = { user: false }
                                    Datos.productos = []
                                    resPagina.render('productos', { data: Datos })
                                }
                            })
                        });
                    } else {
                        fs.unlink(imageTempPath);
                        resPagina.status(500).json({ error: "solo imagenes estan permitidas" })
                    }
                }
            })
        })
    }
    saveImage();
};

Cproductos.edit = (reqPagina, resPagina) => {
    const { IdProducto } = reqPagina.params;
    reqPagina.getConnection((err, conn) => {
        conn.query('SELECT * FROM producto WHERE IdProducto = ?', [IdProducto], (err, producto) => {
            Datos.Alert = []
            if (producto.length == 1){
                if (reqPagina.user) {
                    Datos.Usuario = { user: true, Nombre: reqPagina.user.Nombre, perfil: reqPagina.user.Perfil }
                } else
                    Datos.Usuario = { user: false }
        
                if (producto[0].Categoria == 1)
                    producto[0].Categoria = "Femenino"
                else
                    producto[0].Categoria = "Masculino"
                Datos.producto = producto[0]
            }else{
                producto = ["No existe producto buscado"]
            }
            jsonList = {
                "status": 200,
                "Datos":  producto[0]
              }
            resPagina.json(jsonList)
        });
    });
};

Cproductos.update = (reqPagina, resPagina) => {
    const { IdProducto } = reqPagina.params;
    const newCantidad = reqPagina.body.cantidad;
    const newPrecio = reqPagina.body.precio;

    reqPagina.getConnection((err, conn) => {
        conn.query('UPDATE abyk.producto set Cantidad = ?, Precio = ? where IdProducto = ?', [newCantidad,newPrecio, IdProducto], (err, rows) => {
            if (err) {
                jsonList = {
                    "status": 200,
                    "Datos":  'Producto No Actualizado'
                    }
            } else {
                jsonList = {
                    "status": 200,
                    "Datos":  'Producto Actualizado Correctamente'
                  }
            }
            if (reqPagina.user) {
                Datos.Usuario = { user: true, Nombre: reqPagina.user.Nombre, perfil: reqPagina.user.Perfil }
            } else
                Datos.Usuario = { user: false }
            Datos.productos = []
   
            resPagina.json(jsonList)
        });
    });
};

Cproductos.delete = (reqPagina, resPagina) => {
    const { IdProducto } = reqPagina.params;
    reqPagina.getConnection((err, connection) => {
        const query = connection.query('SELECT NombreImagen,Categoria FROM producto WHERE IdProducto  = ?', [IdProducto], (err, rows) => {
            if (err) {
                console.log(err)
            } else {
                data = rows[0]
                var targetPath
                if (data.Categoria == 1)
                    targetPath = path.resolve(`src/public/image/Mujer/${data.NombreImagen}`);
                else
                    targetPath = path.resolve(`src/public/image/Hombre/${data.NombreImagen}`);

                connection.query('DELETE FROM producto WHERE IdProducto  = ?', [IdProducto], (err, rows) => {
                    if (err) {
                        jsonList = {
                            "status": 200,
                            "mensaje": "Error al eliminar"
                        }
                    } else {
                        fs.unlink(targetPath)
                        jsonList = {
                            "status": 200,
                            "mensaje": "Eliminado Correctamente"
                        }
                    }
                    if (reqPagina.user) {
                        Datos.Usuario = { user: true, Nombre: reqPagina.user.Nombre, perfil: reqPagina.user.Perfil }
                    } else
                        Datos.Usuario = { user: false }
                    Datos.productos = []
                    resPagina.json(jsonList)
                });
            }
        });
    });
}

module.exports = Cproductos;