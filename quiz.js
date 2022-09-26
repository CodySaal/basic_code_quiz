var questionText = document.getElementById("questionText")
var choicesEl = document.getElementById("choices")
var scoreEl = document.getElementById("score")
var formEl = document.getElementById("initialForm")
var highscorePage = document.getElementById("highscorePage")
var highscoreList = document.getElementById("highScoresList")
var resultsPage = document.getElementById("resultsPage")
var highscoresBtn = document.getElementById("highscoreBtn")
var clearHighscoresBtn = document.getElementById("clearScores")
var goHomeBtn = document.getElementById("goHome")
var quizEl = document.getElementById("questionScreen");
var timerEl = document.getElementById("timer")
var correctEl = document.getElementById("correct")
var incorrectEl = document.getElementById("incorrect")
var feedbackEl = document.getElementById("feedback")
var index = 0
var score = 0
var timeLeft = 60
var highscores = []
var questionList = [
    {
        text:"Inside which HTML element do we put the JavaScript?",
        answer: "<script>",
        choices: ["<javascript>", "<scripting>", "<script>", "<js>"]
    },
    {
        text:"How do you write an IF statement in JavaScript?",
        answer: "if (i == 5)",
        choices: ["if i = 5", "if i == 5 then", "if i = 5 then", "if (i == 5)"]
    },
    {
        text:"How does a FOR loop start?",
        answer: "for (i = 0; i <= 5; i++)",
        choices: ["for i = 1 to 5", "for (i <= 5; i++)", "for (i = 0; i <= 5)", "for (i = 0; i <= 5; i++)"]
    },
    {
        text:"What is the correct way to write a JavaScript array?",
        answer: "var colors = ['red', 'green', 'blue']",
        choices: ["var colors = (1:'red', 2:'green', 3:'blue')", "var colors = ['red', 'green', 'blue']", "var colors = 'red', 'green', 'blue'", "var colors = 1 = ('red'), 2 = ('green'), 3 = ('blue')"]
    },
    {
        text:"Which operator is used to assign a value to a variable?",
        answer: "=",
        choices: ["*", "-", "X", "="]
    }
    
]
function loadHighscores(){
    var loadedHighscores = localStorage.getItem("highscores")
        if (!loadedHighscores){
            return false;
        };
    loadedHighscores = JSON.parse(loadedHighscores);
    for (var i = 0; i < loadedHighscores.length; i++){
        var highscoreEl = document.createElement("li");
        highscoreEl.innerText = loadedHighscores[i].initials + " | " + loadedHighscores[i].score;
        highscoreList.appendChild(highscoreEl);
        highscores.push(loadedHighscores[i]);
    }
}
loadHighscores();
function storeHighscore(){
    localStorage.setItem("highscores", JSON.stringify(highscores))
}
function renderQuestion() {
    questionText.innerText = questionList[index].text

    choicesEl.innerHTML=""

    for (var i = 0; i < questionList[index].choices.length; i++){
        var li = document.createElement('li')
        var choice = questionList[index].choices[i]
        li.innerText = choice
        choicesEl.appendChild(li)
    }
}

function startTimer() {
    var timer = setInterval(function(){
        document.getElementById("insertTimer").innerHTML=timeLeft;
        timeLeft--;
        if (timeLeft < 0) {
            clearInterval(timer);
            showScore();
        }
    }, 1000);
}


function startQuiz(){
    console.log("Start Quiz")
    toggleWelcome();
    startTimer();
    renderQuestion();
    
}

function showScore() {
    scoreEl.innerHTML = score
    // Enter initials:     submit
    formEl.addEventListener("submit", useform)
    formEl
    quizEl.style.display = "none";
    // toggleResults();
    resultsPage.style.display = "block";
    feedbackEl.style.display = "none"
    // showHighscores();
}

function enterHighscore(event){
    event.preventDefault()
    var initials = document.querySelector("#initials").value;
}

function showHighScores() {
    //List of highscores
    feedbackEl.style.display = "none"
    timerEl.style.display = "none";
    document.getElementById("welcomeScreen").style.display = "none";
    document.getElementById("questionScreen").style.display = "none";
    resultsPage.style.display = "none";
    highscorePage.style.display = "block"
    //go back and clear scores buttons
}

function continueQuiz(){
    if (index < 5){
        renderQuestion();
    } else {
        timeLeft = 0;
        showScore();
    }
}

function toggleWelcome(){
    var welcome = document.getElementById("welcomeScreen");
    if (welcome.style.display === "none"){
        welcome.style.display = "block";
    } else {
        welcome.style.display = "none";
    }
}

function useform(event){
    event.preventDefault();
    var initials = document.querySelector("#initials").value;
    console.log(initials)
    console.log(score)
    var indHighscore = {
        initials: initials,
        score: score
    }
    highscores.push(indHighscore)
    storeHighscore(); 
    //Test
    var highscoreEl = document.createElement("li");
    highscoreEl.innerHTML = indHighscore.initials + " | " + indHighscore.score;
    highscoreList.appendChild(highscoreEl);
    highscorePage.style.display = "block"
    resultsPage.style.display = "none"
}

// function storeHighscore(){
//     localStorage.setItem("highscores", JSON.stringify(highscores))
// }

// function loadHighscores(){
//     var loadedHighscores = localStorage.getItem("highscores");
//     loadedHighscores = JSON.parse(loadedHighscores);
//     for (var i = 0; i < loadedHighscores.length; i++){
//         var highscoreEl = document.createElement("li");
//         highscoreEl.innerText = loadedHighscores[i].initials + " | " + loadedHighscores[i].score;
//         highscoreList.appendChild(highscoreEl);
//         highscores.push(loadedHighscores[i]);
//     }
// }

function clearHighscores(){
    highscores = []
    while (highscoreList.firstChild){
        highscoreList.removeChild(highscoreList.firstChild)
    }
    localStorage.clear(highscores);
}


// formEl.addEventListener("submit", useform)
goHomeBtn.addEventListener("click", function(){
    window.location.reload();
})
clearHighscoresBtn.addEventListener("click", clearHighscores)
highscoresBtn.addEventListener("click", showHighScores)
document.getElementById("startBtn").addEventListener("click", startQuiz)

document.getElementById("choices").addEventListener("click", function (event){
    if (event.target && event.target.nodeName == "LI"){
        if (event.target.innerText === questionList[index].answer){
            console.log("You're Correct")
            correctEl.style.display = "block"
            incorrectEl.style.display = "none"
            score += 5
            index++
            continueQuiz();
        } else {
            console.log("Incorrect")
            correctEl.style.display = "none"
            incorrectEl.style.display = "block"
            if (timeLeft >= 5){
                timeLeft = timeLeft - 5
            } else {
                timeLeft = 0
            }
            index++
            continueQuiz();

        }
    } else{
        return;
    }
})