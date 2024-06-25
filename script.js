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
    var fives = document.getElementById('fives').value;
    var tens = document.getElementById('tens').value;
    var twenties = document.getElementById('twenties').value;
    var fifties = document.getElementById('fifties').value;
    var hunnids = document.getElementById('hunnids').value;
    var registeredTips = document.getElementById('registeredTips').value;

    fives = parseFloat(fives) || 0;
    tens = parseFloat(tens) || 0;
    twenties = parseFloat(twenties) || 0;
    fifties = parseFloat(fifties) || 0;
    hunnids = parseFloat(hunnids) || 0;
    registeredTips = parseFloat(registeredTips) || 0;

    var total = (fives * 5) + (tens * 10) + (twenties * 20) + (fifties * 50) + (hunnids * 100);
    var salesTax = Math.round(registeredTips * 0.25 / 5) * 5;
    netTips = total - salesTax;

    document.getElementById('totalTips').innerHTML = "Total Tips: $" + total.toFixed(2);
    document.getElementById('salesTax').innerHTML = "Sales tax to set aside: $" + salesTax.toFixed(2);
    document.getElementById('distributedTips').innerHTML = "Tips to be distributed: $" + netTips.toFixed(2);

    console.log('netTips:', netTips);

    submitHours();
}

function validateInputs() {
    var inputs = document.querySelectorAll('input[type="text"]');
    var allValid = true;

    inputs.forEach(function(input) {
        var value = input.value.trim();
        if (value === '' || isNaN(value)) {
            allValid = false;
        }
    });

    var saveButton = document.getElementById('saveButton');
    saveButton.disabled = !allValid;

    return allValid;
}

var employees = ['Abu Omar','Abu Talal','Fadi','Dawood','Abdullah','Abu Yazan','Khatab',"Khader",'Mahmoud','Mostafa','Wael',
"Monir",'Mohd A','Abood','Mohd F','Noor','Sara Eid','Weeam','Mariam'];

function generateEmployeeInputs() {
    var container = document.querySelector('.employeeHours');
    var numColumns = Math.ceil(employees.length / 7);

    for (var i = 0; i < numColumns; i++) {
        var column = document.createElement('div');
        column.classList.add('column');
        container.appendChild(column);
    }

    employees.forEach(function (employee, index) {
        var columnIndex = Math.floor(index / 9);
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

        input.addEventListener('change', function() {
            validateInputs();
            calculateTotal();
        });

        column.appendChild(div);
    });
}

generateEmployeeInputs();

function calculateDeservedTips(hoursWorked) {
    var hoursDividedBy40 = hoursWorked.map(function (employee) {
        return { employee: employee.employee, hoursDividedBy40: employee.hours / 40 };
    });

    var totalHoursDividedBy40 = hoursDividedBy40.reduce(function (total, current) {
        return total + current.hoursDividedBy40;
    }, 0);

    var ratio = totalHoursDividedBy40 > 0 ? Math.round(netTips / totalHoursDividedBy40 / 5) * 5 : 0;

    var deservedTip = hoursWorked.map(function (employee) {
        return { employee: employee.employee, deservedTip: totalHoursDividedBy40 > 0 ? Math.round(ratio * employee.hours / 40 / 5) * 5 : 0 };
    });

    var totalTips = deservedTip.reduce(function(acc, current) {
        return acc + current.deservedTip;
    }, 0);

    var remainder = netTips - totalTips;

    return { deservedTip, remainder };
}

function submitHours() {
    var hoursWorked = [];

    employees.forEach(function (employee, index) {
        var input = document.getElementById('hours_' + index);
        var inputValue = input.value.trim();
        var hours = parseFloat(inputValue) || 0;
        if (!isNaN(hours) && hours < 150) {
            hoursWorked.push({ employee: employee, hours: hours });
        } else {
            alert("Invalid input");
        }
    });

    var { deservedTip, remainder } = calculateDeservedTips(hoursWorked);

    console.log("Total sum of tips:", deservedTip.reduce((acc, current) => acc + current.deservedTip, 0) || 0);

    var container = document.getElementById('employeeTips');
    container.innerHTML = '';

    var table = document.createElement('table');
    var headerRow = document.createElement('tr');
    var headerEmployee = document.createElement('th');
    var headerTip = document.createElement('th');

    headerEmployee.textContent = 'Employee';
    headerTip.textContent = 'Deserved Tip';

    headerRow.appendChild(headerEmployee);
    headerRow.appendChild(headerTip);
    table.appendChild(headerRow);

    deservedTip.forEach(function(employeeTip) {
        var row = document.createElement('tr');
        var cellEmployee = document.createElement('td');
        var cellTip = document.createElement('td');

        cellEmployee.textContent = employeeTip.employee;
        cellTip.textContent = '$' + (employeeTip.deservedTip || 0).toFixed(2);

        row.appendChild(cellEmployee);
        row.appendChild(cellTip);
        table.appendChild(row);
    });

    container.appendChild(table);

    var remainderElement = document.createElement('div');
    remainderElement.textContent = "Remainder: $" + remainder.toFixed(2);
    remainderElement.style.marginLeft = '2px';
    remainderElement.style.fontWeight = 'bold';

    container.appendChild(remainderElement);
}


document.addEventListener('DOMContentLoaded', function() {
    const addBtn = document.getElementById('add-btn');
    const removeBtn = document.getElementById('remove-btn');
    const employeeList = document.getElementById('employee-list');
    let selectedEmployee = null;
    let dragged;

    // Function to add a new employee
    addBtn.addEventListener('click', function() {
        const newEmployee = prompt('Enter the name of the new employee:');
        if (newEmployee) {
            const li = document.createElement('li');
            li.textContent = newEmployee;
            li.draggable = true; // Enable draggable
            employeeList.appendChild(li);
            addDragDropListeners(li);
        }
    });

    // Function to remove the selected employee
    removeBtn.addEventListener('click', function() {
        if (selectedEmployee) {
            selectedEmployee.remove();
            selectedEmployee = null;
        }
    });

    // Function to handle drag start
    function dragStart(event) {
        dragged = event.target;
        event.dataTransfer.setData('text/plain', dragged.textContent);
    }

    // Function to handle drag over
    function dragOver(event) {
        event.preventDefault();
    }

    // Function to handle drop
    function drop(event) {
        event.preventDefault();
        const textData = event.dataTransfer.getData('text/plain');
        const target = event.target.closest('li');
        if (target) {
            const dropped = document.createElement('li');
            dropped.textContent = textData;
            employeeList.insertBefore(dropped, target);
            dragged.remove();
            addDragDropListeners(dropped);
        }
    }

    // Function to add drag and drop listeners to an element
    function addDragDropListeners(element) {
        element.draggable = true;
        element.addEventListener('dragstart', dragStart);
        element.addEventListener('dragover', dragOver);
        element.addEventListener('drop', drop);
    }

    // Event listener to select an employee
    employeeList.addEventListener('click', function(event) {
        const li = event.target.closest('li');
        if (li && employeeList.contains(li)) {
            if (selectedEmployee) {
                selectedEmployee.classList.remove('selected');
            }
            selectedEmployee = li;
            selectedEmployee.classList.add('selected');
        }
    });

    // Add drag and drop listeners to existing employees
    const employees = document.querySelectorAll('#employee-list li');
    employees.forEach(employee => {
        addDragDropListeners(employee);
    });
});

