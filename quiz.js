var questions = [{
  "question": "A Sunday Afternoon on the Island of La Grande Jatte",
  "choices": ["Claude Monet", "Pierre Auguste Renoir", "Georges Seurat"],
  "answer": "Georges Seurat",
  "image": "images/A_Sunday_Afternoon_on_the_Island_of_La_Grande_Jatte.jpg",
  "size": "landscape"
}, {
  "question": "The Starry Night",
  "choices": ["Claude Monet", "Vincent van Gogh", "Georges Seurat"],
  "answer": "Vincent van Gogh",
  "image": "images/The_Starry_Night.jpg",
  "size": "landscape"
}, {
  "question": "The Scream",
  "choices": ["Wassily Kandinsky", "Vincent Van Gogh", "Edvard Munch"],
  "answer": "Edvard Munch",
  "image": "images/The_Scream.jpg",
  "size": "portrait"
}, {
  "question": "Mona Lisa",
  "choices": ["Auguste Rodin", "Michelangelo", "Leonardo da Vinci"],
  "answer": "Leonardo da Vinci",
  "image": "images/Mona_Lisa.jpg",
  "size": "portrait"
}, {
  "question": "Girl with a Pearl Earring",
  "choices": ["Johannes Vermeer", "Rembrandt", "Caravaggio"],
  "answer": "Johannes Vermeer",
  "image": "images/Girl_with_a_Pearl_Earring.jpg",
  "size": "portrait"
}, {
  "question": "The Kiss",
  "choices": ["Wassily Kandinsky", "Gustav Klimt", "Egon Schiele"],
  "answer": "Gustav Klimt",
  "image": "images/The_Kiss.jpg",
  "size": "portrait"
}, {
  "question": "The Creation of Adam",
  "choices": ["Leonardo da Vinci", "Michelangelo", "Raphael"],
  "answer": "Michelangelo",
  "image": "images/The_Creation_of_Adam.jpg",
  "size": "wide-landscape"
}, {
  "question": "The Arnolfini Portrait",
  "choices": ["Raphael", "Sandro Botticelli", "Jan van Eyck"],
  "answer": "Jan van Eyck",
  "image": "images/The_Arnolfini_Portrait.jpg",
  "size": "portrait"
}, {
  "question": "The Night Watch",
  "choices": ["Peter Paul Rubens", "Johannes Vermeer", "Rembrandt"],
  "answer": "Rembrandt",
  "image": "images/The_Night_Watch.jpg",
  "size": "landscape"
}, {
  "question": "The Persistence of Memory",
  "choices": ["Salvador Dali", "Roy Lichtenstein", "Pablo Picasso"],
  "answer": "Salvador Dali",
  "image": "images/The_Persistence_of_Memory.jpg",
  "size": "landscape"
}];


// Define variables
var content = $("content"),
  questionContainer = $("question"),
  choicesContainer = $("choices"),
  imageContainer = $("image"),
  scoreContainer = $("score"),
  submitButton = $("submit");

// Initialize variables
var currentQuestion = 0,
  score = 0,
  displayingQuestion = true;

function $(id) {
  return document.getElementById(id);
}

function askQuestion() {
  var choices = questions[currentQuestion].choices,
    optionsOutput = "";

  // Loop through question options and create radio buttons
  for (var i = 0; i < choices.length; i++) {
    optionsOutput += "<span class='radio-button'><input type='radio' name='quiz" + currentQuestion +
      "' id='choice" + (i + 1) +
      "' value='" + choices[i] + "'>" +
      "<label for='choice" + (i + 1) + "'>" + choices[i] + "</label></span><br>";
  }
  // Display content
  questionContainer.textContent = questions[currentQuestion].question;
  choicesContainer.innerHTML = optionsOutput;
  imageContainer.innerHTML = `<img class="${questions[currentQuestion].size}" src="${questions[currentQuestion].image}" alt="${questions[currentQuestion].question}">`;
  
  if (currentQuestion === 0) {
    scoreContainer.textContent = "Score: 0 out of " + questions.length;
    submitButton.textContent = "Submit Answer";
  }
}

function checkAnswer() {
  if (displayingQuestion) {
    submitButton.textContent = "Next Question";
    displayingQuestion = false;

    // Determine selected option
    var userpick,
      radios = document.getElementsByName("quiz" + currentQuestion);
    for (var i = 0; i < radios.length; i++) {
      if (radios[i].checked) { // if this radio button is checked
        userpick = radios[i].value;
      }
      if (radios[i].value == questions[currentQuestion].answer) {
        answerIndex = i;
      }
    }

    // Indicate correct or incorrect answer 
    var labelStyle = document.getElementsByTagName("label")[answerIndex].style;
    labelStyle.fontWeight = "bold";
    if (userpick == questions[currentQuestion].answer) {
      score++;
      labelStyle.color = "green";
    } else {
      labelStyle.color = "red";
    }

    scoreContainer.textContent = "Score: " + score + " out of " +
    questions.length;
  } else { // Display next question
    displayingQuestion = true;
    submitButton.textContent = "Submit Answer";

    if (currentQuestion < questions.length - 1) {
      currentQuestion++;
      askQuestion();
    } else {
      displayFinalResults();
    }
  }
}

function displayFinalResults() {
  content.innerHTML = "<h2 class='animated tada'>You answered "+ score + " out of " + questions.length + " questions correctly.</h2>"
  if (score <= 3) {
    content.innerHTML += "<p class='animated fadeIn'>Darn. You might want to <i>brush</i> up on your art history.</p>";
  }
  else if (score <= 7) {
    content.innerHTML += "<p class='animated fadeIn'>Good job! You seem to know a little about art history.</p>";
  }
  else {
    content.innerHTML += "<p class='animated fadeIn'>Wow, you know a lot about art history. Way to (Van) Gogh!</p>";
  }

}

window.addEventListener("load", askQuestion, false);
submitButton.addEventListener("click", checkAnswer, false);
