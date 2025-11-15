"use strict";
import { randomNum } from "./helper";
const containerWord = document.getElementById("wordsContainer");
const category = document.getElementById("category");
const loader = document.querySelector(".loader");
const scoreCount = document.getElementById("scoreCount");
const mainElement = document.getElementsByTagName("main")[0];
const successEffect = new Audio("/assets/audios/success-340660.mp3");
const wrongEffect = new Audio("/assets/audios/wrong-47985.mp3");
const clickEffect = new Audio("/assets/audios/click.mp3");
// APP
const accountId = JSON.parse(localStorage.getItem("myAccount")).id;
const stickmanImg = new Image();
stickmanImg.src = "/assets/imgs/Stickman.png";
stickmanImg.onload = () => {
  let loading = true;
  let data = null;
  let userChoose = [];
  let tryies = 6;
  let score = 0;
  let gameOver = false;
  let currentData = JSON.parse(localStorage.getItem("myAccount"));
  function isLoading() {
    if (loading) {
      containerWord.innerHTML = `
        <span class="loader"></span>
        `;
    }
  }

  async function requestRandomsData() {
    try {
      data = null;
      loading = true;
      isLoading();
      const req = await fetch("/words.json");
      const res = await req.json();
      data = res;
      display_words();
    } catch (error) {
      console.log(error);
    } finally {
      loading = false;
      isLoading();
    }
  }

  requestRandomsData();
  function display_Score(isCorrect) {
    const scoreCount = document.getElementById("scoreCount");
    const lengthLetterCorrect = userChoose.filter((l) => l !== "").length;
    const coorectScore = Math.round(
      ((tryies === 0 ? 1 : tryies) + (tryies === 0 ? 1 : tryies)) *
      lengthLetterCorrect,
    );

    if (isCorrect) {
      score += coorectScore;
      scoreCount.innerHTML = `${score}`;
    } else if (isCorrect === false && tryies > 0) {
      score -= randomNum(4) * randomNum(10) + lengthLetterCorrect;
      scoreCount.innerHTML = `${score}`;
      tryies = tryies - 1;
    }
  }
  function reset_game() {
    score = 0;
    tryies = 6;
    userChoose = [];
    scoreCount.innerHTML = `
    ${score}
    `;
  }
  function new_word() {
    reset_game()
    display_words();
    scoreCount.innerHTML = `
    ${score}
    `;
  }
  function new_game() {
    new_word()
    gameOver = false
  }
  function play(letter) {
    const randomWord = JSON.parse(sessionStorage.getItem("randomWord"))
      .word.toLowerCase()
      .split("");
    for (let i = 0; i < randomWord.length; i++) {
      if (letter === randomWord[i] && letter !== userChoose[i]) {
        console.log(letter, randomWord, letter !== userChoose[i], userChoose);
        const wordUnderline = document.getElementById("letter" + i);
        wordUnderline.innerHTML = `
            <p class="text-6xl font-extrabold text-indigo-200 flex items-start justify-center">${letter}</p>


            `;
            console.log(userChoose);
            userChoose.splice(i, 1, letter);
            successEffect.currentTime = 0;
            console.log(letter,userChoose);
            successEffect.play();
        display_Score(true);
        break;
      } else if (i === randomWord.length - 1 && tryies > 0) {
        display_Score(false);
        wrongEffect.currentTime = 0;
        wrongEffect.play();
        break;
      }
    }
    if (randomWord.toString() === userChoose.toString()) {
      game_over();
    } else if (tryies === 0) {
      game_over();
    }

  }
  function game_over() {
    updateTotalScorePlayer();
    updateCountGamePlayed();
    gameOver = true;
    const accounts = JSON.parse(localStorage.getItem("accounts"));

    let results = ``;
    accounts.map((account, index) => {
      results += `<tr class="${account.id === currentData.id ? "bg-black/95" : ""} border-b border-pink-300 transition text-white/90 font-medium *:text-center">
    <td class="py-2 px-4 border-r border-pink-300 text-black ${account.id === currentData.id ? "text-white" : ""}">${index + 1}</td>
    <td class="py-2 px-4 border-r border-pink-300 text-blue-400 font-semibold">${account.Name}</td>
    <td class="py-2 px-4 border-r text-cyan-500 font-bold">${account.game.totalScore}</td>
    <td class="py-2 px-4 text-violet-500 font-bold">${account.game.gamePlayed}</td>
    </tr>`;
    });
      mainElement.innerHTML = `
  
  
      <section class="grid grid-cols-12 px-20 pb-5">
      <div class="col-span-9 space-y-10">
      <h1 class="text-8xl text-center text-primary">
          Game Over
      </h1>
      <h2 class="text-7xl text-center text-secondry">
          Your Score
      </h2>
      <h3 class="text-6xl text-center text-cyan-200">
          ${score}
      </h3>
      
      <div class="flex justify-center items-center gap-3 h-30">
      
      <button id="play-again-button" class="cursor-pointer">
        <div
          class="w-20 h-20 bg-blue-50 rounded-full relative shadow-[inset_0px_0px_1px_1px_rgba(0,0,0,0.3),2px_3px_5px_rgba(0,0,0,0.1)] flex items-center justify-center"
        >
          <div
            class="absolute w-[72px] h-[72px] z-10 bg-black rounded-full left-1/2 -translate-x-1/2 top-[5px] blur-[1px]"
          ></div>
          <label
            class="group cursor-pointer absolute w-[72px] h-[72px] bg-gradient-to-b from-blue-600 to-blue-400 rounded-full left-1/2 -translate-x-1/2 top-[5px] shadow-[inset_0px_4px_2px_#60a5fa,inset_0px_-4px_0px_#1e3a8a,0px_0px_2px_rgba(0,0,0,10)] active:shadow-[inset_0px_4px_2px_rgba(96,165,250,0.5),inset_0px_-4px_2px_rgba(37,99,235,0.5),0px_0px_2px_rgba(0,0,0,10)] z-20 flex items-center justify-center"
          >
            <div
              class="w-8 group-active:w-[31px] fill-blue-100 drop-shadow-[0px_2px_2px_rgba(0,0,0,0.5)]"
            >
              <svg xmlns="http://www.w3.org/2000/svg" id="Filled" viewBox="0 0 24 24">
                <path
                  d="M20.492,7.969,10.954.975A5,5,0,0,0,3,5.005V19a4.994,4.994,0,0,0,7.954,4.03l9.538-6.994a5,5,0,0,0,0-8.062Z"
                ></path>
              </svg>
            </div>
          </label>
        </div>
      </button>
      <p class="text-center text-white  text-5xl font-extrabold tracking-wide">
        Play again
      </p>
      </div>
     
  
          <div class="bg-white/10 backdrop-blur-xl border border-pink-400 shadow-2xl shadow-pink-500/30 overflow-hidden">
            <div class="px-5 py-3 bg-linear-to-r from-pink-500 to-amber-400 text-white font-bold text-lg tracking-wide">
              Players
            </div>
  
            <table class="w-full text-left border-collapse">
  
              <thead class="bg-white/10 border-b border-pink-300">
                <tr class="font-bold *:text-center">
                  <th class="py-2 px-4 border-r text-amber-400 border-pink-300">#</th>
                  <th class="py-2 px-4 border-r text-gray-700 border-pink-300">Name</th>
                  <th class="py-2 px-4 border-r text-green-500">Total Score</th>
                  <th class="py-2 px-4 text-orange-300">Game Played</th>
                </tr>
              </thead>
  
              <tbody>
              ${results}
              </tbody>
  
            </table>
          </div>
            </div>
  
      <div class="col-span-3 relative flex flex-col items-center">
          <img class="w-10" src="/assets/imgs/Rope.png" alt="Rope">
          <img class="w-50 -translate-y-2.5" src="/assets/imgs/Stickman.png" alt="Stickman">
        </div>
  
  
  
      </section>
      `;
      const playAgainButton = document.getElementById("play-again-button");
      playAgainButton.addEventListener("click", () => {
        playAgainButton.disabled = true;
        playAgainButton.style.opacity = 0.5;
        playAgainButton.style.pointerEvents = "none";
        playAgainButton.style.cursor = "not-allowed";
        playAgainButton.style.pointerEvents = "none";
        new_game()
      });
    


  }

  function display_words() {
    const randomWord = data[Math.round(Math.random() * 205)];
    const wordLength = randomWord.word.length;
    for (let i = 0; i < wordLength; i++) {
      userChoose.push("");
    }

    sessionStorage.setItem("randomWord", JSON.stringify(randomWord));
    let wordUnderlines = ``;
    for (let i = 0; i < randomWord.word.length; i++) {
      wordUnderlines += `<div id=${"letter" + i} class="relative">
        <div class="w-14 h-2.5 bg-lineText"></div>
        </div>`;
    }
    if (gameOver) {
      mainElement.innerHTML = `
   <div class="grid grid-cols-12 items-center">

      <h1 class="text-7xl col-span-8">
        <span class="text-primary">The</span> <span class="text-secondry">Hangman</span>
      </h1>
      <h2 class="text-6xl col-span-4 font-extrabold text-fuchsia-200 self-end justify-self-end">Score : <span id="scoreCount" class="text-5xl text-emerald-200">0</span></h2>
    </div>
    <section class="grid grid-cols-12 px-20">
      <div class="col-span-3 relative flex flex-col items-center">
        <div class="*:object-contain relative">
          <img class="relative z-20" src="/assets/imgs/Union.png" alt="Union">
          <img class="absolute top-5 z-10 w-30 translate-x-5" src="/assets/imgs/Rectangle 5.png" alt="Rectangle">
          <div class="absolute top-5 left-50 z-10">

            <img class="w-10" src="/assets/imgs/Rope.png" alt="Rope">
            <div class="w-35 flex flex-col items-center relative h-50 -translate-x-13 -translate-y-4 ">
              <img class="w-30 relative " src="/assets/imgs/Face.png" alt="Face">
              <img class="absolute w-25 top-20 -z-10" src="/assets/imgs/Body.png" alt="Body">
              <img class="absolute w-10 right-0 top-20 -z-20" src="/assets/imgs/Arm_right.png" alt="Arm_right">
              <img class="absolute w-10 left-0 top-20 -z-20" src="/assets/imgs/Arm_left.png" alt="Arm_left">
              <img class="absolute w-10 top-30 left-7 -z-20" src="/assets/imgs/Leg_left.png" alt="Leg_left">
              <img class="absolute w-10  top-30 right-7 -z-20" src="/assets/imgs/Leg_right.png" alt="Leg_right">
            </div>
          </div>
        </div>
      </div>
      <div class="col-span-9 flex flex-wrap justify-center">
<h3 class="text-7xl text-yellow-200 w-full text-center ">Prees a letter</h3>
<h4 id="category" class="text-7xl text-orange-200 w-full text-center">${randomWord.category}</h4>
<div id="wordsContainer" class="w-3/4 flex flex-wrap items-start justify-center gap-2.5">
  ${wordUnderlines}
  
</div> 
      </div>
    </section>
   `
    } else {
      category.innerHTML = `${randomWord.category}`;
      containerWord.innerHTML = `
  ${wordUnderlines}
  `;
    }
  }

  function updateCountGamePlayed() {
    let updatedData = {
      ...currentData,
      game: {
        ...currentData.game,
        gamePlayed: currentData.game.gamePlayed + 1,
      },
    };
    const accountIndex = JSON.parse(localStorage.getItem("accounts")).findIndex(
      (account) => account.id === accountId,
    );
    let accountsUpdates = JSON.parse(localStorage.getItem("accounts"));
    accountsUpdates[accountIndex] = updatedData;
    localStorage.setItem("accounts", JSON.stringify(accountsUpdates));
    localStorage.setItem("myAccount", JSON.stringify(updatedData));
  }
  function updateTotalScorePlayer() {
    let currentData = JSON.parse(localStorage.getItem("myAccount"));
    let updatedData = {
      ...currentData,
      game: {
        ...currentData.game,
        totalScore: currentData.game.totalScore + score,
      },
    };
    const accountIndex = JSON.parse(localStorage.getItem("accounts")).findIndex(
      (account) => account.id === accountId,
    );
    let accountsUpdates = JSON.parse(localStorage.getItem("accounts"));
    accountsUpdates[accountIndex] = updatedData;
    localStorage.setItem("accounts", JSON.stringify(accountsUpdates));
    localStorage.setItem("myAccount", JSON.stringify(updatedData));
  }
  window.addEventListener("keyup", function (e) {
    const regexLetterOnly = /^[a-z]$/i;
    if (!loading && data && !gameOver) {
      switch (e.key) {
        case "Enter":
          clickEffect.currentTime = 0;
          clickEffect.play();
          new_word();
          break;
      }
      if (regexLetterOnly.test(e.key) && tryies > 0) {
        play(e.key.toLowerCase());
      }
    }
  });
}