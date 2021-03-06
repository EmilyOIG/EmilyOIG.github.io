function loadWordsearch(){
    document.getElementById("wordsearch").innerHTML = displayWordsearch(initializeWordsearch(10));
}
        
            
// A function to create and fill a wordsearch
function initializeWordsearch(dimension){
    var WORDS = ["home", "about", "more", "contact"];
    var word_locations = {};
    wordsearch = createWordsearch(dimension);
    for(var i = 0; i <  4; i++){
        wordsearch = addWord(WORDS[i], wordsearch, word_locations);
    }
    //console.log(word_locations["home"]);
    wordsearch = fillBlanks(wordsearch);
    return wordsearch;
}


// A function to build an empty wordsearch to be filled
function createWordsearch(dimension) {
    var arr = [];
    for (var row = 0; row < dimension; row++) {
       arr[row] = [];
       for (var col = 0; col < dimension; col++) {
           arr[row][col] = "-";
       }
    }
    return arr;
}


// A function to print the wordsearch 
function displayWordsearch(wordsearch) {
    var display = "<br/>";
    for (var row = 0; row < 10; row++) {
       for (var col = 0; col < 10; col++) {
           display += wordsearch[row][col] ;
       }
       display += "<br/>";
    }
    display += "<br/>";
    return display;
}


// A function to position a specified word in the wordsearch
function addWord(word, wordsearch, word_locations){
    // Initialize/declare variables and constants
    const DIRECTIONS = ["hoz", "vert", "diag"];
    var fits = false;
    var first_letter = true;
    var last_letter = false;
    var starting_row;
    var starting_col;
    var direction;

    // Set the path for the link 
    var path;
    if (word == "home") {
        path = "index.html";
    } else {
        path = word + ".html"
    }

    // Keeps choosing a new starting location until one is found where the word fits
    while (!fits){
        starting_row = Math.floor(Math.random() * 10); 
        starting_col = Math.floor(Math.random() * 10); 
        direction = DIRECTIONS[Math.floor(Math.random() * 3)];
        fits = wordFits(starting_row, starting_col, word, direction, wordsearch);
    }

    // Add location to dicitionary for use later 
    word_locations[word] = [starting_row, starting_col, direction]

    // Fills spaces in wordsearch with each letter of the predefined words
    switch(direction){
        case "hoz":
            for (var i = 0; i < word.length; i++){
                // includes html links so words can be used as naviation
                // TODO: add attribute highlighted and id of word??
                if (first_letter) {
                    wordsearch [starting_row] [starting_col + i] = "<a href=\"" + path + "\" class=\"" + word + "\" id=\"" + word +"_first\">" + word[i].toUpperCase() + " </a>";
                    first_letter = false;
                } else {
                    wordsearch [starting_row] [starting_col + i] = "<a href=\"" + path + "\" class=\"" + word + "\">" + word[i].toUpperCase() + " </a>";
                }
            }
            break;
        case "vert":
            for (var i = 0; i < word.length; i++){

                if (first_letter) {
                    wordsearch [starting_row + i] [starting_col] = "<a href=\"" + path + "\" class=\"" + word + "\"  id=\"" + word +"_first\">" + word[i].toUpperCase() + " </a>";
                    first_letter = false;
                } else {
                    wordsearch [starting_row + i] [starting_col] = "<a href=\"" + path + "\" class=\"" + word + "\">" + word[i].toUpperCase() + " </a>";
                }
            }
            break;
        case "diag":
            for (var i = 0; i < word.length; i++){
                if (first_letter) {
                    wordsearch [starting_row + i] [starting_col + i] = "<a href=\"" + path + "\" class=\"" + word + "\" id=\"" + word +"_first\">" + word[i].toUpperCase() + " </a>";
                    first_letter = false;
                } else {
                    wordsearch [starting_row + i] [starting_col + i] = "<a href=\"" + path + "\" class=\"" + word + "\">" + word[i].toUpperCase() + " </a>";
                }
                //wordsearch [starting_row + i] [starting_col + i] = "<a href=\"" + path + "\" >" + word[i].toUpperCase() + "</a> ";
            }
            break;
        default:
            break;
    }
    
    return wordsearch;

}


// A function to fill the blank spaces of a wordsearch with random letters
function fillBlanks(wordsearch){
    const LETTERS = ["A ", "B ", "C ", "D ", "E ", "F ", "G ", "H ", "I ", "J ", "K ", "L ", "M ", "N ", "O ", "P ", "Q ", "R ", "S ", "T ", "U ", "V ", "W ", "X ", "Y ", "Z "];
    for (var row = 0; row < 10; row++){
        for (var col = 0; col < 10; col++){
            if (wordsearch[row][col] == "-"){
                randomLetter = LETTERS[Math.floor(Math.random() * 26)];
                wordsearch[row][col] = randomLetter;
            }
        }
    }
    return wordsearch;
}


// A function to check if a specified word can fit in the wordsearch at the given location
function wordFits(starting_row, starting_col, word, direction, wordsearch){
    word_len = word.length;

    switch(direction){
        case "hoz":
            // Check if there is enough space in the wordsearch
            if (starting_col + word_len > 10){
                return false;
            }
            // Check each space from the start onwards for emptiness
            for(var i = starting_col; i < starting_col + word_len; i++){
                if (wordsearch[starting_row][i] != "-"){
                    return false;
                }
            }
            return true;
            break;

        case "vert":
            // Check if there is enough space in the wordsearch
            if (starting_row + word_len > 10){
                return false;
            }
            // Check each space from the start onwards for emptiness
            for(var i = starting_row; i < starting_row + word_len; i++){
                if (wordsearch[i][starting_col] != "-"){
                    return false;
                }
            }
            return true;
            break;

        case "diag":
            // Check if there is enough space in the wordsearch
            if (starting_col + word_len > 10 || starting_row + word_len > 10){
                return false;
            }
            // Check each space from the start onwards for emptiness
            for(var i = 0; i < word_len; i++){
                if (wordsearch[starting_row + i][starting_col + i] != "-"){
                    return false;
                }
            }
            return true;
            break;
        default:
            return false;
    }
    
}