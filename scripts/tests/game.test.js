/**
 * @jest-environment jsdom
 */

const exp = require("constants");
const { game, newGame, showScore, addTurn, lightsOn, showTurns, playerTurn } = require("../game");

jest.spyOn(window, "alert").mockImplementation( () => {

});

beforeAll(() => {
    let fs = require("fs");
    let fileContents = fs.readFileSync("index.html","utf-8");
    document.open();
    document.write(fileContents);
    document.close();
});

describe("Game object contains correct keys", ()=> {
    test("Score key exists", () => {
        expect("score" in game).toBe(true);
    });
    test("currentGame key exists", () => {
        expect("currentGame" in game).toBe(true);
    });
    test("playerMoves key exists", () => {
        expect("playerMoves" in game).toBe(true);
    });
    test("choices key exists", () => {
        expect("choices" in game).toBe(true);
    });
    test("choices contains ids of each of the four buttons", () =>{
        expect(game.choices).toEqual(["button1", "button2", "button3", "button4"]);
    });
    test("turnNmuber key exists", () => {
        expect("turnNumber" in game).toBe(true);
    });
    test("lastButton key exists", () => {
        expect("lastButton" in game).toBe(true);
    });
    test("turnInProgress key exists", () => {
        expect("turnInProgress" in game).toBe(true);
    })
});

describe("newGame works correctly", () => {
    // settings before all tests, is affected by each test
    beforeAll(() => {
        game.score = 42;
        game.playerMoves = ['button1', 'button2', 'button3'];
        game.currentGame = ['button1', 'button2', 'button3'];
        document.getElementById('score').innerText = "42";
        newGame();
    });

    test("should set game score to zero", () => {
        expect(game.score).toEqual(0);
    });
    test("should clear the player moves array", () => {
        expect(game.playerMoves.length).toBe(0);
    });
    test("should be one move in computer's game array", () => {
        expect(game.currentGame.length).toBe(1);
    });
    test("should display zero when new game starts", () => {
        expect(document.getElementById('score').innerText).toBe(0);
    });
    test("should reset turnNumber to 0", () => {
        expect(game.turnNumber).toBe(0);
    });
    test("expect data-listener to be true", () => {
        const elements = document.getElementsByClassName("circle");
        for (let element of elements) {
            expect(element.getAttribute("data-listener")).toEqual("true");
        }
    });
});

describe("gameplay works correctly", () => {
    // settings before each test, is affected by first test
    beforeEach(() => {
        game.score = 0;
        game.currentGame = [];
        game.playerMoves = [];
        addTurn();
    });
    // reset settings after each test 
    afterEach(() => {
        game.score = 0;
        game.currentGame = [];
        game.playerMoves = [];
    });
    test("addTurn adds a new turn to the game", () => {
        addTurn();
        expect(game.currentGame.length).toBe(2);
    });
    test("should add correct class to light up the buttons", () => {
        let button = document.getElementById(game.currentGame[0]);
        lightsOn(game.currentGame[0]);
        expect(button.classList).toContain("light");
    });
    test("showTurns should update game.turnNumber", () => {
        game.turnNumber = 42;
        showTurns();
        expect(game.turnNumber).toBe(0);
    });
    test("should increment the score if turn is correct", () => {
        game.playerMoves.push(game.currentGame[0]);
        playerTurn();
        expect(game.score).toBe(1);
    });
    test("should display alert if player makes wrong move", () => {
        game.playerMoves.push("wrong");
        playerTurn();
        expect(window.alert).toBeCalledWith("Wrong Move!");
    });
    test("should toggle turnInProgress", () => {
        showTurns();
        expect(game.turnInProgress).toBe(true);
    });
    test("click during cpu sequence should fail", () => {
        showTurns();
        game.lastButton = "";
        document.getElementById("button2").click();
        expect(game.lastButton).toEqual("");
    })
});