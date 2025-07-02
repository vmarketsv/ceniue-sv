let productos = [];

document.addEventListener("DOMContentLoaded", () => {
    fetch("productos.json")
        .then(res => res.json())
        .then(data => {
            productos = data;
            mostrarProductos(productos);
        });

    // Eventos de filtros
    document.querySelectorAll("#filtroCategoria, #filtroTalla, #filtroColor, #filtroPrecio").forEach(input => {
        input.addEventListener("input", aplicarFiltros);
    });

    document.getElementById("filtroPrecio").addEventListener("input", () => {
        document.getElementById("precioMaxLabel").textContent = `$${document.getElementById("filtroPrecio").value}`;
    });
});

function aplicarFiltros() {
    const categoria = document.getElementById("filtroCategoria").value.toLowerCase();
    const talla = document.getElementById("filtroTalla").value.toLowerCase();
    const color = document.getElementById("filtroColor").value.toLowerCase();
    const precioMax = parseFloat(document.getElementById("filtroPrecio").value);

    const filtrados = productos.filter(p => {
        return (
            (!categoria || p.categoria.toLowerCase() === categoria) &&
            (!talla || p.talla.toLowerCase() === talla) &&
            (!color || p.color.toLowerCase().includes(color)) &&
            (parseFloat(p.precio.replace('$', '')) <= precioMax)
        );
    });

    mostrarProductos(filtrados);
}

function mostrarProductos(productos) {
    const contenedor = document.getElementById("catalogo");
    contenedor.innerHTML = "";

    if (productos.length === 0) {
        contenedor.innerHTML = "<p>No se encontraron productos.</p>";
        return;
    }

    productos.forEach(p => {
        const mensaje = `Hola, me interesa el producto: ${p.nombre} ${p.talla} por ${p.precio}. Imagen: ${p.imagen}`;
        const urlWsp = `https://wa.me/50371234567?text=${encodeURIComponent(mensaje)}`;

        const card = document.createElement("div");
        card.className = "col-sm-6 col-md-4";
        card.innerHTML = `
      <div class="card h-100">
        <img src="${p.imagen}" class="card-img-top" alt="${p.nombre}">
        <div class="card-body">
          <h5 class="card-title">${p.nombre}</h5>
          <p class="card-text">
            <strong>Categoría:</strong> ${p.categoria}<br>
            <strong>Talla:</strong> ${p.talla}<br>
            <strong>Color:</strong> ${p.color}<br>
            <strong>Precio:</strong> ${p.precio}
          </p>
          <a href="${urlWsp}" target="_blank" class="btn btn-success w-100">Consultar por WhatsApp</a>
        </div>
      </div>
    `;
        contenedor.appendChild(card);
    });
}