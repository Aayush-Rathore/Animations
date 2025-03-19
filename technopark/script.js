document.addEventListener("DOMContentLoaded", function () {
  const balloonContainer = document.getElementById("balloon-container");

  function random(num) {
    return Math.floor(Math.random() * num);
  }

  function getRandomStyles() {
    var r = random(255);
    var g = random(255);
    var b = random(255);
    var mt = random(200);
    var ml = random(50);
    var dur = random(5) + 5;
    return `
    background-color: rgba(${r},${g},${b},0.7);
    color: rgba(${r},${g},${b},0.7); 
    box-shadow: inset -7px -3px 10px rgba(${r - 10},${g - 10},${b - 10},0.7);
    margin: ${mt}px 0 0 ${ml}px;
    animation: float ${dur}s ease-in infinite
    `;
  }

  function createBalloons(num) {
    for (var i = num; i > 0; i--) {
      var balloon = document.createElement("div");
      balloon.className = "balloon";
      balloon.style.cssText = getRandomStyles();
      balloonContainer.append(balloon);
    }
  }

  function removeBalloons() {
    balloonContainer.style.opacity = 0;
    setTimeout(() => {
      balloonContainer.remove();
    }, 500);
  }

  window.addEventListener("load", () => {
    createBalloons(30);
  });

  window.addEventListener("click", () => {
    removeBalloons();
  });

  document
    .getElementById("redirectButton")
    .addEventListener("click", (event) => {
      document.getElementById("stage").style.display = "none";
      document.getElementById("timer").style.display = "flex";
      event.stopPropagation();
      let timeLeft = 10;
      const counting = new Audio("../counting.mp3");
      const timerDisplay = document.getElementById("count");
      timerDisplay.innerText = timeLeft;

      const timerInterval = setInterval(() => {
        counting.play();
        timeLeft--;
        timerDisplay.innerText = timeLeft;
        if (timeLeft <= 0) {
          clearInterval(timerInterval);
          timerDisplay.innerText = "Going Live";
          const audio = new Audio("./clapping.mp3");
          counting.pause();
          audio.play();
          setTimeout(() => {
            window.location.href = "https://techno-park.in";
          }, 3000);
        }
      }, 1000);
    });
});
