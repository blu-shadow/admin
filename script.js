const PASSKEY = "mystery12#!";

function checkKey() {
    const input = document.getElementById("passkey").value;
    if (input === PASSKEY) {
        document.getElementById("auth-screen").style.display = "none";
        document.getElementById("admin-panel").classList.remove("hidden");
        loadOrders();
    } else {
        document.getElementById("error").innerText = "Wrong pass key!";
    }
}

function loadOrders() {
    const orders = JSON.parse(localStorage.getItem("dadawear_orders")) || [];
    const container = document.getElementById("orders");

    if (orders.length === 0) {
        container.innerHTML = "<p>No orders yet.</p>";
        return;
    }

    container.innerHTML = "";

    orders.forEach((order, index) => {
        const div = document.createElement("div");
        div.className = "order-card";
        div.innerHTML = `
            <h3>Order #${index + 1}</h3>
            <p><strong>Name:</strong> ${order.customer.name}</p>
            <p><strong>Phone:</strong> ${order.customer.phone}</p>
            <p><strong>Address:</strong> ${order.customer.address}</p>
            <p><strong>Payment:</strong> ${order.customer.payment}</p>
            <p><strong>Total:</strong> ${order.total} TK</p>
            <pre>${JSON.stringify(order.items, null, 2)}</pre>
        `;
        container.appendChild(div);
    });
}

function clearOrders() {
    if (confirm("Are you sure?")) {
        localStorage.removeItem("dadawear_orders");
        loadOrders();
    }
}
