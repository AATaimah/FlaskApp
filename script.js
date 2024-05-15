function goToPage(page) {
    window.location.href = page;
}

function goBack() {
    window.history.back();
}

// Declare netTips variable globally
var netTips;

// Function to calculate total tips
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
    netTips = total - salesTax; // Assign netTips globally

    // Display the total
    document.getElementById('totalTips').innerHTML = "Total Tips: $" + total.toFixed(2);
    document.getElementById('salesTax').innerHTML = "Sales tax to set aside: $" + salesTax.toFixed(2);
    document.getElementById('distributedTips').innerHTML = "Tips to be distributed: $" + netTips.toFixed(2);

    // Call the function to submit hours with the calculated netTips
    submitHours();
}

// Employee list
var employees = ['Abu Omar', 'Abu Talal', 'Fadi', 'Dawood'];

// Function to dynamically generate input fields for each employee
function generateEmployeeInputs() {
    var container = document.querySelector('.employeeHours');

    employees.forEach(function (employee, index) {
        var div = document.createElement('div');
        div.classList.add('main');

        var label = document.createElement('label');
        label.textContent = employee + '\'s Hours :';
        div.appendChild(label);

        var input = document.createElement('input');
        input.type = 'text';
        input.id = 'hours_' + index;
        input.inputmode = 'numeric';
        div.appendChild(input);

        container.appendChild(div);
    });
}

// Call the function to generate input fields when the page loads
generateEmployeeInputs();

// Function to submit hours and calculate deserved tips
function submitHours() {
    var hoursWorked = [];

    employees.forEach(function (employee, index) {
        var input = document.getElementById('hours_' + index);
        var hours = parseFloat(input.value) || 0;
        hoursWorked.push({ employee: employee, hours: hours });
    });

    // Calculate hours divided by 40 for each employee
    var hoursDividedBy40 = hoursWorked.map(function (employee) {
        return { employee: employee.employee, hoursDividedBy40: employee.hours / 40 };
    });

    // Sum up all the values of hours divided by 40
    var totalHoursDividedBy40 = hoursDividedBy40.reduce(function (total, current) {
        return total + current.hoursDividedBy40;
    }, 0);

    // Output the array to the console
    console.log('Hours divided by 40 for each employee:', hoursDividedBy40);
    console.log('Sum hours divided by 40 for all employees:', totalHoursDividedBy40);

    var ratio = Math.round(netTips / totalHoursDividedBy40/ 5) * 5;
    console.log(ratio);

    var employeeDeservedTip = hoursWorked.map(function (employee) {
        // Calculate the deserved tip for the current employee
        var deservedTip = ratio * employee.hoursDividedBy40;
    
        // Return an object containing the employee's name and their deserved tip
        return { 
            employee: employee.employee, 
            deservedTip: deservedTip
        };
    });

    console.log('netTips:', netTips);
    console.log('totalHoursDividedBy40:', totalHoursDividedBy40);

    console.log('ratio:', ratio);
    
    // Output the array of employeeDeservedTip to the console
    console.log(employeeDeservedTip);
}
