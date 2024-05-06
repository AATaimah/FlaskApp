function calculateTotal() {
    // Get input values
    var fives = parseInt(document.getElementById('fives').value) || 0;
    var tens = parseInt(document.getElementById('tens').value) || 0;
    var twenties = parseInt(document.getElementById('twenties').value) || 0;
    var fifties = parseInt(document.getElementById('fifties').value) || 0;
    var hunnids = parseInt(document.getElementById('hunnids').value) || 0;
    var registeredTips = parseFloat(document.getElementById('registeredTips').value) || 0;
    
    // Calculate total
    var totalTips = (fives * 5) + (tens * 10) + (twenties * 20) + (fifties * 50) + (hunnids * 100);
    
    // Display total
    document.getElementById('totalTips').textContent = 'The total amount of tips collected is: $' + totalTips.toFixed(2);

    // Calculate distributed tips
    var distributedTips = (totalTips - registeredTips * 0.25).toFixed(2);
    document.getElementById('distributedTips').textContent = 'Distributed tip: $' + distributedTips;
}
