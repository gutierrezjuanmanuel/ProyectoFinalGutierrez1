/*class Producto {
constructor(id, nombre, precio) {
this.id = id;
this.nombre = nombre;
this.precio = precio;
}
}

let contenedor = document.getElementById("contenedor");
contenedor.className = "rojo";
//arreglo que va a contener los productos creados
const productos = [];

//agregamos los productos creados por la clase Producto al arreglo
productos.push(new Producto(1, "guitarra", 180000));
productos.push(new Producto(2, "violin", 50000));
productos.push(new Producto(3, "piano", 1111111));
productos.push(new Producto(4, "saxofon", 1013526));
productos.push(new Producto(5, "trompeta", 160000));
productos.push(new Producto(6, "teclado", 60000));


const guardarStorage = (clave, valor) => {
localStorage.setItem(clave, valor);
};

productos.forEach((item) => {
guardarStorage(item.id, JSON.stringify(item));
});

localStorage.setItem("carrito", JSON.stringify(productos));

*/

/*
const productos = [
  { id: 1, nombre: "guitarra", precio: 180000 },
  { id: 2, nombre: "violin", precio: 50000 },
  { id: 3, nombre: "piano", precio: 1111111 },
  { id: 4, nombre: "saxofon", precio: 1013526 },
  { id: 5, nombre: "trompeta", precio: 160000 },
  { id: 6, nombre: "teclado", precio: 60000 },
];

localStorage.setItem("carrito", JSON.stringify(productos));

*/



//boton para eliminar el carrito
let eliminar = document.getElementById("eliminar");
let carrito = [];


//me traigo el carrito del storage
let carritoStorage = localStorage.getItem("carrito");

//si hay carrito lo cargo si no coloco en el dom que no hay productos
if (carritoStorage) {
  carrito = JSON.parse(carritoStorage);
} else {
  let div = document.createElement("div");
  div.innerHTML = `
    <h2>No hay productos en el carrito</h2>
  `;

  document.body.append(div);
  //const carrito = JSON.parse(carritoStorage) || await div(); 
}



const agregarCarrito = (id) => {
  let producto = productos.find((item) => item.id === id);
  let mensaje = `
     Id: ${producto.id}
     Nombre: ${producto.nombre}
     Precio: ${producto.precio}
   `;

  alert(mensaje);


};

//recorro el carrito y muestro en el dom los productos carrito
fetch("/data.json")
  .then((response) => response.json())
  .then((data) => {
    data.forEach((item) => {
      let div = document.createElement("div");
      div.innerHTML = `
  <div class="rojo">
     <h2>Id: ${item.id}</h2>
    <p>Nombre: ${item.nombre}</p>
   <b>$${item.precio}</b>
    <button id="boton${item.id}">Agregar al carrito</button>
    </div>
  `;

      document.body.append(div);
      let boton = document.getElementById(`boton${item.id}`);
      boton.addEventListener("click", () => agregarCarrito(item.id));

    });
  });



//elimino el storage, muestro el alert y recargo la pagina
eliminar.addEventListener("click", () => {

  Swal.fire({
    title: "Está seguro de eliminar el carrito?",
    icon: "warning",
    showCancelButton: true,
    confirmButtonText: "Sí, seguro",
    cancelButtonText: "No, no quiero",
  }).then((result) => {
    if (result.isConfirmed) {
      //codigo a ejecutar
      Swal.fire({
        title: "Borrado!",
        icon: "success",
        text: "El carrito ha sido borrado",
      });
    }
  });
  localStorage.clear();
  location.reload();
});

//traemos el formulario
let formulario = document.getElementById("formulario");
// //funcion para mostrar los productos en la pagina
const renderizar = (carrito) => {
  //antes de mostrar los productos en la pagina borramos el contenedor
  contenedor.innerHTML = "";
  carrito.forEach((item) => {
    let div = document.createElement("div");
    div.innerHTML = `
       <h2>Id: ${item.id}</h2>
       <p>Nombre: ${item.nombre}</p>
       <b>$${item.precio}</b>
     `;
    contenedor.append(div);
  });
};

// //agregamos el evento submit al formulario
formulario.addEventListener("submit", (e) => {
  //evitamos que el formulario se recargue
  e.preventDefault();

  //   //traemos los inputs
  let inputs = e.target.children;
  let nombre = inputs[0].value;
  let precio = inputs[1].value;

  //   //agregamos el nuevo producto al carrito
  Math.max(...carrito.map(item => item.id)) + 1
  carrito.push({ id: carrito.length + 1, nombre, precio });

  //   //mostramos el carrito en la pagina
  renderizar(carrito);
});