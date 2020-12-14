//Sets focus on name
const focusFirst = document.getElementById("name").focus();

//Initially hiddens text input for other title
const otherTitle = document.getElementById("other-title").classList.add('is-hidden'); 

//Function only shows text input when other selected
function showInputBox() {
    const selectedvalue = document.getElementById("title").value;
    if (selectedvalue === "other") {
        document.getElementById("other-title").classList.remove('is-hidden');
    } else { 
        document.getElementById("other-title").classList.add('is-hidden'); 
    }
};

//Makes Select Design defalut
const selectThemeDefault = document.getElementById("design").options[0].selected = true;

//Removes all options for color drop-down initially
const colorselecteddefault = document.getElementById("color");
colorselecteddefault.querySelectorAll('option').forEach(element => element.remove());

// Function filters out color depending on theme selection 
function designChange() {
    const themes = {
        'select theme': [
            {
                value: "select theme",
                text: ""
            }
        ],

        'js puns': [
            {
                value: "cornflowerblue",
                text: "Cornflower Blue (JS Puns shirt only)"
            },
            {
                value: "darkslategrey",
                text: "Dark Slate Grey (JS Puns shirt only)"
            },
            {
                value: "gold",
                text: "Gold (JS Puns shirt only)"
            }
        ],

        'heart js': [
            {
                value: "tomato",
                text: "Tomato (I &#9829; JS shirt only)"
            },
            {
                value: "steelblue",
                text: "Steel Blue (I &#9829; JS shirt only)"
            },
            {
                value: "dimgrey",
                text: "Dim Grey (I &#9829; JS shirt only)"
            }
        ]
    };

    const designSelect = document.getElementById("design");
    const colorSelect = document.getElementById('color');

    //add new options based off the selected option
    const newOptions = themes[designSelect.value];

    // //remove all current options within the color select element
    colorSelect.querySelectorAll('option').forEach(element => element.remove());

    //loop through new options, foreach one, create a new option and insert 
    newOptions.forEach(optionObject => {
        const option = document.createElement('option');
        option.value = optionObject.value;
        option.text = optionObject.text;
        option.innerHTML = optionObject.text;
        colorSelect.add(option);
    });
}


// If the user selects a workshop, don't allow selection of a workshop at the same day and time
let checkboxes = document.querySelectorAll(".activities label input");
document.querySelector('.activities').addEventListener("change", (e) => {
    //grab the date and time 
    const checkbox = e.target;
    const checkedBoxDateAndTime = e.target.getAttribute('data-day-and-time');

    for (let i = 0; i < checkboxes.length; i++) {

        const listOfDateAndTime = checkboxes[i].getAttribute('data-day-and-time');
        // disable the checkbox and visually indicate that the workshop in the competing time slot isn't available
        if (checkedBoxDateAndTime === listOfDateAndTime && checkbox !== checkboxes[i]) {
            if (checkbox.checked) {
                checkboxes[i].setAttribute('disabled', true);
            } else {
                // When a user unchecks an activity, make sure that competing activities (if there are any) are no longer disabled
                checkboxes[i].removeAttribute("disabled");
            }
        };
    };
// Grabs amount forech checked activity and total the amount
    let checkedOptions = document.querySelectorAll('input:checked');
    let total = 0;

    checkedOptions.forEach(function (checkbox) {
        let checkedboxCost = parseInt(checkbox.getAttribute('data-cost'));
        total += checkedboxCost;
    });

    let totalDisplay = document.getElementById('totalDisplay');
    totalDisplay.innerHTML = total;
});

//Initially hiddens options
const paypalOptionsHidden = document.querySelector("#paypal").classList.add("is-hidden");
const bitcoinOptionHidden = document.querySelector("#bitcoin").classList.add("is-hidden");

//Shows element needed based on payment option selected 
function paymentChanged() {
    const selectedPayment = document.getElementById('payment').value;
    const paymentOptions = document.querySelectorAll('.payment-option');

    switch (selectedPayment) {
        case 'credit card':
            paymentOptions.forEach(function (paymentOption) {
                if (!paymentOption.classList.contains('credit-card')) {
                    paymentOption.classList.add('is-hidden');
                } else {
                    paymentOption.classList.remove('is-hidden');
                }

            });
            break;
        case 'paypal':
            paymentOptions.forEach(function (paymentOption) {
                if (!paymentOption.classList.contains('paypal')) {
                    paymentOption.classList.add('is-hidden');
                } else {
                    paymentOption.classList.remove('is-hidden');
                }

            });
            break;
        case 'bitcoin':
            paymentOptions.forEach(function (paymentOption) {
                if (!paymentOption.classList.contains('bitcoin')) {
                    paymentOption.classList.add('is-hidden');
                } else {
                    paymentOption.classList.remove('is-hidden');
                }

            });
            break;
    }
};

//Form selections
const form = document.querySelector("form");
const name = document.querySelector("#name");
const email = document.querySelector("#email");
const title = document.querySelector("#title");
const activitiesInputs = document.querySelectorAll('.activities input');
const activitiesValidation = document.querySelector('#radio-wrapper');

//Selections for credit card input
const creditCardNumber = document.querySelector('#cc-num');
const zipCode = document.querySelector('#zip');
const cvv = document.querySelector('#cvv');

//Span selections for validation message
const emailValidationMsg = document.querySelector("#emailValidationMsg");
const nameValidationMsg = document.querySelector("#nameValidationMsg");
const activitiesValidationMsg = document.querySelector("#activitiesValidationMsg");
const ccValidationMsg = document.querySelector("#ccValidationMsg");
const zipValidationMsg = document.querySelector("#zipValidationMsg");
const cvvValidationMsg = document.querySelector("#cvvValidationMsg");

/* Helper function to validate input */
const nameValidator = () => {
    const nameValue = name.value;
    if (nameValue.length > 0) {
        name.style.border = "medium solid white"
        nameValidationMsg.innerHTML = ""
        return true;
    } 
    else {
        name.style.border = "thick solid red"
        nameValidationMsg.innerHTML = "Please enter name"
        nameValidationMsg.style.color = "red";
        nameValidationMsg.style.fontWeight = "bold";
        return false;
    }
};
/* Real time validation */
name.addEventListener('blur', nameValidator);

const emailValidator = () => {
    const emailValue = email.value;
    // 3. Create a variable to store the .indexOf of the `@` in the email value
    const atIndex = emailValue.indexOf("@");
    // 4. Create a variable to store the .lastIndexOf of the `.` in the email value
    const lastIndex = emailValue.lastIndexOf(".");
    // If the `@` index is greater than one AND the `.` last index is greater than the `@` index + 1 
    if (atIndex > 1 && lastIndex > atIndex + 1) {
        email.style.border = "medium solid white"
        emailValidationMsg.innerHTML = ""
        return true;
    } 
    else {
        email.style.border = "thick solid red"
        emailValidationMsg.innerHTML = "Please enter email"
        emailValidationMsg.style.color = "red";
        emailValidationMsg.style.fontWeight = "bold";
        return false;
    }
};
/* Real time validation */
email.addEventListener('blur', emailValidator);

const activitiesValidator = () => {
    for (let i = 0; i < activitiesInputs.length; i++) {
        if (activitiesInputs[i].checked) {
            activitiesValidation.style.color = "black";
            activitiesValidationMsg.innerHTML = ""
            return true;
        }
    }
    activitiesValidation.style.color = "red";
    activitiesValidationMsg.innerHTML = "Must select at least one activity"
    activitiesValidationMsg.style.color = "red";
    activitiesValidationMsg.style.fontWeight = "bold";
    return false;
};
/* Real time validation */
activitiesValidation.addEventListener('mouseout', activitiesValidator);


const creditCardValidator = () => {
    const creditCardNumberValue = creditCardNumber.value;
    //Credit Card field should only accept a number between 13 and 16 digits.
    if (creditCardNumberValue.length < 13 || creditCardNumberValue.length > 16) {
        creditCardNumber.style.border = "thick solid red"
        ccValidationMsg.innerHTML = "Card Number is Invaild";
        ccValidationMsg.style.color = "red";
        ccValidationMsg.style.fontWeight = "bold";
        return false;
    } else {
        creditCardNumber.style.border = "medium solid white"
        ccValidationMsg.innerHTML = ""
        return true;
    }
};
/* Real time validation */
creditCardNumber.addEventListener('blur', creditCardValidator);


const zipCodeValidator = () => {
    const zipCodeValue = zipCode.value;
    if (zipCodeValue.length < 5 || zipCodeValue.length > 5) {
        zipCode.style.border = "thick solid red";
        zipValidationMsg.innerHTML = "Invalid zip";
        zipValidationMsg.style.color = "red";
        zipValidationMsg.style.fontWeight = "bold";
        return false;
    } else {
        zipCode.style.border = "medium solid white";
        zipValidationMsg.innerHTML = "";
        return true;
    }
};
/* Real time validation */
zipCode.addEventListener('blur', zipCodeValidator);

const cvvValidator = () => {
    const cvvValue = cvv.value;
    if (cvvValue.length < 3 || cvvValue.length > 3) {
        cvv.style.border = "thick solid red";
        cvvValidationMsg.innerHTML = "Invalid CVV"
        cvvValidationMsg.style.color = "red";
        cvvValidationMsg.style.fontWeight = "bold";
        return false;
    } else {
        cvv.style.border = "medium solid white";
        cvvValidationMsg.innerHTML = "";
        return true;
    }
};
/* Real time validation */
cvv.addEventListener('blur', cvvValidator);

//Prevents Submition if validations are not true
form.addEventListener('submit', (e) => {
    if (!nameValidator()) {
        e.preventDefault();
    }
    if (!emailValidator()) {
        e.preventDefault();
    }
    if (!activitiesValidator()) {
        e.preventDefault();
    }
    if (!creditCardValidator()) {
        e.preventDefault();
    }
    if (!zipCodeValidator()) {
        e.preventDefault();
    }
    if (!cvvValidator()) {
        e.preventDefault();
    }
});
