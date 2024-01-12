// Desafio 2
const fs = require("fs").promises;

class CartManager {
  // Variable para llevar un seguimiento del último id asignado
  static ultId = 0;

  constructor(path) {

    // Inicializa el array de productos y la ruta del archivo
    this.path = path;
    this.products = path ? this.leerArchivo() : [ ];
    // Inicializa la instancia, cargando productos desde el archivo
    this.initialize();
    
    }

  // Método para inicializar la instancia, cargando productos desde el archivo
  async initialize() {
    await this.loadProductsFromDisk();
  }

  // Método para cargar productos desde el archivo
  async loadProductsFromDisk() {
    try {
      const data = await fs.readFile(this.path, 'utf-8');
      this.products = JSON.parse(data);
      // Actualiza el último id asignado basándose en los productos cargados
      CartManager.ultId = this.products.reduce((maxId, product) => Math.max(maxId, product.id), 0) + 1;
    } catch (error) {
      // Si hay un error al leer o analizar el archivo, se ignora y se continúa con un array vacío
      this.products = [];
    }
  }
  // Método para agregar un nuevo producto al array y guardar en el archivo
  async addProduct() {
    // Crear nuevo carrito con id autoincrementable
    const newCart = {
      id: ++CartManager.ultId,
      products: [],
    };
    // Agregar producto al array
    this.products.push(newCart);
    // Guardar el array actualizado en el archivo
    await this.guardarArchivo();
    console.log("Producto agregado:", newProduct);
  }

// Método para obtener todos los productos
getProducts() {
  console.log("getProducts:", this.products);
  return this.products;
}

  // Método para obtener un carrito por su id
async getProductById(id) {
    try {
      const arrayProductos = await this.leerArchivo();
      id = parseInt(id);
      const buscado = arrayProductos.find(item => item.id === id);

      if (!buscado) {
        console.log("Producto no encontrado");
      } else {
        console.log("Producto encontrado:", buscado);
        return buscado.products;
      }
    } catch (error) {
      console.log("Error al leer el archivo", error);
    }
  }

  //agrega un producto al array de productos del carrito seleccionado 
  async updateProduct(cartId, productId, quantity = 1) {
    const cart = await this.getProductById(parseInt(cartId));
    const product = cart.products.find(p => p.id === parseInt(productId));
  
    if (product) {
      if (quantity) {
        product.quantity += parseInt(quantity);
      } else {
        cart.products.push({
          "id": productId,
          "quantity": parseInt(quantity)
        });
      }
  
      await this.guardarArchivo();
      return cart.products;
    } else {
      console.log("Producto no encontrado en el carrito");
      return null;  
    }
  }


  // Método para leer el archivo
  async leerArchivo() {
    try {
      const respuesta = await fs.readFile(this.path, "utf-8");
      const arrayProductos = JSON.parse(respuesta);
      return arrayProductos;
    } catch (error) {
      console.log("Error al leer un archivo", error);
    }
  }

  // Método para guardar el array actualizado en el archivo
  async guardarArchivo(arrayProductos = this.products) {
    try {
      await fs.writeFile(this.path, JSON.stringify(arrayProductos, null, 2));
    } catch (error) {
      console.log("Error al guardar el archivo", error);
    }
  }
}
// Exporta la clase CartManager
module.exports = CartManager;