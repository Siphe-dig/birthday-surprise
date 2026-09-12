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
  startFiles();
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
He is so smart, like super duper smart, another Albert Einstein level. nothing can disturb my pookie when he is locked in, no call, no text, just him, his computer and his playlist.
He'll get the work done, just allow him to work at night, with no distractions( aka, NO SIPHE).
He takes what he does seriously and I am proud of the man he is becoming.
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
completed not just from anywhere, but from the HAVARD of AFRICA. I'm so proud of him, proud is an understatement.
He has always been determined when it came to what he wanted, I'm sure if I had told Massamba in 2024 that he would be where he is in just 2 years?
I'm sure he would not believe me, I hope our babies have his smarts
He went to Wits to get a degree and came back with his sweetheart. 
may not have been his high school sweetheart, but they are definitely endgame
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
oh my goodness, since day one, he has tried to convice Siphe to watch anime and Siphe has her moments where she is hooked and thern goes back and watches other stuff.
so many incomplete anime, but we have so much time to watch them together.
He cannot sleep without watching anime or listening to 12 hour manga on 2x speed 🙄😂
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
I love sleep, but Massamba loves sleep even more😂 it is such a difficult task to be his alarm, because he is going to switch you off and then oversleep afterwards😂.
sleeping comes with snoring and even at 23 he is still in denial of his snoring.
One thing I can say though is that he does not play about me when we are sleeping, we are always in a suffocating headlock position😂
    `
  },

  {
    emoji: "🤖",
    title: "MY PERSONALISED PREMIUM VERSION OF CLAUDE",
    status: "VERSION: MASSAMBA 23.0",
    text: `
PREMIUM ASSISTANT DETECTED.

Features include:
• Listening
• Advice
• Comfort
• Being there for Siphe
• Occasionally being annoying 😂

Massamba has solutions for EVERYTHING. To me he knows everything.
He is always finding ways to make my life easier, even when he is at work, there is rarely ever an answered call.
even if it is to tell him about the smallest most unimportant detail of my day. AND his responses do not run out at midnight.
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
Massamba gives the best kisses, especially lamzas🫦, 
but sometimes kissing me on my forehad or on my cheek is enough to make me want to buy him a Polo TSI
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

laying on his chest and listening to his heartbeat makes my world go quiet.
his heartbeat somehow regulates me, 
i must admit, most of the time when we are watching something I focus more on his chest than what is actually going on in what we are watching
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

Then we have big dzaaddy Masssamba, freak in the sheets Massamba,
the best dzick ever Massamba.
whether it is missionary, doggystyle, my whack WoT, sideways missionary, 69,
big dzaddy Massamba always matches my level of reak and dicks me down good 🍆💦
I wanna match his head game one day though...
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

Massamba already knows how much he means to me, I hope there is never a day where he questions that.
He's been my boyfriend for almost 3 years now and I love him more each day ❤️
I love who he is, what he is and what our relationship is more than he can ever know.
My best friend, my everything. He makes me feel loved, not just in what he says, but what he does.
The sexiest man to ever walk the Earth. He does not believe it but I had already liked him before I even put my number on his phone😏
This is the most important title of all because as his girlfriend, I get to experience all the other titles combined😏. 

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
      "😴 Sleep + 🧸Siphe",
      "🎬 Anime + 😴 Sleep",
      "💻 Coding + 🎵Music",
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
      "😎 an even tougher man",
      "🤓 a full-time Software Engineer",
      "🧸 my soft little pookie",
      "🧘🏾 the world's calmest man"
    ],

    correct: 2,

    message:
      "POOKIE MODE: ACTIVATED. 🧸❤️"
  },


  {
    question:
     "What does Massamba apparently need before he can fully settle down for the night?",

    answers: [
    "🥤 A HUGE can of redbull",
    "💻 His computer and playlist",
    "🎬 Anime or a 12-hour manga",
    "🧸 A cuddle with Siphe"
  ],
 correct: 2,

  message:
    "😂 EXACTLY. Anime or a 12-hour manga on 2x speed. This man has a routine."
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
    "💋",
     "🧸"
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
