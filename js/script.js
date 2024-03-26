document.getElementById('my-info').innerHTML = `<p>Student ID: 200549992 - Name: Deep Shah</p>`;

document.getElementById('orderButton').addEventListener('click', function() {
    // Get selected size, toppings, and crust from the form
    const size = document.getElementById('size').value;
    const toppingCheckboxes = document.querySelectorAll('input[name="toppings"]:checked');
    const crust = document.getElementById('crust').value;
    
    // Convert toppings to an array of values
    const toppings = Array.from(toppingCheckboxes).map(checkbox => checkbox.value);
    const toppingsList = toppings.length > 0 ? toppings.join(", ") : "no toppings";
    
    // Create a new Pizza object with the selected options
    const pizza = new Pizza(size, toppings, crust);
    // Calculate the total price of the pizza
    const totalPrice = pizza.calculatePrice();
    
    // Display the order details with the final price
    document.getElementById('orderOutput').innerHTML = `<p>Please confirm you order a ${pizza.size} pizza with ${toppingsList} on a ${pizza.crust} crust. The final price of your pizza is $${totalPrice.toFixed(2)}</p>`;
    // Show the order output
    document.getElementById('orderOutput').style.display = 'block';
});

// Class for Pizza
class Pizza {
    constructor(size, toppings, crust) {
        this.size = size;
        this.toppings = toppings;
        this.crust = crust;
        this.sizePrices = {small: 8, medium: 10, large: 12}; // Price for each pizza size
        this.toppingPrices = { // Price for each topping
            pepperoni: 0.5, mushrooms: 0.5, onions: 0.5, 
            sausage: 0.5, bacon: 0.5, blackOlives: 0.75, pineapple: 0.75
        };
        this.crustPrices = {regular: 0.5, thin: 1, thick: 2}; // Price for each crust type
    }
    
    // Method to calculate the total price of the pizza
    calculatePrice() {
        let price = this.sizePrices[this.size] + this.crustPrices[this.crust]; // Base price with size and crust
        // Add price for each selected topping
        this.toppings.forEach(topping => {
            if (this.toppingPrices[topping] !== undefined) {
                price += this.toppingPrices[topping];
            }
        });
        return price; // Return the total price
    }
}
