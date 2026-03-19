
const weightInput = document.querySelector("#weight");
const heightInput = document.querySelector("#height");
const calculateBtn = document.getElementById("calculateBtn");
const bmiValue = document.getElementById("bmiValue");
const bmiCategory = document.getElementById("bmiCategory");


calculateBtn.addEventListener("click", function() {
    const weight = parseFloat(weightInput.value);
    const height = parseFloat(heightInput.value);
    
    console.log("Weight:", weight);
    console.log("Height:", height);
     
    if (isNaN(weight) || isNaN(height) || weight <= 0 || height <= 0) {
        bmiValue.textContent = "Invalid input";
        bmiCategory.textContent = "Category: N/A";
        return;
    }
    

    const bmi = weight / (height * height);
    
 
    bmiValue.textContent = bmi.toFixed(1);
    
    let category = "";
    if (bmi < 18.5) {
        category = "Underweight";
    } else if (bmi >= 18.5 && bmi < 25) {
        category = "Normal weight";
    } else if (bmi >= 25 && bmi < 30) {
        category = "Overweight";
    } else {
        category = "Obese";
    }
    
    bmiCategory.textContent = `Category: ${category}`;
});


weightInput.addEventListener("keypress", function(event) {
    if (event.key === "Enter") {
        calculateBtn.click();
    }
});

heightInput.addEventListener("keypress", function(event) {
    if (event.key === "Enter") {
        calculateBtn.click();
    }
});

console.log("Button element:", calculateBtn);