var numSquares = 6;
var colors = [];
var pickedColor;
var squares = document.querySelectorAll(".square");
var colorDisplay = document.getElementById("colorDisplay");
var messageDisplay = document.querySelector("#message");
var h1 = document.querySelector("h1");
var resetButton = document.querySelector("#reset");
var modeButtons = document.querySelectorAll(".mode");
var theHex = [];
var pickedHex = "#ffffff";


init();

function init(){
    //Mode buttons
    setupModeButtons();

    setupSquares();

    reset();

}  

function setupModeButtons(){
    for (var i = 0; i < modeButtons.length; i++){
        modeButtons[i].addEventListener("click", function(){
            modeButtons[0].classList.remove("selected");
            modeButtons[1].classList.remove("selected");
            this.classList.add("selected");   
            this.textContent === "Easy" ? numSquares = 3: numSquares = 6;
            reset();
        })
    }    
}

function setupSquares(){
    for(var i = 0; i < squares.length; i++){
        //add click listeners to squares
        squares[i].addEventListener("click", function(){
            //grab color of clicked square
            var clickedColor = this.style.backgroundColor;
            //compare color to pickedColor
            if(clickedColor === pickedColor){
                messageDisplay.textContent = "Correct";
                changeColors(clickedColor);
                resetButton.textContent = "Play Again?";
                h1.style.backgroundColor = clickedColor;

                function randomInRange(min, max) {
                    return Math.random() * (max - min) + min;
                  }
                  
                  confetti({
                    angle: randomInRange(55, 125),
                    spread: randomInRange(50, 70),
                    particleCount: randomInRange(50, 100),
                    origin: { y: 0.6 },
                    colors: [pickedHex, "#ffffff"]
                  });

            } else {
                this.style.backgroundColor = "#232323";
                messageDisplay.textContent = "Try Again";
            }
        })
    }
}

function rgbToHex(r, g, b) {
    return "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
  }
  console.log("RGB to HEX test: " + rgbToHex(28, 135, 201)); // #1c87c9


function reset(){
    //reset hex selection for confetti
    theHex = [];
    //generate colors
    colors = generageRandomColors(numSquares);
    //pick new random color from array
    pickedColor = pickColor();
    //change colorDisplay to match picked color
    colorDisplay.textContent = pickedColor;
    resetButton.textContent = "New Colors"; 
    //change colors of squares
    for(var i = 0; i < squares.length; i++){
        if(colors[i]){
           squares[i].style.backgroundColor = colors[i]; 
           squares[i].style.display = "block";
        } else {
            squares[i].style.display = "none";
        }
        
    }
    h1.style.backgroundColor = "steelblue";
    messageDisplay.textContent = "";
}



resetButton.addEventListener("click", function(){
    reset();
})



function changeColors(color){
    //loop through all squares
    for(var i = 0; i < colors.length; i++){
        //change each color to match given color
        squares[i].style.backgroundColor = color;
    }
    
};

function pickColor(){
    var random = Math.floor(Math.random() * colors.length);
    console.log("Colors Pick: " + colors[random]);
    pickedHex = theHex[random];
    console.log("The Hex: " + pickedHex);
    return colors[random];
};

function generageRandomColors(num){
    //make array
    var arr = [];
    //repeat num times
    for(var i = 0; i < num; i++){
        //get random color and push into array
        arr.push(randomColor());
    }
    //return array
    return arr;
};

function randomColor(){
    //pick a red, green, blue, from 0 to 255
    var r = Math.floor(Math.random() * 256);
    var g = Math.floor(Math.random() * 256);
    var b = Math.floor(Math.random() * 256);
    theHex.push(rgbToHex(r, g, b));
    return "rgb(" + r + ", " + g + ", " + b + ")";
};