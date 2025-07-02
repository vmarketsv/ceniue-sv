const numeroWhatsapp = "50371234567";

fetch("productos.json")
  .then((response) => response.json())
  .then((productos) => {
    const contenedor = document.getElementById("catalogo");

    productos.forEach((producto) => {
      const mensaje = `Hola, me interesa el producto: ${producto.nombre} ${producto.detalle} por ${producto.precio}. Imagen: ${producto.imagen}`;
      const url = `https://wa.me/${numeroWhatsapp}?text=${encodeURIComponent(mensaje)}`;

      const card = document.createElement("div");
      card.className = "producto";
      card.innerHTML = `
        <img src="${producto.imagen}" alt="${producto.nombre}">
        <h2>${producto.nombre}</h2>
        <p>${producto.detalle}</p>
        <p>${producto.precio}</p>
        <a class="boton-wsp" href="${url}" target="_blank">Consultar por WhatsApp</a>
      `;
      contenedor.appendChild(card);
    });
  })
  .catch((error) => {
    console.error("Error cargando productos:", error);
  });
