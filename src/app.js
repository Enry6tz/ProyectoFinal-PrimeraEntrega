const express = require('express');

// Crea una instancia de Express
const app = express();
// Define el puerto en el que el servidor escuchará
const PUERTO = 8080;
const productsRouter = require("./routes/products.router");
const cartsRouter = require("./routes/carts.router");

app.use(express.json())
app.use(express.urlencoded({extended: true}))

//Routing
app.use("/api/products", productsRouter )
app.use("/api/carts", cartsRouter )


// Inicia el servidor y escucha en el puerto especificado
app.listen(PUERTO, () => {
  console.log(`Servidor escuchando en el puerto ${PUERTO}`);
});
  
