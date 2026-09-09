/* =========================================
   MASSAMBA.EXE — BIRTHDAY PROTOCOL
========================================= */


/* =========================================
   SCREEN CONTROL
========================================= */

function showScreen(id) {

  document.querySelectorAll(".screen").forEach(screen => {
    screen.classList.remove("active");
  });

  document.getElementById(id).classList.add("active");

  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });
}


/* =========================================
   INTRO
========================================= */

function startBirthday() {

  showScreen("welcome");

}


/* =========================================
   CAKE
========================================= */

function showCake() {

  showScreen("cakeScreen");

}


/* =========================================
   CANDLES
========================================= */

function blowCandles() {

  document.querySelectorAll(".candle").forEach(candle => {
    candle.classList.add("off");
  });

  document.getElementById("blowText").innerHTML =
    "🔥 Candles extinguished. Birthday wish registered. ❤️";

  setTimeout(() => {

    launchConfetti();

    setTimeout(() => {
      startQuiz();
    }, 1800);

  }, 1000);

}


/* =========================================
   MICROPHONE BLOW DETECTION
========================================= */

async function startMicrophone() {

  const status = document.getElementById("micStatus");

  if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {

    status.innerText =
      "Your browser doesn't support microphone access. Use the tap button instead.";

    return;

  }

  try {

    const stream =
      await navigator.mediaDevices.getUserMedia({
        audio: true
      });

    status.innerText =
      "🎤 Microphone activated. Blow now!";

    const audioContext =
      new AudioContext();

    const microphone =
      audioContext.createMediaStreamSource(stream);

    const analyser =
      audioContext.createAnalyser();

    analyser.fftSize = 256;

    microphone.connect(analyser);

    const data =
      new Uint8Array(analyser.frequencyBinCount);

    let blowTime = 0;

    function detectBlow() {

      analyser.getByteFrequencyData(data);

      let total = 0;

      for (let i = 0; i < data.length; i++) {
        total += data[i];
      }

      const average =
        total / data.length;

      if (average > 55) {

        blowTime += 100;

      } else {

        blowTime = 0;

      }

      if (blowTime >= 300) {

        stream.getTracks().forEach(track => track.stop());

        audioContext.close();

        blowCandles();

        return;

      }

      requestAnimationFrame(detectBlow);

    }

    detectBlow();

  } catch (error) {

    status.innerText =
      "Microphone permission wasn't available. No worries — tap the button instead! ❤️";

  }

}


/* =========================================
   QUIZ DATA
========================================= */

const questions = [

  {
    question:
      "What could Massamba happily do for an unreasonable amount of time?",

    answers: [
      "😴 Sleep",
      "💻 Work",
      "🍕 Eat pizza",
      "🎬 Watch anime"
    ],

    correct: 0,

    message:
      "Obviously 😭. Professional sleeper detected."
  },


  {
    question:
      "What happens when Massamba is REALLY locked in?",

    answers: [
      "🗣️ He starts talking to everyone",
      "💻 He forgets that Siphe and the outside world exist",
      "😴 He takes a nap",
      "🎬 He watches anime"
    ],

    correct: 1,

    message:
      "LOCKED. IN. 🔒 Nothing is disturbing this man."
  },


  {
    question:
      "Which combination sounds most like a perfect Massamba day?",

    answers: [
      "😴 Sleep + 🍕 Pizza",
      "🎬 Anime + 😴 Sleep",
      "💻 Coding + Music",
      "🤷🏾 All of the above"
    ],

    correct: 3,

    message:
      "Exactly. You cannot make this man choose 😂."
  },


  {
    question:
      "Massamba acts very serious and tough. But what is hiding underneath?",

    answers: [
      "😎 An even tougher man",
      "🤓 A full-time Software Engineer",
      "🥚 A soft little pookie",
      "🧘🏾 The world's calmest man"
    ],

    correct: 2,

    message:
      "POOKIE MODE: ACTIVATED. 🥚❤️"
  },


  {
    question:
      "Massamba has a BSc in Computer Science degree from Wits. Which of these are you most likely to work with?",

    answers: [
      "🎨 Photoshop",
      "🗄️ SQL",
      "🎵 Music production",
      "📐 AutoCAD"
    ],

    correct: 1,

    message:
      "SQL KING 👑💻"
  }

];


let currentQuestion = 0;


/* =========================================
   START QUIZ
========================================= */

function startQuiz() {

  currentQuestion = 0;

  showScreen("quizScreen");

  displayQuestion();

}


/* =========================================
   DISPLAY QUESTION
========================================= */

function displayQuestion() {

  const q =
    questions[currentQuestion];

  document.getElementById("questionNumber").innerText =
    `QUESTION ${currentQuestion + 1} / ${questions.length}`;

  document.getElementById("question").innerText =
    q.question;

  document.getElementById("quizFeedback").innerText =
    "";

  const answersContainer =
    document.getElementById("answers");

  answersContainer.innerHTML = "";

  q.answers.forEach((answer, index) => {

    const button =
      document.createElement("button");

    button.className = "answer";

    button.innerText = answer;

    button.onclick = () => {
      answerQuestion(index);
    };

    answersContainer.appendChild(button);

  });

}


/* =========================================
   ANSWER QUESTION
========================================= */

function answerQuestion(selected) {

  const q =
    questions[currentQuestion];

  const feedback =
    document.getElementById("quizFeedback");

  if (selected === q.correct) {

    feedback.innerText =
      "✓ CORRECT — " + q.message;

    feedback.style.color =
      "#a7ffbe";

    document
      .querySelectorAll(".answer")
      .forEach(button => {
        button.disabled = true;
      });

    setTimeout(() => {

      currentQuestion++;

      if (currentQuestion < questions.length) {

        displayQuestion();

      } else {

        finishBirthday();

      }

    }, 1300);

  } else {

    feedback.innerText =
      "❌ Nope! Try again, birthday boy 😂";

    feedback.style.color =
      "#ff9fd6";

  }

}


/* =========================================
   FINISH
========================================= */

function finishBirthday() {

  showScreen("finalScreen");

  launchConfetti();

  setTimeout(() => {
    launchConfetti();
  }, 1500);

  setTimeout(() => {
    launchConfetti();
  }, 3000);

}


/* =========================================
   CONFETTI
========================================= */

function launchConfetti() {

  const container =
    document.getElementById("confetti");

  const emojis = [
    "🎉",
    "❤️",
    "✨",
    "🎈",
    "🥳",
    "💜",
    "🍕",
    "🍝"
  ];

  for (let i = 0; i < 35; i++) {

    const piece =
      document.createElement("div");

    piece.className =
      "confetti";

    piece.innerText =
      emojis[Math.floor(Math.random() * emojis.length)];

    piece.style.left =
      Math.random() * 100 + "vw";

    piece.style.animationDuration =
      (2 + Math.random() * 3) + "s";

    piece.style.fontSize =
      (15 + Math.random() * 20) + "px";

    container.appendChild(piece);

    setTimeout(() => {
      piece.remove();
    }, 5000);

  }

}
