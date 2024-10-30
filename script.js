// Constant for each pizza price (Object)
const pizzaPrices = {
    "Margarita": 10,
    "Salami": 12,
    "Funghi": 13,
    "Hawaii": 8,
    "Vegetarian": 8
};

// Constant for different sizes
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

        // adds the multiplier when different sizes are selected
    let total = pizzaPrices[selectedPizza.value] * sizeMultipliers[selectedSize];
    
        // add the extras price in the total and makes it flaot number => arrow function synthax
         /*extras.forEach(function(extra) {
            total += parseFloat(extra.dataset.price);
    });*/

    //dataset is directly connected to data-price, which is a custom data attribute of the element
    extras.forEach(extra => {
        total += parseFloat(extra.dataset.price);
    });

            // update and assign the new value to total price. toFixed Methond => useful in monetary values,
            // fixing the price with 2 decimals
    document.getElementById("total-price").textContent = `${total.toFixed(2)} €`;
}

function showOrderSummary() {
    const selectedPizza = document.querySelector("input[name='pizza']:checked");
    const selectedSize = document.getElementById("size-select");
    const extras = Array.from(document.querySelectorAll(".extra:checked"))
                         .map(extra => extra.value.replace(/([a-z])([A-Z])/g, '$1 $2'));
    const remarks = document.getElementById("remarks").value;

    if (!selectedPizza) {
        alert("Please select your prefered pizza!");
        return;
    }


    /* backticks ` are used to create template lierals which help to define multi line string
    and embed expresions with ${} synthax */
    const summary = `
        <h2 style="color: white;">Order summary</h2>
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




/*Array.from converts the NodeList into a regulare JS array using map method
This effectively adds a space between words in camelCase strings.
The result is an array where each element is the value of a checked 
"extra" item, with camelCase converted to spaced words.

 const extras = Array.from(document.querySelectorAll(".extra:checked"))
                    .map(function(extra) {
                        return extra.value.replace(/([a-z])([A-Z])/g, '$1 $2');
                    }); */


