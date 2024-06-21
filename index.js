let order = [];
let playerOrder = [];
let flash;
let turn;
let good;
let compturn;
let intervalid;
let strict = false;
let noise = true;
let on = false;
let win;

const turncounter = document.querySelector("#turn");
const topleft = document.querySelector("#topleft");
const topright = document.querySelector("#topright");
const bottomleft = document.querySelector("#bottomleft");
const bottomright = document.querySelector("#bottomright");
const strictbutton = document.querySelector("#strict");
const onbutton = document.querySelector("#on");
const startbutton = document.querySelector("#start");

strictbutton.addEventListener("change", function () {
  if (strictbutton.checked === true) {
    strict = true;
  } else {
    strict = false;
  }
});

onbutton.addEventListener("click", function () {
  if (onbutton.checked) {
    on = true;
    turncounter.innerHTML = "-";
  } else {
    on = false;
    turncounter.innerHTML = "";
    clearcolor();
    clearInterval(intervalid);
  }
});

startbutton.addEventListener("click", function () {
  if (on || win) {
    play();
  }
});

function play() {
  win = false;
  order = [];
  playerOrder = [];
  flash = 0;
  intervalid = 0;
  turn = 1;
  turncounter.innerHTML = 1;
  good = true;
  for (let i = 0; i < 20; i++) {
    order.push(Math.floor(Math.random() * 4) + 1);
  }
  compturn = true;
  intervalid = setInterval(gameTurn, 800);
}

function gameTurn() {
  on = false;
  if (flash == turn) {
    clearInterval(intervalid);
    compturn = false;
    clearcolor();
    on = true;
  }

  if (compturn) {
    clearcolor();
    setTimeout(() => {
      if (order[flash] == 1) one();
      if (order[flash] == 2) two();
      if (order[flash] == 3) three();
      if (order[flash] == 4) four();
      flash++;
    }, 200);
  }
}

function one() {
  if (noise) {
    let audio = document.getElementById("clip1");
    audio.play();
  }
  noise = true;
  topleft.style.backgroundColor = "lightgreen";
}

function two() {
  if (noise) {
    let audio = document.getElementById("clip2");
    audio.play();
  }
  noise = true;
  topright.style.backgroundColor = "tomato";
}

function three() {
  if (noise) {
    let audio = document.getElementById("clip3");
    audio.play();
  }
  noise = true;
  bottomleft.style.backgroundColor = "yellow";
}

function four() {
  if (noise) {
    let audio = document.getElementById("clip4");
    audio.play();
  }
  noise = true;
  bottomright.style.backgroundColor = "lightskyblue";
}

function clearcolor() {
  topleft.style.backgroundColor = "darkgreen";
  topright.style.backgroundColor = "darkred";
  bottomleft.style.backgroundColor = "goldenrod";
  bottomright.style.backgroundColor = "darkblue";
}

function flashcolor() {
  topleft.style.backgroundColor = "lightgreen";
  topright.style.backgroundColor = "tomato";
  bottomleft.style.backgroundColor = "yellow";
  bottomright.style.backgroundColor = "lightskyblue";
}

topleft.addEventListener("click", function () {
  if (on) {
    playerOrder.push(1);
    check();
    one();
    if (!win) {
      setTimeout(() => {
        clearcolor();
      }, 300);
    }
  }
});
topright.addEventListener("click", function () {
  if (on) {
    playerOrder.push(2);
    check();
    two();
    if (!win) {
      setTimeout(() => {
        clearcolor();
      }, 300);
    }
  }
});

bottomleft.addEventListener("click", function () {
  if (on) {
    playerOrder.push(3);
    check();
    three();
    if (!win) {
      setTimeout(() => {
        clearcolor();
      }, 300);
    }
  }
});

bottomright.addEventListener("click", function () {
  if (on) {
    playerOrder.push(4);
    check();
    four();
    if (!win) {
      setTimeout(() => {
        clearcolor();
      }, 300);
    }
  }
});

function check() {
  if (playerOrder[playerOrder.length - 1] !== order[playerOrder.length - 1]) {
    good = false;
  }
  if (playerOrder.length == 20 && good) {
    wingame();
  }
  if (!good) {
    flashcolor();
    turncounter.innerHTML = "NO!";
    setTimeout(() => {
      turncounter.innerHTML = turn;
      clearcolor();

      if (strict) {
        play();
      } else {
        compturn = true;
        flash = 0;
        playerOrder = [];
        good = true;
        intervalid = setInterval(gameTurn, 800);
      }
    }, 800);

    noise = false;
  }
  if (turn == playerOrder.length && good && !win) {
    turn++;
    playerOrder = [];
    compturn = true;
    flash = 0;
    turncounter.innerHTML = turn;
    intervalid = setInterval(gameTurn, 800);
  }
}

function wingame() {
  flashcolor();
  turncounter.innerHTML = "WIN!";
  on = false;
  win = true;
}