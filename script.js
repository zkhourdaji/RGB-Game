var numSquares = 6;
var colors = generateRandomColors(numSquares);
var rgbColorTitle = document.getElementById('RGB-Title');
var squares = document.querySelectorAll('.square');
var pickedColor = pickColor();
var message = document.getElementById('message');
var h1 = document.querySelector('h1');
var resetButton = document.getElementById('reset');
var modeButtons = document.querySelectorAll('.mode');
rgbColorTitle.textContent = pickedColor;

//initialize the game
init();

function init() {
  // set up colors for squares and add listeners
  setupColors();
  //set up mode buttons
  setupModeButtons();

}

//set up the easy and hard mode buttons
function setupModeButtons() {

  for (let i = 0; i < modeButtons.length; i++) {
    // attach listeners
    modeButtons[i].addEventListener('click', function() {
      //remove class selected from both buttons and re add it to the clicked button
      modeButtons[0].classList.remove('selected');
      modeButtons[1].classList.remove('selected');
      this.classList.add('selected');
      //update the number of squares
      if (this.textContent === "Easy") {
        numSquares = 3;
      } else {
        numSquares = 6;
      }
      reset();
    });
  }
}

function setupColors() {
  for (let i = 0; i < squares.length; i++) {
    squares[i].style.backgroundColor = colors[i];

    //attack listeners to the squares
    squares[i].addEventListener('click', function() {
      // if clicked on the right color
      if (this.style.backgroundColor === pickedColor) {
        changeColors(this.style.backgroundColor);
        h1.style.backgroundColor = this.style.backgroundColor;
        message.textContent = 'Correct!';
        resetButton.textContent = 'Play Again?';
      }
      // if wrong color picked, faded it out and try again
      else {
        message.textContent = 'Try Again';
        this.style.backgroundColor = '#232323';
      }
    });
  }
}
// reset the game
function reset() {
  //genearete new colors
  colors = generateRandomColors(numSquares);
  // pick one of the generated colors
  pickedColor = pickColor();
  rgbColorTitle.textContent = pickedColor;
  resetButton.textContent = 'New Colors';
  message.textContent = "";

  for (let i = 0; i < squares.length; i++) {
    // if 6 colors, then show all of them with the colors
    if (colors[i]) {
      squares[i].style.display = 'block';
      squares[i].style.backgroundColor = colors[i];

    } else { // if 3 then hide the bottom ones
      squares[i].style.display = 'none';
    }
  }
  h1.style.backgroundColor = 'steelblue';
}

resetButton.addEventListener('click', function() {
  reset();
});


// pick a random color from the color array
function pickColor() {
  let random = Math.floor(Math.random() * colors.length);
  return colors[random];
}

//update the colors of the squares
function changeColors(color) {
  for (let i = 0; i < squares.length; i++) {
    squares[i].style.backgroundColor = color;
  }
}

// generate a random color array
function generateRandomColors(numberOfColors) {
  var colorArray = [];
  for (let i = 0; i < numberOfColors; i++) {
    colorArray.push(randomColor());
  }
  return colorArray;
}

//generate a random rgb color
function randomColor() {
  let r = Math.floor(Math.random() * 256);
  let g = Math.floor(Math.random() * 256);
  let b = Math.floor(Math.random() * 256);
  return `rgb(${r}, ${g}, ${b})`;
}