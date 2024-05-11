function goToPage(page) {
    window.location.href = page;
}

function goBack() {
    window.history.back();
}

function calculateTotal() {
    // Regular expression to match only numbers
    var numberRegex = /^\d*\.?\d*$/;

    // Get the values entered into the input fields
    var fives = document.getElementById('fives').value;
    var tens = document.getElementById('tens').value;
    var twenties = document.getElementById('twenties').value;
    var fifties = document.getElementById('fifties').value;
    var hunnids = document.getElementById('hunnids').value;
    var registeredTips = document.getElementById('registeredTips').value;

    // Validate input values
    if (!numberRegex.test(fives) || !numberRegex.test(tens) || !numberRegex.test(twenties) || !numberRegex.test(fifties) || !numberRegex.test(hunnids) || !numberRegex.test(registeredTips)) {
        alert("Please enter only numbers.");
        return;
    }

    // Convert input values to numbers
    fives = parseFloat(fives) || 0;
    tens = parseFloat(tens) || 0;
    twenties = parseFloat(twenties) || 0;
    fifties = parseFloat(fifties) || 0;
    hunnids = parseFloat(hunnids) || 0;
    registeredTips = parseFloat(registeredTips) || 0;

    // Calculate the total
    var total = (fives * 5) + (tens * 10) + (twenties * 20) + (fifties * 50) + (hunnids * 100);
    var salesTax = Math.round(registeredTips * 0.25 / 5) * 5;
    var netTips = total - salesTax

    // Display the total
    document.getElementById('totalTips').innerHTML = "Total Tips: $" + total.toFixed(2);

    document.getElementById('salesTax').innerHTML = "Sales tax to set aside: $" + salesTax.toFixed(2);

    document.getElementById('distributedTips').innerHTML = "Tips to be distributed: $" + netTips.toFixed(2);


    
}

