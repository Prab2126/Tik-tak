const PD = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [2, 5, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 4, 6],
  [0, 4, 8],
];

let main = document.querySelector("main");
let domBtn = document.querySelectorAll("button");
let count = 0;
let userSymbol = "x";
let botSymbol = userSymbol == "x" ? "o" : "x";
let haslastChildren = [...main.children];
const botData = [];
const userData = [];

let X = 0;
let O = 0;
let message = document.querySelector("#show");
let XOCount = document.querySelector("#counter");
const botValueAdd = [];

const userSound = new Audio(
  "MP3/video-game-menu-click-sounds-148373-[AudioTrimmer.com](1).mp3"
);
const botSound = new Audio(
  "MP3/video-game-menu-click-sounds-148373-[AudioTrimmer.com].mp3"
);
const winSound = new Audio("MP3/correct-choice-43861.mp3");

const findLastElement = (check) => {
  if (check)
    haslastChildren = haslastChildren.filter(
      (e) => e.children[0].innerHTML == ""
    );
  else haslastChildren = [...main.children];
};

const wining = (arr, symbol, check) => {
  userData.length = 0;
  botData.length = 0;
  if (check) {
    setTimeout(() => {
      arr.forEach((e) => {
        domBtn[e].children[0].classList.add("js-animation");
      });
      winSound.play();
    }, 100);
  }
  message.innerHTML = symbol;
  message.classList.add("ShowScaleUP");
  setTimeout(() => {
    message.classList.remove("ShowScaleUP");

    domBtn.forEach((e) => {
      e.children[0].innerText = "";
      e.disabled = false;
      findLastElement();
      e.children[0].classList.remove("userScale", "botScale", "js-animation");
    });
  }, 1500);
};

function forCheck(array, symbol, hum) {
  let filteredValue = [];
  const FinalData = [];
  PD.forEach((e) => filteredValue.push(e.filter((e) => array.includes(e))));
  filteredValue.forEach((e) => {
    if (e.length == 3) FinalData.push(...e);
  });
  if (FinalData.length == 6) FinalData.splice(3, 3);
  if (hum == "bot" && FinalData.length == 3) {
    wining(FinalData, symbol, true);
    XOCount.children[1].children[0].innerHTML = X += 1;
    return false;
  } else if (hum == "human" && FinalData.length == 3) {
    wining(FinalData, symbol, true);
    XOCount.children[0].children[0].innerHTML = O += 1;

    return false;
  } else return true;
}

function checkPositon(Data, rnd) {
  for (let i = 0; i < Data.length; i++) if (Data[i] == rnd) return true;
  return false;
}

const bot = () => {
  let rnd = Math.floor(Math.random() * domBtn.length);
  botValueAdd.push(checkPositon(userData, rnd));
  botValueAdd.push(checkPositon(botData, rnd));
  let finalCheck = botValueAdd.some((e) => e == true);
  if (botValueAdd.length == 2) botValueAdd.length = 0;
  if (finalCheck) bot();
  else {
    domBtn[rnd].children[0].innerText = botSymbol;
    domBtn[rnd].disabled = true;
    domBtn[rnd].children[0].classList.add("botScale");
    setTimeout(() => {
      botSound.play();
    }, 500);
    botData.push(rnd);
    if (botData.length > 2) forCheck(botData, botSymbol, "bot");
  }
  findLastElement(true);
};

const xo = (e, i) => {
  if (!count) {
    e.children[0].innerText = userSymbol;
    e.disabled = true;
    e.children[0].classList.add("userScale");
    userSound.play();

    userData.push(i);
    let checker = true;
    if (userData.length > 2) checker = forCheck(userData, userSymbol, "human");
    if (checker && haslastChildren.length == 1) wining(null, "Toe");
    if (checker && haslastChildren.length !== 1) bot();
  }
};

domBtn.forEach((e, i) => {
  e.addEventListener("click", (element) => {
    xo(element.target, i);
  });
});
