const Cproductos = {};

Cproductos.list = (req, res) => {  //FUNCION NOMBRE DEL METODO .LIST
    req.getConnection((err, conn) => { // PODER CONECTARSE A MYSQL
        conn.query('SELECT * FROM producto', (err, productos) => {
            if (err) {
                res.json(err);
            }
            //  console.log(producto)
            res.render('productos', {  // PINTAR EN EL NAVEGADOR 
                data: productos // LLENAR LOS DATOS DENTRO DE PRODUCTO

            });
        });
    });
};

Cproductos.SaveProducto = (req, res) => { //FUNCION PRA SALVAR 
    var data = [req.body.nameproducto, req.body.name, req.body.descripcion, req.body.caracteristicas, req.body.referencia, req.body.cantidad, req.body.categoria];

    // const data = req.body; // DATA CONTIENE LOS DATOS DEL FORM
    console.log(data);
    console.log(req.body)

    req.getConnection((err, connection) => {
        const query = connection.query('INSERT INTO producto (nombreImagen,nombre,descripcion,caracteristicas,referencia,cantidad,categoria) value (?,?,?,?,?,?,?)', data, (err, producto) => {
            res.redirect('productos');
        })
    })
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