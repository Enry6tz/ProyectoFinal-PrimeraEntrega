const path = require('path');
const express = require("express");
const router = express.Router();
const ProductManager = require('../controllers/product-manager.js');
const { route } = require('./carts.router.js');

// Obtener la ruta completa al archivo productos.json desde el punto donde se ejecuta este script
const productosJsonPath = path.join(__dirname, '..', '/models/products.json');
//console.log(productosJsonPath)
// Crea una instancia de ProductManager con la ruta correcta
const productManager = new ProductManager(productosJsonPath);

// Endpoint para obtener todos los productos con posibilidad de limitar resultados
router.get('/', async (req, res) => {
    // Obtén todos los productos del ProductManager
    const products = await productManager.getProducts();

    // Obtén el parámetro de límite de la consulta
    const limit = parseInt(req.query.limit);

    // Si se proporciona el límite y es un número válido y mayor que cero, devuelve solo la cantidad especificada de productos
    if (limit > 0) {
      res.json(products.slice(0, limit));
    } else {
      // Si no se proporciona el límite o es inválido, devuelve todos los productos
      res.json(products);
    }
});

// Endpoint para obtener un producto por su ID
router.get('/:id', async (req, res) => {
  // Obtiene el ID de la solicitud
  const productId = parseInt(req.params.id);

  // Obtiene el producto del ProductManager por su ID
  const product = await productManager.getProductById(productId);

  // Si se encuentra el producto, lo devuelve; de lo contrario, devuelve un error 404
  if (product) {
    res.json(product);
  } else {
    res.status(404).json({ error: 'Producto no encontrado' });
  }
});

router.post("",(req,res)=>{
  //agrega productos al products-manager
})

router.put("/:id",(req,res)=>{
  //actualizar producto por id
})

router.delete("/:id" ,(req, res ) => {
  //eliminar producto por id
})

module.exports = router;