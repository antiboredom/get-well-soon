const wishContainer = document.querySelector("#wishes");
const speed = 1;
const restartTime = 2000;
const startDelay = 15000;
const goToTopDelay = 5000;
const fps = 30;
let frameId;
let startTimeout;
let fpsInterval, startTime, now, then, elapsed;

const sections = [
  "all my.html",
  "all the.html",
  "best of.html",
  "best wishes.html",
  "can't wait.html",
  "continued prayers.html",
  "get better.html",
  "get well.html",
  "glad to.html",
  "god bless.html",
  "god is.html",
  "good luck.html",
  "hang in.html",
  "happy to.html",
  "he has.html",
  "he is.html",
  "he was.html",
  "he will.html",
  "hope this.html",
  "hope you.html",
  "hoping for.html",
  "i am.html",
  "i believe.html",
  "i can't.html",
  "i can.html",
  "i don't.html",
  "i donated.html",
  "i have.html",
  "i hope.html",
  "i just.html",
  "i know.html",
  "i love.html",
  "i pray.html",
  "i really.html",
  "i think.html",
  "i want.html",
  "i was.html",
  "i will.html",
  "i wish.html",
  "i would.html",
  "i'm praying.html",
  "i'm so.html",
  "if you.html",
  "it is.html",
  "it was.html",
  "i’m so.html",
  "keep fighting.html",
  "keep up.html",
  "keep your.html",
  "keeping you.html",
  "lots of.html",
  "love and.html",
  "love to.html",
  "love you.html",
  "many prayers.html",
  "may you.html",
  "may your.html",
  "much love.html",
  "my heart.html",
  "my prayers.html",
  "my thoughts.html",
  "our family.html",
  "our hearts.html",
  "our prayers.html",
  "our thoughts.html",
  "please know.html",
  "please let.html",
  "prayers and.html",
  "prayers are.html",
  "prayers for.html",
  "prayers to.html",
  "praying for.html",
  "praying that.html",
  "sending all.html",
  "sending healing.html",
  "sending lots.html",
  "sending love.html",
  "sending my.html",
  "sending our.html",
  "sending positive.html",
  "sending prayers.html",
  "sending you.html",
  "she has.html",
  "she is.html",
  "she was.html",
  "so glad.html",
  "so happy.html",
  "so sorry.html",
  "stay strong,.html",
  "stay strong.html",
  "such a.html",
  "take care.html",
  "thank you.html",
  "thanks for.html",
  "they are.html",
  "thinking about.html",
  "thinking of.html",
  "this is.html",
  "thoughts and.html",
  "we all.html",
  "we are.html",
  "we have.html",
  "we hope.html",
  "we know.html",
  "we love.html",
  "we pray.html",
  "we will.html",
  "we wish.html",
  "what a.html",
  "wish you.html",
  "wishing you.html",
  "you and.html",
  "you are.html",
  "you can.html",
  "you got.html",
  "you guys.html",
  "you have.html",
  "you will.html",
  "your family.html",
];

// const container = document.querySelector(".container");

async function makeSection(url, i) {

  try {
    const el = document.createElement("section");
    wishContainer.appendChild(el);

    await sleep(i * 500);
    let response = await fetch("../sorts/" + url);
    let html = await response.text();
    el.innerHTML = html;

  } catch (err) {
    console.warn("Something went wrong.", err);
  }
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

function scrollWishes() {
  clearTimeout(startTimeout);
  frameId = requestAnimationFrame(scrollWishes);

  now = Date.now();
  elapsed = now - then;

  if (elapsed > fpsInterval) {
    then = now - (elapsed % fpsInterval);

    if (wishContainer.scrollTop < wishContainer.scrollHeight - wishContainer.clientHeight) {
      wishContainer.scrollTop += speed;
    } else {
      wishContainer.scrollTop = 0;

      setTimeout(() => {
        cancelAnimationFrame(frameId);
        frameId = requestAnimationFrame(scrollWishes);
      }, goToTopDelay);
    }
  }
}

function startAnimating() {
  fpsInterval = 1000 / fps;
  then = Date.now();
  startTime = then;
  scrollWishes();
}

for (let i = 0; i < sections.length; i++) {
  makeSection(sections[i], i);
}

wishContainer.addEventListener("mouseover", () => {
  cancelAnimationFrame(frameId);
  clearTimeout(startTimeout);
});

wishContainer.addEventListener("mouseout", () => {
  cancelAnimationFrame(frameId);
  clearTimeout(startTimeout);
  startTimeout = setTimeout(() => {
    // frameId = requestAnimationFrame(scrollWishes);
    startAnimating();
  }, restartTime);
});

wishContainer.scrollTop = 0;

setTimeout(() => {
  // frameId = requestAnimationFrame(scrollWishes);
  startAnimating();
}, startDelay);
