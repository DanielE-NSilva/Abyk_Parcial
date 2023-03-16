const Ccarrito = {};

Ccarrito.carrito = (req, res) => {
    res.render('carrito', {data: null});

};

module.exports = Ccarrito;