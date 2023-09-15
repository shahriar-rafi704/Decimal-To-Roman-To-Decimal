let input = document.getElementById("input");
let button = document.getElementById("submit");
let errorMessage = document.getElementById("error");
let output = document.getElementById("output");
let conversionType = document.getElementById("conversion-type");

const romanObject = {
  M: 1000,
  CM: 900,
  D: 500,
  CD: 400,
  C: 100,
  XC: 90,
  L: 50,
  XL: 40,
  XXX: 30,
  XX: 20,
  X: 10,
  IX: 9,
  V: 5,
  IV: 4,
  I: 1,
};

button.addEventListener("click", () => {
  const selectedConversion = conversionType.value;
  const inputValue = input.value.trim();

  if (selectedConversion === "decimalToRoman") {
    decimalToRoman(inputValue);
  } else if (selectedConversion === "romanToDecimal") {
    romanToDecimal(inputValue);
  }

  input.value = "";
});

function decimalToRoman(num) {
  let number = parseInt(num);
  if (isNaN(number) || num.trim().length == 0 || number > 4999 || number < 1) {
    errorMessage.innerHTML = "Invalid Input. Please enter a valid number between 1 and 4999.";
    output.innerHTML = "";
    return false;
  }

  errorMessage.innerHTML = "";
  output.innerHTML = "";
  let result = "";
  let romanValues = Object.keys(romanObject);
  romanValues.forEach((key) => {
    while (romanObject[key] <= number) {
      number -= romanObject[key];
      result += key;
    }
  });
  
  output.innerHTML = result;
  output.classList.add('show');
}

function romanToDecimal(romanNum) {
  const romanPatterns = {
    CM: 900,
    M: 1000,
    CD: 400,
    D: 500,
    XC: 90,
    C: 100,
    XL: 40,
    L: 50,
    IX: 9,
    X: 10,
    IV: 4,
    V: 5,
    I: 1,
  };

  if (!isValidRomanNumeral(romanNum)) {
    errorMessage.innerHTML = "Invalid Roman numeral. Please enter a valid Roman numeral.";
    output.innerHTML = "";
    return false;
  }

  let decimalResult = 0;

  while (romanNum.length > 0) {
    for (const pattern in romanPatterns) {
      if (romanNum.startsWith(pattern)) {
        decimalResult += romanPatterns[pattern];
        romanNum = romanNum.substring(pattern.length);
        break;
      }
    }
  }
  output.innerHTML = decimalResult;
  errorMessage.innerHTML = "";
  output.classList.add('show');
}

function isValidRomanNumeral(romanNum) {
  const romanNumeralPattern = /^(M{0,4})(CM|CD|D?C{0,3})(XC|XL|L?X{0,3})(IX|IV|V?I{0,3})$/;
  return romanNumeralPattern.test(romanNum);
}
function hideOutput() {
  output.classList.remove('show');
}