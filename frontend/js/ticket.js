const ticket = JSON.parse(localStorage.getItem("ticket"));

// Sin compra confirmada no hay ticket para mostrar
if (ticket === null) {
    window.location.href = "index.html";
} else {
    mostrarTicket();
}

function mostrarTicket() {
    document.getElementById("ticket-numero").textContent = ticket.numero;
    document.getElementById("ticket-fecha").textContent = ticket.fecha;
    document.getElementById("ticket-cliente").textContent = ticket.cliente;
    document.getElementById("ticket-total").textContent = formatearPrecio(ticket.total);

    let html = "";
    ticket.items.forEach((item) => {
        html += `
            <tr>
                <td>${item.name}</td>
                <td class="num">${item.cantidad}</td>
                <td class="num">${formatearPrecio(item.price)}</td>
                <td class="num">${formatearPrecio(item.price * item.cantidad)}</td>
            </tr>
        `;
    });
    document.getElementById("ticket-items").innerHTML = html;
}

// ===== Descargar el ticket en PDF con la libreria jsPDF =====
function descargarPdf() {
    const doc = new window.jspdf.jsPDF();
    let y = 20;

    doc.setFontSize(18);
    doc.text("Hojas & Viñetas", 20, y);

    doc.setFontSize(12);
    y += 10;
    doc.text("Ticket N°: " + ticket.numero, 20, y);
    y += 8;  
    doc.text("Fecha: " + ticket.fecha, 20, y);
    y += 8;
    doc.text("Cliente: " + ticket.cliente, 20, y);
    y += 12;

    ticket.items.forEach((item) => {
        doc.text(item.cantidad + " x " + item.name, 20, y);
        doc.text(formatearPrecio(item.price * item.cantidad), 150, y);
        y += 8;
    });

    y += 4;
    doc.setFontSize(14);
    doc.text("Total: " + formatearPrecio(ticket.total), 20, y);

    doc.save("ticket-" + ticket.numero + ".pdf");
}
