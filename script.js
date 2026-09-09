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
   MASSAMBA FILES
========================================= */

const massambaFiles = [

  {
    emoji: "💻",
    title: "SOFTWARE ENGINEER",
    status: "STATUS: LOCKED IN 🔒",
    text: `
Specialisation: Getting things to work.

Threat level:
DO NOT DISTURB WHILE CODING.

[WRITE YOUR MESSAGE HERE]

Talk about how intelligent he is, how focused he gets when he's working,
his work ethic, and anything cute or funny about him being locked in.
    `
  },

  {
    emoji: "🎓",
    title: "WITS BSc GRADUATE",
    status: "STATUS: COMPLETED ✓",
    text: `
QUALIFICATION:
BSc Computer Science — Wits.

Achievement status:
COMPLETED. 🎓

[WRITE YOUR MESSAGE HERE]

Talk about how proud you are of him,
his determination, and what this achievement means to you.
    `
  },

  {
    emoji: "🎬",
    title: "ANIME BINGE-WATCHER",
    status: "STATUS: OBSESSED",
    text: `
ANIME DETECTED.

Favourite activity:
Trying to convince Siphe to watch anime.

[WRITE YOUR MESSAGE HERE]

Add your favourite anime-related memories,
the shows he's tried to get you to watch,
or something funny about his anime obsession.
    `
  },

  {
    emoji: "😴",
    title: "PROFESSIONAL SLEEPER",
    status: "STATUS: CURRENTLY UNAVAILABLE",
    text: `
SLEEPING ABILITY:
EXCEPTIONAL.

Availability:
Probably asleep.

[WRITE YOUR MESSAGE HERE]

Talk about how much he loves sleeping,
funny sleeping memories,
or something cute about sleeping next to him.
    `
  },

  {
    emoji: "🤖",
    title: "MY PERSONALISED PREMIUM VERSION OF CLAUDE",
    status: "VERSION: MASSAMBA 23.0",
    text: `
PREMIUM AI ASSISTANT DETECTED.

Features include:
• Listening
• Advice
• Comfort
• Being there for Siphe
• Occasionally being annoying 😂

[WRITE YOUR MESSAGE HERE]

Explain why he's your personalised premium Claude.
    `
  },

  {
    emoji: "💋",
    title: "WORLD'S BEST KISSER",
    status: "STATUS: HIGHLY CLASSIFIED 🔐",
    text: `
ACCESS LEVEL:
SIPHE ONLY.

CLASSIFICATION:
EXTREMELY DANGEROUS. 💋

[WRITE YOUR MESSAGE HERE]

This one is yours.
Make it romantic, cheeky, funny, or all three.
    `
  },

  {
    emoji: "🧸",
    title: "MOST COMFORTABLE PILLOW",
    status: "STATUS: CUDDLE MODE READY",
    text: `
HUMAN PILLOW DETECTED.

Additional features:
• Excellent cuddling
• Hand holding
• Finger playing
• Maximum comfort
• Soft pookie mode

[WRITE YOUR MESSAGE HERE]

Talk about cuddling, holding hands,
playing with your fingers and why he feels like home.
    `
  },

  {
    emoji: "😏",
    title: "CLASSIFIED",
    status: "ACCESS: SIPHE ONLY 🔐",
    text: `
████████████████████

THIS FILE HAS BEEN CLASSIFIED.

Reason:
Massamba knows exactly what this means. 😂

[WRITE YOUR MESSAGE HERE]

You know what belongs here.
    `
  },

  {
    emoji: "👩🏽‍🤝‍👨🏾",
    title: "SIPHE'S BOYFRIEND ❤️",
    status: "IMPORTANCE LEVEL: 100%",
    text: `
FINAL CLASSIFICATION:

MASSAMBA HAS BEEN OFFICIALLY IDENTIFIED
AS SIPHE'S BOYFRIEND.

Importance:
EXTREMELY HIGH. ❤️

[WRITE YOUR MESSAGE HERE]

Talk about what he means to you,
what you love about your relationship,
the little things he does,
and why THIS is the most important title of all.
    `
  }

];

let currentFile = 0;


function startFiles() {

  currentFile = 0;

  showScreen("filesScreen");

  displayFile();

}


function displayFile() {

  const file = massambaFiles[currentFile];

  document.getElementById("fileEmoji").innerText =
    file.emoji;

  document.getElementById("fileTitle").innerText =
    file.title;

  document.getElementById("fileStatus").innerText =
    file.status;

  document.getElementById("fileText").innerText =
    file.text;

  document.getElementById("fileContent").style.display =
    "none";

  document.getElementById("openFileButton").style.display =
    "inline-block";

  document.getElementById("nextFileButton").style.display =
    "none";

  document.getElementById("fileNumber").innerText =
    `MASSAMBA.EXE // FILE ${currentFile + 1} / ${massambaFiles.length}`;

}


function openFile() {

  const fileContent =
    document.getElementById("fileContent");

  const openButton =
    document.getElementById("openFileButton");

  const nextButton =
    document.getElementById("nextFileButton");

  fileContent.style.display = "block";

  openButton.style.display = "none";

  nextButton.style.display = "inline-block";

}


function nextFile() {

  currentFile++;

  if (currentFile < massambaFiles.length) {

    displayFile();

  } else {

    startQuiz();

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
      "🧸 A soft little pookie",
      "🧘🏾 The world's calmest man"
    ],

    correct: 2,

    message:
      "POOKIE MODE: ACTIVATED. 🧸❤️"
  },


  {
    question:
      "Massamba has a BSc in Computer Science degree from Wits. Which of these is he most likely to work with?",

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
