// VARIABLES
var currentQuestionIndex = 0;           // CURRENT QUESTIONS INDEX
var timer;                              // VARIABLE FOR TIMER
var timeLeft = 60;                      // REMAINING TIME FOR QUIZ
var score = 0;                          // PLAYERS SCORE

// ARRAY QUUIZ QUESTIONS
var questions = [

    {   // Question One
        title: "Commonly Used Data Types DO NOT Include:",              // QUESTION STATED IN TITLE
        choices: ["Numbers", "Alerts", "Booleans", "strings"],          // POSSIBLE ANSWERS
        answer: "Alerts"                                                // CORRECT ANSWER
    },

    {   // Question Two
        title: "The Condition in an if / else Statement is Enclosed With ______________.",
        choices: ["Quotes", "Curly Brackets", "Parenthesis", "Square Brackets"],
        answer: "Parenthesis"
    },

    {   // Question Three
        title: "Arrays in JavaScript Can Be Used to Store ____________.",
        choices: ["Numbers & Strings", "Other Arrays", "Booleans", "All of the Above"],
        answer: "All of the Above"
    },

    {   // Question Four
        title: "String Values must be Enclosed Within __________ When Being Assigned to Variables.",
        choices: ["Commas", "Curly Brackets", "Quotes", "Parenthesis"],
        answer: "Quotes"
    },

    {   // Question Five
        title: "A Very Useful Tool Used During Development and Debugging for Printing Content to the Debugger is:",
        choices: ["JavaScript", "Terminal", "For Loops", "Console"],
        answer: "Console"
    },

    {   // Question Six
        title: "Arrays start & end with _______?",
        choices: ["Commas", "Brackets", "Question Mark", "Tomato"],
        answer: "Brackets"
    },

    {   // Question Seven
        title: "The Simple Assignment Operator ( Which Looks Like =  ) Does __________",
        choices: ["All Are True", "Adds A Value To A Variable", "Divides A Variable", "Assigns A Value To A Variable"],
        answer: "Assigns A Value To A Variable"
    },

];


// DOM ELEMENT, ELEMENTS IN HTML WHICH WILLBE MANIPULATED
var startButton = document.getElementById('start-button');                              // START BUTTON
var questionContainer = document.querySelector('.question-container');                  // QUESTIONS CONTAINER
var questionTitle = document.getElementById('question-title');                          // QUESTION TITLE
var answerList = document.getElementById('answer-list');                                // ANSWERS LIST
var timerElement = document.getElementById('timer');                                    // TIMER
var scoreContainer = document.querySelector('.score-container');                        // SCORE CONTAINER
var saveButton = document.getElementById('save-score');                                 // SAVE SCORE
var initialsInput = document.getElementById('initials');                                // INITIALS
var leaderboardContainer = document.querySelector('.leaderboard-container');            // LEADERBOARD CONTAINER
var leaderboard = document.getElementById('leaderboard');                               // LEADERBOARD
var clearLeaderboardButton = document.getElementById('clearLeaderboard');               // CLEAR LEADERBOARD
var backButton = document.getElementById('backButton');                                 // BACK BUTTON
var rulesContainer = document.querySelector('.rules');                                  // RULES



// EVENT LISTENERS ... BUTTON CLICKS
startButton.addEventListener('click', startQuiz);                               // START BUTTON ON CLICK
saveButton.addEventListener('click', saveScore);                                // SAVE BUTTON ON CLICK
clearLeaderboardButton.addEventListener('click', clearLeaderboard);             // CLEAR THE LEADERBOARD ON CLICK
backButton.addEventListener('click', resetQuizView);                            // BACK BUTTON ON CLICK


// FUNCTION TO START QUIZ
function startQuiz() {
        document.querySelector(".rules").style.display = "none";                // HIDE RULES WHEN STARTING QUIZ
        startButton.style.display = 'none';                                     // HIDE START BUTTON WHEN STARTING QUIZ
        showQuestion();                                                         // DISPLAY FIRST QUESTION
        timer = setInterval(updateTimer, 1000);                                 // START 1 SECOND INTERVAL TIMER, CALLS UPDATETIMER
    }


// FUNCTION SHOW QUESTION
function showQuestion() {
    if (currentQuestionIndex < questions.length) {                          // CHECK FOR QUESTIONS
        var currentQuestion = questions[currentQuestionIndex];              // GET CURRENT QUESTION
        questionTitle.textContent = currentQuestion.title;                  // QUESTION TITLE SET
        answerList.innerHTML = '';                                          // CLEAR PREVIOUS ANSWERS

         // Loop through choices/create buttons for each
        currentQuestion.choices.forEach(function(choice) {                  // For each choice in 'choices' array of current question
            var button = document.createElement('button');                  // Create new 'button' element
            button.textContent = choice;                                    // Set text content of button to current choice
            button.className = "answer-button";                             // Add CSS class named 'answer-button' to button
            button.addEventListener('click', function() {                   // Add click event listener to button, when button is clicked, 'checkAnswer' function will be called
            checkAnswer(choice);                                            // Check if selected answer is correct
        });
            // Add the newly created button to the 'answerList' element.
            // This displays the choice on the web page.
            answerList.appendChild(button);
    });
            // SHOW QUESTIONS CONTAINER .. to show current question and its choices
            questionContainer.style.display = 'block';
        } else {
            endQuiz();          // IF NO MORE QUESTIONS .... END QUIZ
        }
    }
    

// FUNCTION TO CHECK ANSWERS
    function checkAnswer(selectedChoice) {                                      
        if (selectedChoice === questions[currentQuestionIndex].answer) {        
            score += 10;                                                        // If correct, add 10 points to score
        } else {                                                                
            timeLeft -= 10;                                                     // subtract 10 seconds from timer
        }
        currentQuestionIndex++;                                                 // Move to next question
        showQuestion();                                                         // Display next question
    }


function checkAnswer(answerIndex) {                                             
    if (answerIndex === questions[currentQuestionIndex].correct) {              // If answer correct, increase score
        score += 10;                                                            // Add 10 points to the score                                                      
    } else {                                                                    // Else, reduce remaining time
        timeLeft -= 10;                                                         // Subtract 10 from current value of timeLeft
    }                                                                           // '-= operator, decreases value
    currentQuestionIndex++;                                                     // Move to next question
    showQuestion();                                                             // Display next question
}

// FUNCTION UPDATE TIMER
function updateTimer() {
    timeLeft--;                                                         // DECREASE TIME BY 1 SECOND
    timerElement.textContent = 'Time Left: ' + timeLeft;                // UPDATE TO SHOW TIME LEFT
    if (timeLeft <= 0) {                                                // CHECK IF TIME LEFT REACHED 0
        clearInterval(timer);                                           // IF IT DID, STOP TIMER
        endQuiz();                                                      // CALL FUNCTION, END QUIZ
    }
}


// FUNCTION END QUIZ
function endQuiz() {
    clearInterval(timer);                          // Stop the timer
    questionContainer.style.display = 'none';        // Hide the question container  
    scoreContainer.style.display = 'block';         // Display the score container
    timerElement.textContent = 'Time Left: 0';      // Reset timer display
}

// FUNCTION TO SAVE SCORE WITH USER INITIALS
function saveScore() {
    var initials = initialsInput.value;     // Get initials from input
    if (initials) {     // did user type in intials?
        var savedScores = JSON.parse(localStorage.getItem('scores')) || [];         // get scores item from local storage, if no scores item exists in local storage, empty array is used as fallback using '|| []'
        savedScores.push({ initials: initials, score: score });                     // add current initials and score to saved scores array
        localStorage.setItem('scores', JSON.stringify(savedScores));                // updates scores item in local storage with new list of scores
        displayLeaderboard();                                                       // call display leaderboard function
    }
}

// FUNCTION DISPLAY LEADERBOARD
function displayLeaderboard() {
    scoreContainer.style.display = 'none';                                              // Hide score container
    leaderboardContainer.style.display = 'block';                                         // Display leaderboard container
    var savedScores = JSON.parse(localStorage.getItem('scores')) || [];                     // fetch saved scores from browsers local storage, JSON.parse() converts string back into JS array
    savedScores.forEach(function(scoreEntry) {                                              // For each score entry in the saved scores...
        var p = document.createElement('p');                                                // Create new paragraph element. used to display individual score
        p.textContent = scoreEntry.initials + ': ' + scoreEntry.score;                      // set text content of paragraph to intials and score of current score entry
        leaderboard.appendChild(p);                                                         // append new paragraph element to leaderboard
    });
}

// FUNCTION TO CLEAR LEADERBOARD
function clearLeaderboard() {
        localStorage.removeItem('scores');      // Remove saved scores from local storage
        leaderboard.innerHTML = '';             // Clear the leaderboard display
    }


// Function to reset the quiz to the start view    
function resetQuizView() {
    leaderboardContainer.style.display = 'none';                    // HIDE LEADERBOARD
    rulesContainer.style.display = 'block';                         // SHOW RULES AGAIN
    startButton.style.display = 'block';                            // SHOW START BUTTON AGAIN
    timerElement.textContent = 'Time Left: 60';                     // RESET TIMER DISPLAY
    timeLeft = 60;                                                  // RESET TIMER 
    score = 0;                                                      // RESET SCORE
    currentQuestionIndex = 0;                                       // RESET QUESTION INDEX
}