const express = require('express');
const bodyParser = require('body-parser');

// Crea una instancia de Express
const app = express();
// Define el puerto en el que el servidor escuchará
const PUERTO = 8080;
const productsRouter = require("./routes/products.router");
const cartsRouter = require("./routes/carts.router");

//configuracion necesaria para utilizar archivos JSON
app.use(express.urlencoded({extended: true}))
app.use(express.json())
app.use(bodyParser.json());

//Routing
app.use("/api/products", productsRouter )
app.use("/api/carts", cartsRouter )

app.get("/",(req, res)=> res.send("HOME"))
app.get("/*", (req,res) => res.send("pagina no encontrada"))
// Inicia el servidor y escucha en el puerto especificado
app.listen(PUERTO, () => {
  console.log(`Servidor escuchando en el puerto ${PUERTO}`);
});
  
