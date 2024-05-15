function goToPage(page) {
    window.location.href = page;
}

function goBack() {
    window.history.back();
}

window.onscroll = function() {scrollFunction()};

function scrollFunction() {
    var scrollButton = document.getElementById("scrollButton");
    if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
        scrollButton.style.display = "block";
    } else {
        scrollButton.style.display = "none";
    }
}


// Declare netTips variable globally
var netTips;

// Function to calculate total tips
function calculateTotal() {


    // Get the values entered into the input fields
    var fives = document.getElementById('fives').value;
    var tens = document.getElementById('tens').value;
    var twenties = document.getElementById('twenties').value;
    var fifties = document.getElementById('fifties').value;
    var hunnids = document.getElementById('hunnids').value;
    var registeredTips = document.getElementById('registeredTips').value;


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
    netTips = total - salesTax ; // Assign netTips globally

    // Display the total
    document.getElementById('totalTips').innerHTML = "Total Tips: $" + total.toFixed(2);
    document.getElementById('salesTax').innerHTML = "Sales tax to set aside: $" + salesTax.toFixed(2);
    document.getElementById('distributedTips').innerHTML = "Tips to be distributed: $" + netTips.toFixed(2);

    console.log('netTips:', netTips); 

    // Call the function to submit hours with the calculated netTips
    submitHours();
}

// Employee list
var employees = ['Abu Omar','Abu Talal','Fadi','Dawood','Abdullah','Abu Yazan','Khatab',"Khader",'Mahmoud','Mostafa','Wael',"Monir",'Mohd A','Abood','Mohd F','Noor','Sara Eid','Weeam'];

// Function to dynamically generate input fields for each employee
function generateEmployeeInputs() {
    var container = document.querySelector('.employeeHours');

    // Calculate number of columns based on number of employees
    var numColumns = Math.ceil(employees.length / 6); // Change 6 to desired number of employees per column

    for (var i = 0; i < numColumns; i++) {
        var column = document.createElement('div');
        column.classList.add('column');
        container.appendChild(column);
    }

    employees.forEach(function (employee, index) {
        var columnIndex = Math.floor(index / 9); // Change 6 to desired number of employees per column
        var column = container.querySelectorAll('.column')[columnIndex];

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

        // Add event listener here
        input.addEventListener('change', function() {
            calculateTotal(); // Recalculate everything on input change
        });

        column.appendChild(div);
    });
}

// Call the function to generate employee inputs
generateEmployeeInputs();


// Function to submit hours and calculate deserved tips
function submitHours() {
    var hoursWorked = [];

    employees.forEach(function (employee, index) {
        var input = document.getElementById('hours_' + index);
        var inputValue = input.value.trim(); // Remove leading and trailing whitespaces
        var hours = parseFloat(inputValue) || 0 ; // Parse the input value
        if (!isNaN(hours) && hours < 150) {
            hoursWorked.push({ employee: employee, hours: hours });
        } else {
            alert("Invalid input")
        }


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

    var deservedTip = hoursWorked.map(function (employee) {

        // Return an object containing the employee's name and their deserved tip
        return { employee: employee.employee, deservedTip: Math.round(ratio * employee.hours / 40 /5) * 5 };

    });

    // Summing up all the tips
    var totalTips = deservedTip.reduce(function(acc, current) {
        return acc + current.deservedTip;
    }, 0);

    var remainder = netTips - totalTips;

    


    // Output the total sum of tips
    console.log("Total sum of tips:", totalTips);

    // Get the container element
    var container = document.getElementById('employeeTips');

    // Clear the container (optional)
    container.innerHTML = ''; // This removes any previous content

    // Create a table element
    var table = document.createElement('table');
    var headerRow = document.createElement('tr');
    var headerEmployee = document.createElement('th');
    var headerTip = document.createElement('th');

    headerEmployee.textContent = 'Employee';
    headerTip.textContent = 'Deserved Tip';

    headerRow.appendChild(headerEmployee);
    headerRow.appendChild(headerTip);
    table.appendChild(headerRow);

    // Loop through deservedTip and create table rows
    deservedTip.forEach(function(employeeTip) {
    var row = document.createElement('tr');
    var cellEmployee = document.createElement('td');
    var cellTip = document.createElement('td');

    cellEmployee.textContent = employeeTip.employee;
    cellTip.textContent = '$' + employeeTip.deservedTip.toFixed(2);

    row.appendChild(cellEmployee);
    row.appendChild(cellTip);
    table.appendChild(row);
    });

    container.appendChild(table);
    // Create an element for the remainder
    var remainderElement = document.createElement('div');
    remainderElement.textContent = "Remainder: $" + remainder.toFixed(2);
    remainderElement.style.marginLeft = '2px'; // Add margin top to create space between table and remainder
    remainderElement.style.fontWeight = 'bold'; // Make the remainder text bold

    // Append the remainder element to the container
    container.appendChild(remainderElement);

}

function saveAndRedirect() {

    goToPage('index.html')

}