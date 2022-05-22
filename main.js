let questionText = document.querySelector(".question");
let answersBox = document.querySelector(".answers");
let scoreCounter = document.querySelector(".score");
let questionCounter = document.querySelector(".count");
let questionLoader = document.querySelector(".load-questions");



async function getQuestions() {
  let questionUrl = await fetch(
    "https://opentdb.com/api.php?amount=10&category=11&difficulty=easy&type=multiple"
  );
  let questions = await questionUrl.json();
  let myQuestions = questions.results;
  return myQuestions;
  // createQuestion(myQuestions);
}


// DEFAULTS
let hasApi = false;
let questions = [];
let myAnswers = [];
let ansObj = {};
let myQuestionCount = 10;
let myScore = 0;
let questionStep = 1;
questionCounter.innerHTML = `${questionStep - 1}/10`;
questionLoader.style.width = `${(questionStep - 1) * 10}%`;
// DEFAULTS


// Question creator
createQuestion();
async function createQuestion() {
  answersBox.innerHTML = "";
  questionText.innerHTML = "";
  if (!hasApi) {
    questions = await getQuestions();
    questions = shuffle(questions);
  }
  
  questionText.innerHTML = `${questions[questionStep - 1].question}`;

//   Collecting answers
  ansObj["answer"] = questions[questionStep - 1].correct_answer;
  ansObj["correct"] = true;
  myAnswers.push(ansObj);
  questions[questionStep - 1].incorrect_answers.forEach((ans) => {
    ansObj = {};
    ansObj["answer"] = ans;
    ansObj["correct"] = false;
    myAnswers.push(ansObj);
  });
  myAnswers = shuffle(myAnswers);


// UI answers
  myAnswers.forEach((ans) => {
    let ansBox = document.createElement("div");
    ansBox.classList.add("answr");
    ansBox.innerHTML = ans.answer;
    answersBox.appendChild(ansBox);
    ansBox.addEventListener("click", (e) => {
      e.preventDefault();
      if (ans.correct) {
        myScore += 100;
        scoreCounter.innerHTML = myScore;
        ansBox.style.backgroundColor = "green";
      } else {
        myScore -= 50;
        scoreCounter.innerHTML = myScore;
        ansBox.style.backgroundColor = "red";
      }
      questionStep++;
      questionCounter.innerHTML = `${questionStep - 1}/10`;
      questionLoader.style.width = `${(questionStep - 1) * 10}%`;

      if (questionStep + 1 <= 11) {
        myAnswers = [];
        setTimeout(() => {
          createQuestion();
        }, 1500);
      } else {
        setTimeout(() => {
          alert("Imtahan tamamlandi");
        }, 1000);
      }
    });
  });
}



// Shuffle function
function shuffle(array) {
  let currentIndex = array.length,
    randomIndex;
  while (currentIndex != 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex],
      array[currentIndex],
    ];
  }

  return array;
}
