const buttonClick = function(e) {
    console.log("Button is clicked");
    console.log(e.target.id);
}

// Select Dom elements
const buttons = document.querySelectorAll(".button");

// Add event listeners
buttons.forEach(button => button.addEventListener("click", buttonClick));