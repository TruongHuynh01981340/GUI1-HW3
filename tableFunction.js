/*
    Name: Truong-Thinh Huynh SID: 01981340
    GitHub Username: TruongHuynh01981340
*/

function regenerateTable() {
    // Convert text inputs into numeric values.
    var minColVal = parseInt(document.getElementById('minColVal').value);
    var maxColVal = parseInt(document.getElementById('maxColVal').value);
    var minRowVal = parseInt(document.getElementById('minRowVal').value);
    var maxRowVal = parseInt(document.getElementById('maxRowVal').value);

    // For debugging purposes
    // console.log(minColVal);
    // console.log(maxColVal);
    // console.log(minRowVal);
    // console.log(maxRowVal);

    // Input validate all values
    const checkMinCol = inputValidation('minColVal', 'minColErrorMsg', 'maxColVal');
    const checkMaxCol = inputValidation('maxColVal', 'maxColErrorMsg', 'minColVal');
    const checkMinRow = inputValidation('minRowVal', 'minRowErrorMsg', 'maxRowVal');
    const checkMaxRow = inputValidation('maxRowVal', 'maxRowErrorMsg', 'minRowVal');

    // If any value returned as false, then don't generate table as there's invalid input
    if (!checkMinCol || !checkMaxCol || !checkMinRow || !checkMaxRow) {
        return;
    }

    const previousTable = document.getElementById("generatedTable");

    // If there's already a table being displayed, remove that so the new one will be display.
    if (previousTable) {
        previousTable.remove();
    }

    // This div will be for making the table scrollable. Right now, we will add all table elements into this div.
    const tableDiv = document.getElementById("tableDiv");

    const table = document.createElement("table");
    table.id = "generatedTable"
    table.style.border = "1px solid black"

    const row = document.createElement("tr");
    // This lone th is for making an empty spot in the first row and column of the table
    const th = document.createElement("th");

    // Add the th to the first row.
    row.appendChild(th);

    // This for loop is use to make the header that display the min to max to the first row.
    // Very important source: https://developer.mozilla.org/en-US/docs/Web/API/Document_Object_Model/Traversing_an_HTML_table_with_JavaScript_and_DOM_Interfaces
    for (let i = minColVal; i <= maxColVal; i++) {
        const th = document.createElement("th");
        th.innerText = i;
        row.appendChild(th);
    }

    // Add it to the table.
    table.appendChild(row);

    // This nested for loops is to generate the rest of the table.
    for (let i = minRowVal; i <= maxRowVal; i++) {
        const row = document.createElement("tr");
        const th = document.createElement("th");
        th.innerText = i;
        row.appendChild(th);

        for (let j = minColVal; j <= maxColVal; j++) {
            const td = document.createElement("td");
            td.innerText = i * j;
            row.appendChild(td);
        }

        table.appendChild(row);
    }

    // Add table to the div.
    tableDiv.appendChild(table);
}   

/* Very important function for input validation. Take in the current input and their corresponding span.
    The second input is to determine if min is less or equal to max or vise versa. */
// https://www.w3schools.com/js/tryit.asp?filename=tryjs_validation_number
// https://www.geeksforgeeks.org/number-validation-in-javascript/
// https://www.geeksforgeeks.org/form-validation-using-javascript/
// https://developer.mozilla.org/en-US/docs/Learn/Forms/Form_validation

function inputValidation(inputId, inputErrorMsgId, secondInputId) {
    const input = document.getElementById(inputId);
    const value = parseInt(input.value);
    const errorMsg = document.getElementById(inputErrorMsgId);

    const secondInput = document.getElementById(secondInputId);
    const sIValue = parseInt(secondInput.value);

    // Validating if input is text or numeric.
    if (isNaN(value)) {
        errorMsg.textContent = "Invalid Input: Please enter a number.";
        errorMsg.style.color = "red";

        return false;
    // Validating if value is less than -50 or greater than 50 or in between.
    } else if (value < -50 || value > 50) {
        errorMsg.textContent = "Invalid Input: Please enter a number between -50 to 50.";
        errorMsg.style.color = "red";

        return false;
    // Validating if there if the corresponding input is filled out.
    } else if (secondInput.value == "" || isNaN(sIValue)) {
        errorMsg.textContent = "Valid Input";
        errorMsg.style.color = "green";

        return true;
    } else {
        // If the second input is max, then our current input has to be less or equal. If not, then it's false.
        if ((secondInputId == "maxColVal" || secondInputId == "maxRowVal") && value > sIValue) {
            errorMsg.textContent = "Invalid Input: Please enter a number less or equal to maximum value.";
            errorMsg.style.color = "red";

            return false;
        // If the second input is min, then our current input has to be greater or equal. If not, then it's false.
        } else if ((secondInputId == "minColVal" || secondInputId == "minRowVal") && value < sIValue) {
            errorMsg.textContent = "Invalid Input: Please enter a number greater or equal to minimum value.";
            errorMsg.style.color = "red";
            
            return false;
        } else {
            errorMsg.textContent = "Valid Input";
            errorMsg.style.color = "green";

            return true;
        }
    }
}
