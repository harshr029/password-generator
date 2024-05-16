// gather all elements on which js will be applied
const displayPass = document.querySelector("[data-displayPass]");
const copyBtn = document.querySelector("[data-copyButton]");
const copyMsg = document.querySelector("[data-displayCopyMsg]");
const lengthNumber = document.querySelector("[data-lengthNumber]");
const inputSlider = document.querySelector("[data-lenSlider]");
const uppercaseCheck = document.querySelector("#uppercheck");
const lowercaseCheck = document.querySelector("#lowercheck");
const numbersCheck = document.querySelector("#nums");
const symbolsCheck = document.querySelector("#symbols");
const indicator = document.querySelector("[data-indicator]");
const generateBtn = document.querySelector(".generate-button");
const allCheckBoxes = document.querySelectorAll("input[type=checkbox]");


// symbols string from where symbols will be used 
const symbols = "`~!@#$%^&*()_+-={}|[]:;'/?><.,";

//Initially
let password = "";
let passwordLength = 10;
handleSlider();

let checkCount = 1;

//display slidervalue
function handleSlider() {
    inputSlider.value = passwordLength;
    lengthNumber.innerText = passwordLength;

    //to fill the color in slider we'll modify background size accordingly
    const max = inputSlider.max;
    const min = inputSlider.min;
    const backgroundSizePercentage = (passwordLength - min) * 100 / (max-min);
    inputSlider.style.backgroundSize = `${backgroundSizePercentage}% 100%`;    //width by height
}


//set indicator color
function setIndicator(color) {
    //indicator color
    indicator.style.backgroundColor = color;
    // shadow
    let shadowStr = `0px 0px 16px ${color}`;
    indicator.style.boxShadow = shadowStr;       //x-offset y-offset blur spread(size of shadow)
}


//random integer generator
function getRandomInteger(min, max) {      //max is exclusive so parse with addtion of one in upper limit
    return Math.floor(Math.random() * (max - min)) + min;
}

//functions for generation of password members
function generateNumber() {
    return getRandomInteger(0, 10);        //actual range 0 - 9
}

function generateUpperCase() {
    return String.fromCharCode(getRandomInteger(65, 91));
}

function generateLowerCase() {
    return String.fromCharCode(getRandomInteger(97, 123));
}

function generateSymbol() {
    let index = getRandomInteger(0, symbols.length);
    return symbols.charAt(index);
}



//set indicator strength color by rules
function checkStrength() {
    let hasUpper = false;
    let hasLower = false;
    let hasNumber = false;
    let hasSymbol = false;

    if (uppercaseCheck.checked) hasUpper = true;
    if (lowercaseCheck.checked) hasLower = true;
    if (numbersCheck.checked) hasNumber = true;
    if (symbolsCheck.checked) hasSymbol = true;


    if (hasUpper && hasLower && (hasNumber || hasSymbol) && passwordLength >= 8) {
        setIndicator("#0f0");
    }
    else if ((hasUpper || hasLower) && (hasNumber || hasSymbol) && passwordLength >= 6) {
        setIndicator("#ff0");
    }
    else {
        setIndicator("#f00");
    }
}


//copy on clipboard
async function copyPassword() {
    try {
        await navigator.clipboard.writeText(displayPass.value);
        copyMsg.innerText = "Copied";
        // console.log("in try")
    } catch (e) {
        copyMsg.innerText = "Failed";
        // console.log("in catch")
    }

    //to make copy wala span visible
    copyMsg.classList.add("active");

    //to make it invisible again after 2sec
    setTimeout(() => { copyMsg.classList.remove("active"); }, 2000);
}



//main function that'll generate password
function shufflePassword(password) {
    //Fisher-Yates algorithm: it is used to shuffle array elements
    let str = "";
    for (let i = password.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        const temp = password[i];
        password[i] = password[j];
        password[j] = temp;
    }
    password.forEach(el => str += el);
    return str;
}

function generatePassword() {

    //no password if check count is 0
    if (checkCount === 0) return;

    //if slider at wrong position
     if (passwordLength < checkCount) {
        passwordLength = checkCount;
        handleSlider();
    }

    //let's make a new password according to conditions

    //remove old password
    password = "";


    //making an array having functions of checked conditions
    let funcArray = [];
    if (uppercaseCheck.checked) {
        funcArray.push(generateUpperCase);
    }
    if (lowercaseCheck.checked) {
        funcArray.push(generateLowerCase);
    }
    if (numbersCheck.checked) {
        funcArray.push(generateNumber);
    }
    if (symbolsCheck.checked) {
        funcArray.push(generateSymbol);
    }


    //Compulsary elements in the password
    for (let i = 0; i < funcArray.length; i++) {
        password += funcArray[i]();
    }

   
    
    //Remaining elements in the password
    for (let i = 0; i < passwordLength - funcArray.length; i++) {
        let randIndex = getRandomInteger(0, funcArray.length);
        password += funcArray[randIndex]();
        // console.log("Running");
    }

    //shuffle this password
    password = shufflePassword(Array.from(password));      //password string parsed in form of array for fisher-yates

    //display the password
    displayPass.value = password;

    //check the strength of newly generated password
    checkStrength();

    //if slider is on wrong position
}



//applying event listeners
inputSlider.addEventListener("input", e => {
    //e is an object having info about event and target is the element in html on which that event is fired
    passwordLength = e.target.value;
    handleSlider();
});


copyBtn.addEventListener('click', () => {
    if (password.length > 0) {
        copyPassword();
    }
});

//to get checkCount
function handleCheckBoxCount() {
    checkCount = 0;
    allCheckBoxes.forEach((checkbox) => {
        if (checkbox.checked) {
            checkCount++;
        }
    })

    //special condition
    if (passwordLength < checkCount) {
        passwordLength = checkCount;
        handleSlider();
    }
}

allCheckBoxes.forEach((checkbox) => {
    checkbox.addEventListener('change', handleCheckBoxCount);
})


generateBtn.addEventListener('click', generatePassword);