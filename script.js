const pizzaPrices = {
    "Margerita": 10,
    "Salami": 12,
    "Funghi": 13,
    "Hawaii": 8,
    "Vegetarian": 8
};

const sizeMultipliers = {
    "small": 1,
    "medium": 1.5,
    "large": 2
};

function calculateTotal() {
    const selectedPizza = document.querySelector("input[name='pizza']:checked");
    const selectedSize = document.getElementById("size-select").value;
    const extras = document.querySelectorAll(".extra:checked");
    
    if (!selectedPizza) {
        document.getElementById("total-price").textContent = "0.00 €";
        return;
    }

    let total = pizzaPrices[selectedPizza.value] * sizeMultipliers[selectedSize];
    
    extras.forEach(extra => {
        total += parseFloat(extra.dataset.price);
    });

    document.getElementById("total-price").textContent = `${total.toFixed(2)} €`;
}

function showOrderSummary() {
    const selectedPizza = document.querySelector("input[name='pizza']:checked");
    const selectedSize = document.getElementById("size-select");
    const extras = Array.from(document.querySelectorAll(".extra:checked"))
                         .map(extra => extra.value.replace(/([a-z])([A-Z])/g, '$1 $2'));
    const remarks = document.getElementById("remarks").value;

    if (!selectedPizza) {
        alert("Please select your prefered pizza!.");
        return;
    }

    const summary = `
        <h2>Order sumary</h2>
        <p>Pizza: ${selectedPizza.value}</p>
        <p>Size: ${selectedSize.options[selectedSize.selectedIndex].text}</p>
        <p>Extras: ${extras.length > 0 ? extras.join(", ") : "None"}</p>
        <p>Remarks: ${remarks || "None"}</p>
        <p>Total price: ${document.getElementById("total-price").textContent}</p>
    `;

    document.getElementById("order-summary").innerHTML = summary;
    alert("Your order was succesfully sent!");
}

document.querySelectorAll("input[name='pizza'], #size-select, .extra").forEach(input => {
    input.addEventListener("change", calculateTotal);
});

document.getElementById("order-button").addEventListener("click", showOrderSummary);

// Initial price calculation when user is on the page
calculateTotal();
