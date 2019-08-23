// Define Global Variables
var randomWordSelect = "";
var underscores = [];
var lives = 10;
var winTotal = 0;
var totalGames = 0;
var congrats = false;
var wordGuess = [];

$(".livesleft").text(lives);
$(".totalGames").text(totalGames);
$(".winTotal").text(winTotal);

// Run the following once the document 'Browser Window' is ready
$(document).ready(function () {

    displayLetterButton();
    newGame();

})

// This function creates buttons on the screen for the user to pick from
function displayLetterButton() {
    var letters = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"];
    for (var i = 0; i < letters.length; i++) {
        var letterBtn = $("<button>");
        letterBtn.addClass("letter-button letter letter-button-color")
        letterBtn.attr("data-letter", letters[i]);
        letterBtn.text(letters[i]);
        $(".buttons").append(letterBtn);
    }
}

//Function to clear lives and provide a new word to guess
function newGame() {
    console.log("New Game initiated");
    lives = 10;
    wordGuess = [];

    $(".letter-button-color").css({ backgroundColor: "#fef9e5" });
    $(".letter-button-color").attr('disabled', false);
    $(".livesleft").text(lives);

    randomWordSelect = "";
    underscores = [];
    congrats = false;

    wordSelect();
}

// This function takes an array of words, randomly selects one and then prints out dashes for each letter in that word
function wordSelect() {
    var wordList = ["London", "Paris", "Munich", "Washington", "Singapore", "Rome", "Madrid", "Porto", "Istanbul", "Sydney", "Dubai", "Tokyo", "Seoul", "Bangkok", "Barcelona", "Amsterdam", "Shanghai", "Prague"];
    randomWordSelect = wordList[Math.floor(Math.random() * wordList.length)];
    // Display the answer as "-"
    underscores = [];
    for (i = 0; i < randomWordSelect.length; i++) {
        underscores.push("_");
    }
    // Prints the word as underscores to the screen
    $(".word-guess").text(underscores.join(" "));
}

// This function retrieves the letter selections from the user, via a click event on the oncreen keyboard
$(document).on("click", ".letter-button",function () {

    // Check to make sure that the user still has lives remaining
    if (lives > 0) {
        //convert the hidden word to lowercase to compare with guessed letter
        randomWordSelect = randomWordSelect.toLowerCase();
        wordGuess = underscores;

        //convert letter button clicked to lowercase 
        var letterGuess = $(this).attr("data-letter").toLowerCase();

        //This loops through the word to check if the guessed letter exists and if so updates the display to show the letter in the word, rather than underscore
        for (i = 0; i < randomWordSelect.length; i++) {
            if (randomWordSelect[i] === letterGuess) {
                wordGuess[i] = letterGuess;
                congrats = true;
                $(".word-guess").text(wordGuess.join(" ").toUpperCase());
            }
        }

        //prints a congratulations message if you made a correct guess
        if (congrats === true) {
            //Change the color of the button to green and disable after correct guess
            document.getElementById(this.style.backgroundColor = "lightgreen");
            $(this).attr('disabled', true);
            $(".guessResult").text("Congratulations the mystery word contains the letter: " + letterGuess.toUpperCase());
            congrats = false;
        }
        //prints a I'm sorry message if the letter is not present
        else {
            $(".guessResult").text("I'm sorry that letter is not in the hidden word!");
            lives--;
            //Change the color of the button to red and disable after wrong guess
            document.getElementById(this.style.backgroundColor = "#eca1a6");
            $(this).attr('disabled', true);
            $(".livesleft").text(lives);
        }

        // when the game is complete it messages a congrats and updates the game and win totals
        if (wordGuess.join("") === randomWordSelect) {
            var congratsMessage = ("CONGRATULATIONS:  You Have Found The City *** " + randomWordSelect.toUpperCase() + " *** And WON The Game !!!");
            $(".guessResult").text(congratsMessage);
            winTotal++;
            totalGames++
            $(".totalGames").text(totalGames);
            $(".winTotal").text(winTotal);
            newGame();
        }

        //if you run out of lives before you guess the word it gives a message and updates the game total
        else if (lives === 0) {
            var failMessage = ("GAME OVER !!!  You've exhausted your 10 guesses and you haven't solved found the city: " + randomWordSelect.toUpperCase());
            $(".guessResult").text(failMessage);
            totalGames++
            $(".totalGames").text(totalGames);
            newGame();
        }
    }
})
