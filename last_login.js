document.addEventListener("DOMContentLoaded", function () {
  const nombre = localStorage.getItem("usuarioLogueado");
  if (nombre) {
      document.getElementById("nombreUsuario").textContent = nombre;
  }

  const alojamientos = [
      { nombre: "Estudio cerca de la playa", ubicacion: "Ciudad Costera", rating: 4.9, precio: 67, imagen: "img/casa1.jpeg", id: 1, reservado: false },
      { nombre: "Piso con vista al mar", ubicacion: "Ciudad Costera", rating: 4.7, precio: 89, imagen: "img/casa2.jpeg", id: 2, reservado: false },
      { nombre: "Apartamento en el centro de la ciudad", ubicacion: "Ciudad Central", rating: 4.8, precio: 100, imagen: "img/casa3.jpg", id: 3, reservado: false },
      { nombre: "Casa en las montañas", ubicacion: "Montañas del Norte", rating: 4.6, precio: 120, imagen: "img/casa4.jpeg", id: 4, reservado: false },
      { nombre: "Villa con piscina", ubicacion: "Zona Exclusiva", rating: 5.0, precio: 200, imagen: "img/casa5.jpeg", id: 5, reservado: false },
  ];

  const resultadosDiv = document.getElementById("resultadosAlojamientos");
  const carrito = JSON.parse(localStorage.getItem("carrito")) || [];
  const carritoCantidad = document.getElementById("carritoCantidad");
  const listaReservas = document.getElementById("listaReservas");

  function actualizarCarrito() {
      carritoCantidad.textContent = carrito.length;
      localStorage.setItem("carrito", JSON.stringify(carrito));
  }

  function mostrarAlojamientos() {
      resultadosDiv.innerHTML = "";
      alojamientos.forEach(alojamiento => {
          if (!alojamiento.reservado) {
              const alojamientoDiv = document.createElement("div");
              alojamientoDiv.classList.add("alojamiento");

              alojamientoDiv.innerHTML = `
                  <img src="${alojamiento.imagen}" alt="${alojamiento.nombre}">
                  <div class="info">
                      <h3>${alojamiento.nombre}</h3>
                      <p>Ubicación: ${alojamiento.ubicacion}</p>
                      <p>⭐ ${alojamiento.rating} | ${alojamiento.precio}€ por noche</p>
                      <button class="agregarCarrito" data-id="${alojamiento.id}">Agregar al Carrito</button>
                  </div>
              `;

              resultadosDiv.appendChild(alojamientoDiv);
          }
      });
  }

  mostrarAlojamientos();

  document.getElementById("inputBusqueda").addEventListener("input", function (e) {
      const query = e.target.value.toLowerCase();
      const resultadosFiltrados = alojamientos.filter(alojamiento =>
          alojamiento.nombre.toLowerCase().includes(query) ||
          alojamiento.ubicacion.toLowerCase().includes(query)
      );
      mostrarResultados(resultadosFiltrados);
  });

  function mostrarResultados(resultados) {
      resultadosDiv.innerHTML = "";
      resultados.forEach(alojamiento => {
          if (!alojamiento.reservado) {
              const alojamientoDiv = document.createElement("div");
              alojamientoDiv.classList.add("alojamiento");

              alojamientoDiv.innerHTML = `
                  <img src="${alojamiento.imagen}" alt="${alojamiento.nombre}">
                  <div class="info">
                      <h3>${alojamiento.nombre}</h3>
                      <p>Ubicación: ${alojamiento.ubicacion}</p>
                      <p>⭐ ${alojamiento.rating} | ${alojamiento.precio}€ por noche</p>
                      <button class="agregarCarrito" data-id="${alojamiento.id}">Agregar al Carrito</button>
                  </div>
              `;
              resultadosDiv.appendChild(alojamientoDiv);
          }
      });
  }

  document.addEventListener("click", function (e) {
      if (e.target.classList.contains("agregarCarrito")) {
          const alojamientoId = e.target.getAttribute("data-id");
          const alojamiento = alojamientos.find(a => a.id == alojamientoId);

          if (!carrito.some(item => item.id === alojamiento.id)) {
            carrito.push(alojamiento);
            actualizarCarrito();
            mostrarNotificacion("Alojamiento agregado al carrito 🛒");
            resaltarCarrito();
        } else {
            alert("Este alojamiento ya está en el carrito.");
        }        
      }
  });

  // 🔄 NUEVA función para renderizar el contenido del carrito
  function renderizarCarrito() {
      const listaCarrito = document.getElementById("listaCarrito");
      listaCarrito.innerHTML = "";

      if (carrito.length === 0) {
          listaCarrito.innerHTML = "<p>No tienes ningún alojamiento en el carrito.</p>";
      } else {
          carrito.forEach(item => {
              const itemDiv = document.createElement("div");
              itemDiv.classList.add("item-carrito");
              itemDiv.innerHTML = `
                  <p>${item.nombre} - ${item.precio}€</p>
                  <button class="btn-eliminar" data-id="${item.id}">🗑</button>
              `;
              listaCarrito.appendChild(itemDiv);
          });
      }
  }

  // Abrir modal carrito
  document.getElementById("verCarrito").addEventListener("click", function () {
      renderizarCarrito();
      document.getElementById("carritoModal").style.display = "flex";
  });

  // Cerrar modal carrito
  document.getElementById("cerrarCarrito").addEventListener("click", function () {
      document.getElementById("carritoModal").style.display = "none";
  });

  // Eliminar alojamiento del carrito
  document.getElementById("listaCarrito").addEventListener("click", function (e) {
      if (e.target.classList.contains("btn-eliminar")) {
          const alojamientoId = e.target.getAttribute("data-id");
          const index = carrito.findIndex(a => a.id === parseInt(alojamientoId));
          if (index !== -1) {
              carrito.splice(index, 1);
              actualizarCarrito();
              renderizarCarrito(); // ✅ se actualiza de inmediato
          }
      }
  });

  // Simular compra
  document.getElementById("realizarCompra").addEventListener("click", function () {
      if (carrito.length > 0) {
          alert("¡Gracias por tu compra! Hemos reservado los alojamientos para ti.");
          carrito.forEach(item => {
              const alojamiento = alojamientos.find(a => a.id === item.id);
              if (alojamiento) {
                  alojamiento.reservado = true;
              }
          });

          agregarReservasALaVista();
          localStorage.removeItem("carrito");
          carrito.length = 0;
          actualizarCarrito();
          mostrarAlojamientos();
          document.getElementById("carritoModal").style.display = "none";
      } else {
          alert("Tu carrito está vacío.");
      }
  });

  // Mostrar reservas
  function agregarReservasALaVista() {
    listaReservas.innerHTML = "";
    const reservas = alojamientos.filter(a => a.reservado);
    reservas.forEach(reserva => {
        const reservaDiv = document.createElement("div");
        reservaDiv.classList.add("reserva-item");
        reservaDiv.innerHTML = `
            <div class="reserva-detalle">
                <img src="${reserva.imagen}" alt="${reserva.nombre}" width="100">
                <div>
                    <p><strong>${reserva.nombre}</strong></p>
                    <p>${reserva.precio}€</p>
                </div>
            </div>
            <button class="btn-quitar" data-id="${reserva.id}">Quitar Reserva</button>
        `;
        listaReservas.appendChild(reservaDiv);
    });
  }
  

  listaReservas.addEventListener("click", function (e) {
      if (e.target.classList.contains("btn-quitar")) {
          const reservaId = e.target.getAttribute("data-id");
          const alojamiento = alojamientos.find(a => a.id == reservaId);
          if (alojamiento) {
              alojamiento.reservado = false;
              agregarReservasALaVista();
              mostrarAlojamientos();
          }
      }
  });

  // Filtro por precio
  document.getElementById("filtroPrecio").addEventListener("click", () => {
      const resultadosFiltrados = alojamientos.sort((a, b) => a.precio - b.precio);
      mostrarResultados(resultadosFiltrados);
  });
});

// Formulario de contacto
document.getElementById("formContacto").addEventListener("submit", function (e) {
  e.preventDefault();

  const nombre = document.getElementById("nombre").value;
  const email = document.getElementById("email").value;
  const mensaje = document.getElementById("mensaje").value;

  // Simulamos el envío (en un futuro aquí iría una llamada a servidor)
  document.getElementById("respuestaContacto").textContent = `Gracias por tu mensaje, ${nombre}. Te responderemos pronto al correo: ${email}.`;

  // Limpiar campos
  document.getElementById("formContacto").reset();
});

// Mostrar notificación temporal
function mostrarNotificacion(mensaje) {
  const noti = document.createElement("div");
  noti.className = "notificacion-carrito";
  noti.textContent = mensaje;
  document.body.appendChild(noti);

  setTimeout(() => {
      noti.remove();
  }, 2500);
}

// Resaltar el ícono del carrito brevemente
function resaltarCarrito() {
  const carritoIcono = document.getElementById("verCarrito");
  carritoIcono.classList.add("resaltar-carrito");
  setTimeout(() => {
      carritoIcono.classList.remove("resaltar-carrito");
  }, 2000);
}

