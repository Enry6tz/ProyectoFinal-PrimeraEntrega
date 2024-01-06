const path = require('path');
const express = require("express");
const router = express.Router();
const CartsManager = require('../controllers/cart-manager.js');

// Obtener la ruta completa al archivo productos.json desde el punto donde se ejecuta este script
const productosJsonPath = path.join(__dirname, '..', '/models/carts.json');
//console.log(productosJsonPath )
// Crea una instancia de CartsManager con la ruta correcta
const cartsManager = new CartsManager(productosJsonPath);


// Endpoint para obtener todos los productos del carrito con el id seleccionado
router.get('/', async (req, res) => {
    try {
      const products = await cartsManager.getProducts();
      res.status(200)
      res.json(products);
    } catch (error) {
      res.status(500).json({error: "error en el servidor"})
    }
    
});

// Endpoint para obtener un producto por su ID
router.get('/:id', async (req, res) => {
  // Obtiene el ID de la solicitud
  const productId = parseInt(req.params.id);

  // Obtiene el producto del ProductManager por su ID
  const product = await cartsManager.getProductById(productId);

  // Si se encuentra el producto, lo devuelve; de lo contrario, devuelve un error 404
  if (product) {
    res.json(product);
  } else {
    res.status(404).json({ error: 'carrito no encontrado' });
  }
});
router.post("/", (req,res)=> {
  //crear nuevo carrito
})

router.post("/:cid/product/:pid", (req,res)=> {
  //agregar un producto al carrito con el id seleccionado.
})

module.exports = router;