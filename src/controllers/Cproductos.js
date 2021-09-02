const Cproductos = {};
const { randomNumber } = require('../helpers/libs');


Cproductos.list = (req, res) => {  //FUNCION NOMBRE DEL METODO .LIST
    req.getConnection((err, conn) => { // PODER CONECTARSE A MYSQL
        conn.query('SELECT * FROM producto', (err, productos) => {
            var Datos = [];
            if (err) {
                res.json(err);
            }
            Datos.Alert = []
            console.log(req.user)
            if (req.user){
              Datos.Usuario = {user:true, Nombre: req.user.Nombre,perfil:req.user.Perfil}
            } else
              Datos.Usuario = {user:false}
            console.log(Datos)

            Datos.producto= productos;
            //  console.log(producto)
            res.render('productos', {  // PINTAR EN EL NAVEGADOR 
                data: Datos // LLENAR LOS DATOS DENTRO DE PRODUCTO

            });
        });
    });
};

Cproductos.SaveProducto = (req, res) => { //FUNCION PRA SALVAR 
    const saveImage = async () => {
        const imgUrl = randomNumber();
        await req.getConnection((err, connection)  => {
            const query = connection.query('SELECT * FROM  producto WHERE nombreImagen = ? ', imgUrl, (err, producto) => {
                if (producto.length >= 1)
                    saveImage()
                else {
                    const imageTempPath = req.file.path;
                    const ext = path.extname(req.file.originalname).toLowerCase();
                    // 1 es categoria de mujer
                    if (req.body.categoria == 1)
                        var targetPath = path.resolve(`src/public/Mujer/${imgUrl}${ext}`);
                    else
                        var targetPath = path.resolve(`src/public/Hombre/${imgUrl}${ext}`);

                    if (ext === '.png' || ext === '.jpg' || ext === '.jpeg' || ext === '.gif') {
                        fs.rename(imageTempPath, targetPath);
                        var data = [imgUrl, req.body.name, req.body.descripcion, req.body.caracteristicas, req.body.referencia, req.body.cantidad, req.body.categoria];
                        req.getConnection((err, connection) => {
                            const query = connection.query('INSERT INTO producto (nombreImagen,nombre,descripcion,caracteristicas,referencia,cantidad,categoria) value (?,?,?,?,?,?,?)', data, (err, producto) => {
                                res.redirect('productos');
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

            res.render('productos_edit', {
                data: producto[0]

            })

        });
    });
};

Cproductos.update = (req, res) => {
    const { IdProducto } = req.params;
    const newProducto = req.body;
    req.getConnection((err, conn) => {

        conn.query('UPDATE customer set ? where IdProducto = ?', [newProducto, IdProducto], (err, rows) => {
            res.redirect('productos', + newProducto.IdProducto);
        });
    });
};

Cproductos.delete = (req, res) => {
    const { IdProducto } = req.params;
    req.getConnection((err, connection) => {
        const query = connection.query('SELECT IdProducto FROM producto WHERE IdProducto  = ?', [IdProducto], (err, rows) => {
            const data = rows[0];
            connection.query('DELETE FROM producto WHERE IdProducto  = ?', [IdProducto], (err, rows) => {
                res.redirect('/productos/' + data.IdProducto);
            });
        });
    });
}

module.exports = Cproductos;