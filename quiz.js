var questionText = document.getElementById("questionText")
var choicesEl = document.getElementById("choices")
var index = 4

console.log(questionText, choicesEl)
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
        text:"Which operator is used to assign a vvalue to a variable?",
        answer: "=",
        choices: ["*", "-", "X", "="]
    }
    
]

// Trial Function

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

renderQuestion();