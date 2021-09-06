const Cproductos = {};
const { randomNumber } = require('../helpers/libs');
const path = require('path')
const fs = require('fs-extra');
var Datos = [];

Cproductos.listproductos = (req, res) => {  //FUNCION NOMBRE DEL METODO .LIST
    req.getConnection((err, conn) => { // PODER CONECTARSE A MYSQL
        conn.query('SELECT * FROM producto', (err, productos) => {
            if (err) {
                res.json(err);
            }
            Datos.Alert = []
            if (req.user) {
                Datos.Usuario = { user: true, Nombre: req.user.Nombre, perfil: req.user.Perfil }
            } else
                Datos.Usuario = { user: false }
            Datos.productos = productos;
            res.render('productos', { data: Datos });
        });
    });
};

Cproductos.listproductosBasico = (req, res) => {
    var Categoria
    if (req.params.Categoria == 'Femenino')
        Categoria = 1;
    if (req.params.Categoria == 'Masculino')
        Categoria = 0;

    console.log(req.params.Categoria)
    req.getConnection((err, conn) => { // PODER CONECTARSE A MYSQL
        if (err)
            res.json(err);
        else {
            conn.query('SELECT * FROM producto WHERE Categoria = ?', Categoria, (err, productos) => {
                if (err) {
                    res.json(err);
                }
                Datos.Categoria = req.params.Categoria;
                Datos.Alert = []
                if (req.user) {
                    Datos.Usuario = { user: true, Nombre: req.user.Nombre, perfil: req.user.Perfil }
                } else
                    Datos.Usuario = { user: false }
                Datos.productos = productos;
                //    console.log(Datos.productos[0].NombreImagen)
                res.render('Seccion', { data: Datos });
            });
        }
    });
}

Cproductos.SaveProducto = async (req, res) => { //FUNCION PRA SALVAR 
    const saveImage = async () => {
        const imgUrl = randomNumber();
        await req.getConnection((err, connection) => {
            connection.query('SELECT * FROM  producto WHERE nombreImagen = ? ', imgUrl, async (err, producto) => {
                if (producto.length >= 1)
                    saveImage()
                else {
                    const imageTempPath = req.file.path;
                    const ext = path.extname(req.file.originalname).toLowerCase();
                    // 1 es categoria de mujer
                    var targetPath
                    if (req.body.categoria == 1)
                        targetPath = path.resolve(`src/public/image/Mujer/${imgUrl}${ext}`);
                    else
                        targetPath = path.resolve(`src/public/image/Hombre/${imgUrl}${ext}`);
                    console.log(imageTempPath)
                    if (ext === '.png' || ext === '.jpg' || ext === '.jpeg' || ext === '.gif') {
                        await fs.rename(imageTempPath, targetPath);
                        var data = [imgUrl + ext, req.body.name, req.body.descripcion, req.body.caracteristicas, req.body.referencia, req.body.cantidad, req.body.precio, req.body.categoria];
                        req.getConnection((err, connection) => {
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
                                    console.log(req.user)
                                    if (req.user) {
                                        Datos.Usuario = { user: true, Nombre: req.user.Nombre, perfil: req.user.Perfil }
                                    } else
                                        Datos.Usuario = { user: false }
                                    Datos.productos = []
                                    console.log(Datos)
                                    res.render('productos', { data: Datos })
                                }
                            })
                        });
                    } else {
                        fs.unlink(imageTempPath);
                        res.status(500).json({ error: "solo imagenes estan permitidas" })
                    }
                }
            })
        })
    }
    saveImage();
};

Cproductos.edit = (req, res) => {
    const { IdProducto } = req.params;
    req.getConnection((err, conn) => {
        conn.query('SELECT * FROM producto WHERE IdProducto = ?', [IdProducto], (err, producto) => {
            Datos.Alert = []
            if (req.user) {
                Datos.Usuario = { user: true, Nombre: req.user.Nombre, perfil: req.user.Perfil }
            } else
                Datos.Usuario = { user: false }
            console.log()
            if (producto[0].Categoria == 1)
                producto[0].Categoria = "Femenino"
            else
                producto[0].Categoria = "Masculino"
            Datos.producto = producto[0]
            res.render('productos_edit', { data: Datos })
        });
    });
};

Cproductos.update = (req, res) => {
    const { IdProducto } = req.params;
    const newCantidad = req.body.cantidad;
    console.log(IdProducto)
    req.getConnection((err, conn) => {
        conn.query('UPDATE abyk.producto set Cantidad = ? where IdProducto = ?', [newCantidad, IdProducto], (err, rows) => {
            if (err) {
                Datos.Alert = {
                    alert: true,
                    alertTitle: 'Gestion de Producto',
                    alerMessage: 'Producto No Actualizado',
                    alertIcon: 'error;',
                    showConfirmButton: false,
                    time: 4000,
                    ruta: '/productos',
                    Script: 'script'
                }
            } else {
                Datos.Alert = {
                    alert: true,
                    alertTitle: 'Gestion de Producto',
                    alerMessage: 'Producto Actualizado Correctamente',
                    alertIcon: 'success',
                    showConfirmButton: false,
                    time: 4000,
                    ruta: '/productos',
                    Script: 'script'
                }
            }
            console.log(req.user)
            if (req.user) {
                Datos.Usuario = { user: true, Nombre: req.user.Nombre, perfil: req.user.Perfil }
            } else
                Datos.Usuario = { user: false }
            Datos.productos = []
            console.log(Datos)
            res.render('productos', { data: Datos })
        });
    });
};

Cproductos.delete = (req, res) => {
    const { IdProducto } = req.params;
    req.getConnection((err, connection) => {
        const query = connection.query('SELECT NombreImagen,Categoria FROM producto WHERE IdProducto  = ?', [IdProducto], (err, rows) => {
            if (err) {
                console.log(err)
            } else {
                data = rows[0]
                console.log(data)

                var targetPath
                if (data.Categoria == 1)
                    targetPath = path.resolve(`src/public/image/Mujer/${data.NombreImagen}`);
                else
                    targetPath = path.resolve(`src/public/image/Hombre/${data.NombreImagen}`);

                connection.query('DELETE FROM producto WHERE IdProducto  = ?', [IdProducto], (err, rows) => {
                    if (err) {
                        Datos.Alert = {
                            alert: true,
                            alertTitle: 'Gestion de Producto',
                            alerMessage: 'Producto NO Eliminado',
                            alertIcon: 'error',
                            showConfirmButton: false,
                            time: 4000,
                            ruta: '/productos',
                            Script: 'script'
                        }
                    } else {
                        fs.unlink(targetPath)
                        Datos.Alert = {
                            alert: true,
                            alertTitle: 'Gestion de Producto',
                            alerMessage: 'Producto Eliminado Correctamente',
                            alertIcon: 'success',
                            showConfirmButton: false,
                            time: 4000,
                            ruta: '/productos',
                            Script: 'script'
                        }
                    }
                    if (req.user) {
                        Datos.Usuario = { user: true, Nombre: req.user.Nombre, perfil: req.user.Perfil }
                    } else
                        Datos.Usuario = { user: false }
                    Datos.productos = []
                    res.render('productos', { data: Datos })
                });
            }
        });
    });
}

module.exports = Cproductos;