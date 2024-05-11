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
    var netTips = total - salesTax;

    // Display the total
    document.getElementById('totalTips').innerHTML = "Total Tips: $" + total.toFixed(2);
    document.getElementById('salesTax').innerHTML = "Sales tax to set aside: $" + salesTax.toFixed(2);
    document.getElementById('distributedTips').innerHTML = "Tips to be distributed: $" + netTips.toFixed(2);
}

// Employee list
var employees = ['Abu Omar', 'Abu Talal', 'Abu Mahmoud', 'Abu Yousef']

// Function to dynamically generate input fields for each employee
function generateEmployeeInputs() {
    var container = document.querySelector('.employeeHours');
    var columns = 3; // Number of columns

    // Calculate number of rows needed
    var rows = Math.ceil(employees.length / columns);

    // Create columns
    for (var i = 0; i < columns; i++) {
        var column = document.createElement('div');
        column.classList.add('column');
        container.appendChild(column);
    }

    // Populate columns with employee inputs
    employees.forEach(function (employee, index) {
        var columnIndex = index % columns; // Calculate columnIndex based on the remainder
        var column = container.querySelectorAll('.column')[columnIndex];

        var div = document.createElement('div');
        div.classList.add('main');

        var label = document.createElement('label');
        label.textContent = employee + ':';
        div.appendChild(label);

        var input = document.createElement('input');
        input.type = 'text';
        input.id = 'hours_' + index;
        input.inputmode = 'numeric';
        div.appendChild(input);

        column.appendChild(div);
    });
}

// Call the function to generate input fields when the page loads
generateEmployeeInputs();

// Function to submit the hours worked by each employee
function submitHours() {
    var hoursWorked = [];

    employees.forEach(function (employee, index) {
        var input = document.getElementById('hours_' + index);
        var hours = parseFloat(input.value) || 0;
        hoursWorked.push({ employee: employee, hours: hours });
    });

    // Do something with the hoursWorked array, such as sending it to the server
    console.log(hoursWorked);
}
