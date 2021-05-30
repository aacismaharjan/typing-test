// DOM Elements
const inputWord = document.querySelector("#word-input");
const paragraphDisplay = document.querySelector("#paragraph");
const timerDisplay = document.querySelector("#timer");
const resultDisplay = document.querySelector("#result-screen");
const previousStatDisplay = document.querySelector("#previous-stats");
const refreshMatch = document.querySelector("#refresh-match");
const generalSettingsDisplay = document.querySelector("#general-setting");
const doneBtn = document.querySelector("#setting-done");
const settingBtn = document.querySelector("#settingBtn");

let settings;

window.addEventListener("load", init);

function init() {
  getSettings();

  const gameMode = document.querySelector("#game-mode");
  const gameTime = document.querySelector("#game-time");

  gameMode.value = settings["gameMode"];
  gameTime.value = settings["gameTime"];
}

// Update the current setting in localStorage
doneBtn.addEventListener("click", (event) => {
  event.preventDefault();

  const gameMode = document.querySelector("#game-mode");
  const gameTime = document.querySelector("#game-time");

  localStorage.setItem(
    "settings",
    JSON.stringify({
      gameMode: +gameMode.value,
      gameTime: +gameTime.value,
    })
  );

  window.location = "/";
});

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
