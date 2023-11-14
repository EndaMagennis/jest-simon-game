let game = {
    score: 0,
    currentGame: [], // computer move
    playerMoves: [], // players move
    turnNumber: 0,
    choices: ["button1", "button2", "button3", "button4"], // possible choices
}

function newGame() {
    game.score = 0;
    game.turnNumber = 0;
    // loop through each cirlce
    for (let circle of document.getElementsByClassName("circle")) {
        // if data-listener for current circle is false
        if (circle.getAttribute("data-listener") !== "true") {
            // add an eventLitener to the current circle onclick
            circle.addEventListener("click", (e) => {
                // create a move variable and set it to the current id
                let move = e.target.getAttribute("id");
                // call lightsOn function on this 'turn'
                lightsOn(move);
                // push this id into the playerMoves array
                game.playerMoves.push(move);
                // call the playerTurn function
                playerTurn();
            });
            // change circle data-listener attribute to true
            circle.setAttribute("data-listener", "true");
        }
    };

    showScore();
    addTurn();
}

function showScore() {
    // set the score div text to the current score
    document.getElementById('score').innerText = game.score;
}

function addTurn() {
    // clear the players moves
    game.playerMoves = [];
    // add a new circle to the computers sequence
    game.currentGame.push(game.choices[(Math.floor(Math.random()*game.choices.length))]);
    // call the showTurns function
    showTurns();
}

function lightsOn(circ) {
    // add the light class to the current cirlce
    document.getElementById(circ).classList.add("light");
    // remove the light class after 800ms
    setTimeout(() => {
        document.getElementById(circ).classList.remove("light");
    }, 400);
}

function showTurns() {
    // set the first turn to the 0 index of the currentGame array
    game.turnNumber = 0;
    // setInterval() repeatedly calls a function or executes a code snippet, with a fixed time delay between each call
    let turns = setInterval(() => {
        // call lights on for the current circle in the array
        lightsOn(game.currentGame[game.turnNumber]);
        // iterate through the array
        game.turnNumber++;
        // at the end of the array, stop function call
        if(game.turnNumber >= game.currentGame.length) {
            clearInterval(turns)
        }
    }, 800);
}

module.exports = { game, newGame, showScore, addTurn, lightsOn, showTurns };