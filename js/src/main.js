import { paragraphs } from "./../db/paragraph.js";

let TYPING_TIME = 0;
const TYPING_DISPLAY_WORDS = 24;
let SCORE = 0;
let distance;
let wordSpans;
let startTime;
let timeRemaining = 0;
let curWordIndex = 0;
let curTotalWordIndex = 0;
let timerInterval = null;
let displayTimeInterval = null;
let settings = {};

// DOM Elements
const inputWord = document.querySelector("#word-input");
const paragraphDisplay = document.querySelector("#paragraph");
const timerDisplay = document.querySelector("#timer");
const resultDisplay = document.querySelector("#result-screen");
const refreshMatch = document.querySelector("#refresh-match");

// Initialize the game on document load
window.addEventListener("load", init);

// Refresh match on click
refreshMatch.addEventListener("click", init);

// Initial function
export function init() {
  getSettings();

  SCORE = 0;
  TYPING_TIME = (settings.gameTime * 60) / 4;
  timeRemaining = TYPING_TIME;
  distance = timeRemaining;
  startTime = null;
  curWordIndex = 0;
  curTotalWordIndex = 0;
  inputWord.value = "";
  inputWord.disabled = false;
  resultDisplay.style.display = "none";
  // previousStatDisplay.style.display = "none";
  clearInterval(timerInterval);
  clearInterval(displayTimeInterval);
  timerInterval = null;
  displayTimeInterval = null;

  // Typing input intial focus
  inputWord.focus();

  // Inject first paragraph to user
  const paragraph = paragraphs.getParagraph(settings["gameMode"]);
  const curParagraph = paragraph
    .split(/\s+/)
    .slice(curTotalWordIndex, TYPING_DISPLAY_WORDS)
    .join(" ");

  injectParagraph(curParagraph);

  // Update timer on valid time distance
  if (distance >= 0) {
    updateTimer(distance);
  }

  // Check Game Over
  displayTimeInterval = setInterval(function () {
    const userTotal = paragraphs
      .getWords(settings["gameMode"])
      .slice(0, curTotalWordIndex).length;
    const computerTotal = paragraphs.getWords(settings["gameMode"]).length;

    if (distance <= 0 || userTotal == computerTotal) {
      GameOver();
    }
  }, 100);

  // Detect word and start matching
  inputWord.addEventListener("input", checkStartMatch);
}

function checkStartMatch(event) {
  if (!timerInterval && timeRemaining === TYPING_TIME) {
    timerInterval = setInterval(function () {
      if (distance <= 0) {
        clearInterval(timerInterval);
      }

      if (distance >= 0) {
        distance = timeRemaining - 1;
        updateTimer(distance);
      }

      timeRemaining -= 1;
    }, 1000);
  }

  if (!startTime) startTime = new Date();

  inputWord.value = inputWord.value.trimStart();
  if (inputWord.value.indexOf(" ") > -1) {
    curTotalWordIndex++;
    startMatch(event);
  }
}

function startMatch(event) {
  wordSpans = paragraphDisplay.querySelectorAll("span");
  wordSpans[curWordIndex].classList.remove("highlight");
  const curTotal = wordSpans.length;

  if (curWordIndex + 1 >= curTotal) {
    curWordIndex = 0;
    injectParagraph(
      paragraphs
        .getParagraph(settings["gameMode"])
        .split(/\s+/)
        .slice(curTotalWordIndex, curTotalWordIndex + TYPING_DISPLAY_WORDS)
        .join(" ")
    );
    event.target.value = "";
    wordSpans = paragraphDisplay.querySelectorAll("span");
    wordSpans[curWordIndex].classList.add("highlight");
    return;
  }

  if (matchWords()) {
    SCORE++;
  }

  if (checkGameOver()) {
    GameOver();
    return;
  }

  event.target.value = "";
  wordSpans[++curWordIndex].classList.add("highlight");
}

function matchWords() {
  wordSpans = paragraphDisplay.querySelectorAll("span");
  const wordsX = paragraphDisplay.innerText.split(/\s+/);

  if (wordsX[curWordIndex] === inputWord.value.trim()) {
    wordSpans[curWordIndex].classList.add("text-success");
    return true;
  } else {
    wordSpans[curWordIndex].classList.add("text-danger");
    return false;
  }
}

function injectParagraph(paragraph) {
  paragraphDisplay.innerHTML = paragraph
    .trim()
    .split(/\s+/)
    .map((item) => `<span>${item}</span>`)
    .join(" ");
  wordSpans = paragraphDisplay.querySelectorAll("span");
  wordSpans[curWordIndex].classList.add("highlight");
}

function checkGameOver() {
  if (timeRemaining <= 0) {
    return true;
  } else {
    return false;
  }
}

// After Game is Over
function GameOver() {
  updateGameStats();

  curWordIndex = 0;
  curTotalWordIndex = 0;
  inputWord.value = "";
  inputWord.disabled = true;
  clearInterval(timerInterval);
  clearInterval(displayTimeInterval);
  timerInterval = null;
  timeRemaining = TYPING_TIME;
  startTime = null;
  TYPING_TIME = settings.gameTime * 60;
}

// Display User Statistics
function updateGameStats() {
  resultDisplay.style.display = "flex";
  const total = paragraphs
    .getWords(settings["gameMode"])
    .slice(0, curTotalWordIndex).length;
  const seconds = (new Date().getTime() - startTime.getTime()) / 1000;
  const accuracy = ((SCORE / total) * 100).toFixed(2);
  const incorrectWords = total - SCORE;
  const correctWords = SCORE;
  const wpmGross = Math.floor((total / seconds) * 60);

  const wpmNet = Math.floor((SCORE / seconds) * 60);
  let highest = +localStorage.getItem("highest");
  const localRecords = JSON.parse(localStorage.getItem("records"));

  const record = {
    name: "Aashish",
    accuracy,
    wpmNet,
    startTime,
  };

  if (localRecords && localRecords.length > 0) {
    const items = JSON.stringify([record, ...localRecords]);
    localStorage.setItem("records", items);
  } else {
    const items = JSON.stringify([record]);
    localStorage.setItem("records", items);
  }

  if (!highest) {
    localStorage.setItem("highest", wpmNet);
    highest = wpmNet;
  } else if (wpmNet > +highest) {
    localStorage.setItem("highest", wpmNet);
    highest = wpmNet;
  }

  // DOM Elements
  document.querySelector("#accuracy").innerHTML = `${accuracy} %`;
  document.querySelector(
    "#incorrectWords"
  ).innerHTML = `${incorrectWords} Words`;
  document.querySelector("#wpmGross").innerHTML = `${wpmGross} WPM`;
  document.querySelector("#wpmNet").innerHTML = `${wpmNet} WPM`;
  document.querySelector("#highestNetWPM").innerHTML = `${highest} WPM`;
}

// distance is in seconds
function updateTimer(distance) {
  const minutes = Math.floor(distance / 60);
  distance = distance % 60;
  let seconds = Math.floor(distance);
  if (seconds < 10) seconds = `0${seconds}`;
  timerDisplay.innerHTML = `${minutes}:${seconds}`;
}

function getSettings() {
  if (localStorage.getItem("settings")) {
    settings = JSON.parse(localStorage.getItem("settings"));
  } else {
    settings = {
      gameMode: 1,
      gameTime: 1,
    };

    localStorage.setItem("settings", JSON.stringify(settings));
  }
}
