const rows = 24;
const cols = 80;
const terminal = document.getElementById("terminalArea");
//  Let's start by trying to fill one line of the terminal.
const coords = [];
const moveHistory = [];
const currentChar = document.getElementById('activePositionContainer');

const startBtn = document.getElementById('start_btn');

document.addEventListener('dblclick', function(event) {
event.preventDefault();
}, { passive: false });

//  Start of populateGrid function
function populateGrid(rows, cols) {
    terminal.textContent = '';
    let terminalContent = '';
//  This generates the row
    for (let i = 0; i < rows; i++) {
        terminalContent += `<p id="line${i}" class="terminal">`
//  This generates the column.
        for (let j = 0; j < cols; j++) {
            terminalContent += `<span id="r${i}c${j}" class = "terminal">O</span>`
            // console.log(`ID= r${i}c${j}`)
            coords.push(`r${i}c${j}`)
            // console.log(coords)
        }
    }
    terminal.insertAdjacentHTML("afterbegin", terminalContent);
}

//  End of populateGrid function

//  Functions for the movement buttons.
function moveUp() {
    console.log("Moving UP");
    let position = getCurrenPosition(currentChar);
    console.log("Current Position is " + position);
    if (position[1] === 0) {
        console.log("Moving UP not possible. Try another move.")
    } else {
        console.log("Moving UP one position.");
        position[1]--;
        moveHistory.push(position)
        updatePosition(position);
    }

}

function moveDown() {
    console.log("Moving DOWN");
    let position = getCurrenPosition(currentChar);
    console.log("Current Position is " + position);
        if (position[1] === rows-1) {
        console.log("Moving DOWN not possible. Try another move.")
    } else {
        console.log("Moving DOWN one position.");
        position[1]++;
        moveHistory.push(position)
            updatePosition(position);
    }
}

function moveLeft() {
    console.log("Moving LEFT");
    let position = getCurrenPosition(currentChar);
    console.log("Current Position is " + position);
    if (position[0] === 0) {
        console.log("Moving LEFT not possible. Try another move.")
    } else {
        console.log("Moving DOWN one position.");
        position[0]--;
        moveHistory.push(position)
        updatePosition(position);
    }
}

function moveRight() {
    console.log("Moving Right");
    let position = getCurrenPosition(currentChar);
    console.log("Current Position is " + position);
        if (position[0] === cols -1) {
        console.log("Moving RIGHT not possible. Try another move.")
    } else {
        console.log("Moving DOWN one position.");
        position[0]++;
        moveHistory.push(position);
        updatePosition(position);
    }
}

// console.log(terminalContent);

//  The setActiveChar function will mark one character in the grid as active and give it another color.
//  I'll start building it with id="r5c11", which will later be randomized.
function setActiveChar(id) {
    const charToActive = document.getElementById(id);

    // console.log(charToActive.id);
    charToActive.textContent = 'X';
    charToActive.style.color = 'yellow';
    currentChar.textContent = id;
}

function getCurrenPosition(string) {
    const coord = []
    let stringToWorkWith = string.textContent;
    let vCoord = stringToWorkWith.slice(1, (stringToWorkWith.indexOf('c')));
    let hCoord = stringToWorkWith.slice((stringToWorkWith.indexOf('c') + 1), stringToWorkWith.length);
    coord.push(parseInt(hCoord), parseInt(vCoord))
    console.log("Horizontal Coord: " + hCoord + ", Vertical Coord: " + vCoord);
    return coord;
}

function setRandomCoord() {
    // console.log("Length of the array is " + coords.length + " which means there are " + coords.length + " positions in the grid");
    let min = 0;
    let max = coords.length;
    // console.log("Generating a random number in the range of " + min + " and " + max);

    let generatedID = Math.floor(Math.random() * (Math.floor(max) - Math.ceil(min)) + Math.ceil(min));
    console.log("Generated ID is " + generatedID);
    // console.log("Generated Coordinate is " + generatedCoord);
    console.log(coords[generatedID]);
    return coords[generatedID];
}

function updatePosition(position){
    //  Update position receives the new position from the move buttons.
    console.log("New Position is " + position);
    let newPositionID = `r${position[1]}c${position[0]}`
    let newCoordID = coords.indexOf(newPositionID);
    console.log("New position ID is "+newCoordID);
    console.log(newPositionID);
    setActiveChar(coords[newCoordID]);
}


//  This button should become unnecessary when the application is finished!!
startBtn.addEventListener('click', () => {
    console.log("Start Button clicked")
    populateGrid(rows, cols );
    setActiveChar(setRandomCoord());
})